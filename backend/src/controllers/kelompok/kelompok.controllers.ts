import { NextFunction, Response } from 'express';

import * as kelompokServices from '../../services/kelompok/kelompok.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';

export const createKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newKelompokId = generateIdUser.generateId('KEL_');

        const newKelompokData = { ...req.body, id: newKelompokId };

        let kelompok = await kelompokServices.createKelompok(newKelompokData);

        return res.status(201).send(kelompok);
    } catch (error) {
        return next(error);
    }
};

export const deleteKelompok = async (req: CustomRequest, res: Response, next: NextFunction ): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await kelompokServices.deleteKelompok(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};


export const getAllKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let result = await kelompokServices.getAllKelompok();

        return res.status(200).send(result);
    } catch(error) {
        return next(error);
    }
};

export const getKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await kelompokServices.getKelompokById(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelompokByClass = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_kelas } = req.params;

        let result = await kelompokServices.getKelompokByClass(id_kelas);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export const updateInfoKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        const { nama_kelompok } = req.body;
        const { ketua } = req.body;
        const { anggota1 } = req.body;
        const { anggota2 } = req.body;
        const { anggota3 } = req.body;
        const { anggota4 } = req.body;

        let result = await kelompokServices.updateInfoKelompok(id, nama_kelompok, ketua, anggota1, anggota2, anggota3, anggota4);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const updateStatusKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        const { status } = req.body;

        let result = await kelompokServices.updateStatusKelompok(id, status);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getStoryByKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await kelompokServices.getStoryByKelompok(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    };
};