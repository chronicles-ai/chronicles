"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginKelompok = exports.loginGuru = void 0;
const sessions_validator_1 = require("../../services/sessions/sessions.validator");
const guruServices = __importStar(require("../../services/guru/guru.services"));
const kelompokServices = __importStar(require("../../services/kelompok/kelompok.services"));
const kelasServices = __importStar(require("../../services/kelas/kelas.services"));
const tokenServices = __importStar(require("../../services/tokens/token.services"));
const exceptions_1 = require("../../common/exceptions/exceptions");
const loginGuru = async (req, res, next) => {
    try {
        let loginInfo = req.body;
        (0, sessions_validator_1.validateLogin)(loginInfo);
        let guru = await guruServices.getGuruByUsernameAndPass(loginInfo.username, loginInfo.password);
        if (!guru) {
            throw new exceptions_1.ElementInvalidException('Guru credentials are invalid!!');
        }
        let token = await tokenServices.generateToken(guru);
        res.cookie('jwt_token', token, { httpOnly: true });
        res.status(200).json({
            message: 'Login success!!',
            id: guru.id,
            nama: guru.nama,
            username: guru.username,
            token: token
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginGuru = loginGuru;
const loginKelompok = async (req, res, next) => {
    try {
        let loginInfo = req.body;
        (0, sessions_validator_1.validateLogin)(loginInfo);
        let kelompok = await kelompokServices.getKelompokByUsernameAndPassword(loginInfo.username, loginInfo.password);
        if (!kelompok) {
            throw new exceptions_1.ElementInvalidException('Murid credentials are invalid!!');
        }
        let token = await tokenServices.generateToken(kelompok);
        const kelass = await kelasServices.getKelasById(kelompok?.id_kelas);
        res.cookie('jwt_token', token, { httpOnly: true });
        res.status(200).json({
            message: 'Login success!!',
            id: kelompok.id,
            nama: kelompok.nama_kelompok ?? 'Team',
            username: kelompok.username,
            token: token,
            class_id: kelompok.id_kelas,
            guru_id: kelass?.id_guru,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginKelompok = loginKelompok;
const logout = async (req, res, next) => {
    try {
        res.clearCookie('jwt_token');
        res.send('Successfully logged out!!!');
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
