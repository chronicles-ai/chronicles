import { NextFunction, Response } from 'express';

import * as kelasServices from '../../services/kelas/kelas.services';
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { generateIdUser } from '../../common/helpers/generateid/generateid';

export const createKelas = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newKelasId = generateIdUser.generateId('KLS_');

        const newKelasData = { ...req.body, id: newKelasId };

        let kelas = await kelasServices.createKelas(newKelasData);

        return res.status(201).send(kelas);
    } catch (error) {
        return next(error);
    }
};

export const deleteKelas = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await kelasServices.deleteKelas(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getAllKelas = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let kelass = await kelasServices.getAllKelas();

        return res.status(200).send(kelass);
    } catch (error) {
        return next(error);
    }
};

export const getKelasByNamaKelas = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { nama_kelas } = req.params;

        let result = await kelasServices.getKelasByNamaKelas(nama_kelas);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};

export const getKelasByGuru = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    
}

export const getKelompokByKelas = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;

        let result = await kelasServices.getKelompokByKelas(id);

        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
};