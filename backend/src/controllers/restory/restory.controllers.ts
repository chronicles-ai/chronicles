import { NextFunction, Response } from 'express';

import * as restoryServices from '../../services/restory/restory.services';
import * as storyServices from '../../services/story/story.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';

export const createRestory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newRestoryId = generateIdUser.generateId('RSTRY_');

        const newRestoryData = { ...req.body, id: newRestoryId };

        const restory = await restoryServices.createRestory(newRestoryData);

        return res.status(201).send(restory);
    } catch (error) {
        return next(error);
    }
};

export const deleteRestory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        const result = await restoryServices.deleteRestory(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelompokByRestory = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        const result = await restoryServices.getKelompokByRestory(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getStoryOfRestoryById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        const result = await storyServices.getStoryById(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getRealStoryImages = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_story } = req.params;
        const { id_kelompok } = req.params;

        const result = await restoryServices.getRealStoryImages(id_story, id_kelompok);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getRestoryByKelompokId = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_kelompok } = req.params;

        const result = await restoryServices.getRestoryByKelompok(id_kelompok);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};