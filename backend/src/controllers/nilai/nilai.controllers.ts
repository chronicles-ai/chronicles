import { NextFunction, Response } from 'express';

import * as nilaiServices from '../../services/nilai/nilai.services';
import * as storyServices from '../../services/story/story.services';
import * as restoryServices from '../../services/restory/restory.services';
import * as kelompokServices from '../../services/kelompok/kelompok.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';
import { sendRequestGradingLlmApi } from '../../api/penilaian-llm/penilaian-llm';
import { sendRequestSimilarityApi } from '../../api/cek-similaritas/cek-similaritas';

export const createNilai = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newTugasId = generateIdUser.generateId('TGS_')

        const newTugasData = { ...req.body, id: newTugasId };

        let tugas = await nilaiServices.createNilai(newTugasData);

        return res.status(201).send(tugas);
    } catch (error) {
        return next(error);
    }
};

export const deleteNilai = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await nilaiServices.deleteNilai(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getGuruByNilai = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await nilaiServices.getGuruByNilai(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const gradingStory =  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newNilaiId = generateIdUser.generateId('NIL_');
        const { id_kelompok } = req.params;
        const { id_story } = req.params;
        const { id_guru } = req.params;

        const getKelompok = await kelompokServices.getKelompokById(id_kelompok);

        if (!getKelompok) {
            return res.status(404).send({ message: 'Kelompok tidak ditemukan' });
        }

        const { status } = getKelompok;

        let getStory: any;

        if (status === "story") {
            console.log('story...')
            getStory = await storyServices.getStoryByKelompok(id_story, id_kelompok);
        }

        if (status === "restory") {
            console.log('restory...')
            getStory = await restoryServices.getRestoryByKelompok(id_kelompok);
        }

        const { orientation, complication, resolution, reorientation } = getStory;

        const story_text = orientation + ',' + complication + ',' + resolution + ',' + reorientation;

        const grade = await sendRequestGradingLlmApi(story_text);

        const { message, result, final_grade } = grade;

        if (message != "Processed text" || result === null || final_grade === 0) {
            return res.status(400).send({ message: "Gagal mengenerate penilaian" });
        };

        const nilai_kelompok = parseFloat(final_grade);

        console.log('Inserting nilai processes...')
        const newNilaiData = { ...req.body, id: newNilaiId, id_kelompok: id_kelompok, id_guru: id_guru, nilai_kelompok: nilai_kelompok, komentar: result};
        const nilai_komentar = await nilaiServices.createNilai(newNilaiData);
    
        return res.status(200).send(nilai_komentar);
    } catch (error) {
        return next(error);
    }
};

export const updateNilaiAndKomentar =  async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try{
    const { id } = req.params;

    const result = await nilaiServices.updateNilaiAndKomentar(id, req.body);

    return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getNilaiByKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_kelompok } = req.params;

        const result = await nilaiServices.getNilaiByKelompok(id_kelompok);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const similarityChecking = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        // const { id_nilai } = req.params;

        const {
            id_story_ganjil,
            orientation_ganjil,
            complication_ganjil,
            resolution_ganjil,
            reorientation_ganjil,
            kode_kelompok_ganjil,
            id_story_genap,
            orientation_genap,
            complication_genap,
            resolution_genap,
            reorientation_genap,
            kode_kelompok_genap
        } = req.body;

        const result = await sendRequestSimilarityApi(
            id_story_ganjil,
            orientation_ganjil,
            complication_ganjil,
            resolution_ganjil,
            reorientation_ganjil,
            kode_kelompok_ganjil,
            id_story_genap,
            orientation_genap,
            complication_genap,
            resolution_genap,
            reorientation_genap,
            kode_kelompok_genap
        );

        if (result instanceof Error) {
            return res.status(500).send({ error: result.message });
        }

        const { similarity_score } = result;

        if (similarity_score === null) {
            return res.status(400).send({ message: "Gagal mengenerate penilaian similaritas" });
        };

        console.log('skor similaritas:', similarity_score);

        const newNilaiData = { ...req.body, nilai_similaritas: similarity_score };

        // console.log('Updating nilai dan komentar ganjil...')
        // await nilaiServices.updateNilaiAndKomentarByKelompok(id_nilai, kode_kelompok_ganjil, newNilaiData);

        // console.log('Updating nilai dan komentar genap...')
        // await nilaiServices.updateNilaiAndKomentarByKelompok(id_nilai, kode_kelompok_genap, newNilaiData);

        return res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};