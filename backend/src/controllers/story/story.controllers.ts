import { NextFunction, Response } from 'express';

import * as storyServices from '../../services/story/story.services';
import * as kelompokServices from '../../services/kelompok/kelompok.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';
import { sendRequestGenApi } from '../../api/generative-ai-gambar/genai.services';
import { ImageInappropriate } from '../../common/exceptions/exceptions';

export const createStory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newStoryId = generateIdUser.generateId('STRY_');

        const { orientation, complication, resolution, reorientation, id_kelompok } = req.body;

        const newStoryData = { ...req.body, id: newStoryId };

        const story_text = orientation + '\n' + complication + '\n' + resolution + '\n' + reorientation;

        const getKelas = await kelompokServices.getKelompokById(id_kelompok);
 
        if (!getKelas) {
            return res.status(400).json({ message: "Gagal mengenerate gambar" });
        }

        const { id_kelas } = getKelas;

        console.log('GENERATE GAMBAR....') 
        const gen_image = await sendRequestGenApi(id_kelas, id_kelompok, story_text);

        const { message, status, url_gambar } = gen_image;

        console.log("url gambar: ", typeof url_gambar === "string");
        console.log("message: ",typeof message === "string");
        console.log("status: ", typeof status === "string");

        // if (message != "Image processed") {
        //     return res.status(400).json({ message: "Gagal mengenerate gambar" });
        // }

        if (status === "True") {
            throw new ImageInappropriate("Your story contains some negative\n You need to modify the story!")
        }

        console.log("insert to database...");
        await storyServices.createStory(newStoryData);

        console.log("updating gambar...");
        const result = await storyServices.updateGambar(newStoryId, url_gambar);

        console.log("SUCCESS...");
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
};

export const deleteStory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await storyServices.deleteStory(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelompokByStory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await storyServices.getKelompokByStory(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getStoryById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await storyServices.getStoryById(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelompokStory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_kelompok } = req.params;

        let result = await storyServices.getKelompokStory(id_kelompok);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};