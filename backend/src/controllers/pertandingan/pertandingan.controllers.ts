import { NextFunction, Response } from 'express';

import * as pertandinganServices from '../../services/pertandingan/pertandingan.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';

export const createPertandingan = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newPertandinganId = generateIdUser.generateId('PERT_')

        const newPertandinganData = { ...req.body, id: newPertandinganId };

        let pertandingan = await pertandinganServices.createPertandingan(newPertandinganData);

        return res.status(200).send(pertandingan);
    } catch (error) {
        return next(error);
    }
};

export const deletePertandingan = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await pertandinganServices.deletePertandingan(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getStoryFromKelompokByPertandingan = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await pertandinganServices.getStoryFromKelompokByPertandingan(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getPertandinganRivalNew = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {id} = req.params;

        const result = await pertandinganServices.getPertandinganRivalNew(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export const getPertandinganRival = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;
        const { id_kelompok } = req.params;

        let result = await pertandinganServices.getPertandinganRival(id, id_kelompok);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelompokPertandingan = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await pertandinganServices.getKelompokPertandingan(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getAllPertandingan  = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let result = await pertandinganServices.getAllPertandingan();

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const showPertandinganByKelas  = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id_kelas } = req.params;
        
        let result = await pertandinganServices.showPertandinganByKelas(id_kelas);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};
