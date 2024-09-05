import { NextFunction, Response } from 'express';
import { validateLogin } from '../../services/sessions/sessions.validator';

import * as guruServices from '../../services/guru/guru.services'
import * as kelompokServices from '../../services/kelompok/kelompok.services'
import * as kelasServices from '../../services/kelas/kelas.services'
import * as tokenServices from '../../services/tokens/token.services'
import { CustomRequest } from '../../common/middlewares/auth.middlewares';
import { ElementInvalidException } from '../../common/exceptions/exceptions';

export interface LoginInput {
    username: string;
    password: string;
}

export const loginGuru = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let loginInfo: LoginInput = req.body;
        validateLogin(loginInfo);

        let guru = await guruServices.getGuruByUsernameAndPass(loginInfo.username, loginInfo.password);

        if (!guru) {
            throw new ElementInvalidException('Guru credentials are invalid!!');
        }

        let token = await tokenServices.generateToken(guru);

        res.cookie('jwt_token', token, {httpOnly: true});
        res.status(200).json({
            message: 'Login success!!',
            id: guru.id,
            nama: guru.nama,
            username: guru.username,
            token: token
        })
    } catch (error) {
        next(error);
    }
}

export const loginKelompok = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        let loginInfo: LoginInput = req.body;
        validateLogin(loginInfo);

        let kelompok = await kelompokServices.getKelompokByUsernameAndPassword(loginInfo.username, loginInfo.password);
        
        if (!kelompok) {
            throw new ElementInvalidException('Murid credentials are invalid!!');
        }
        
        let token = await tokenServices.generateToken(kelompok);
        const kelass = await kelasServices.getKelasById(kelompok?.id_kelas);

        res.cookie('jwt_token', token, {httpOnly: true});
        res.status(200).json({
            message: 'Login success!!',
            id: kelompok.id,
            nama: kelompok.nama_kelompok ?? 'Team',
            username: kelompok.username,
            token: token,
            class_id: kelompok.id_kelas,
            guru_id: kelass?.id_guru,
        })
    } catch (error) {
        next(error);
    }
}

export const logout = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        res.clearCookie('jwt_token');
        res.send('Successfully logged out!!!');
    } catch (error) {
        next(error);
    }
}