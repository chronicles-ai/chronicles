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
exports.getKelompokByKelas = exports.getKelasByGuru = exports.getKelasByNamaKelas = exports.getAllKelas = exports.deleteKelas = exports.createKelas = void 0;
const kelasServices = __importStar(require("../../services/kelas/kelas.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const createKelas = async (req, res, next) => {
    try {
        const newKelasId = generateid_1.generateIdUser.generateId('KLS_');
        const newKelasData = { ...req.body, id: newKelasId };
        let kelas = await kelasServices.createKelas(newKelasData);
        return res.status(201).send(kelas);
    }
    catch (error) {
        return next(error);
    }
};
exports.createKelas = createKelas;
const deleteKelas = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await kelasServices.deleteKelas(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteKelas = deleteKelas;
const getAllKelas = async (req, res, next) => {
    try {
        let kelass = await kelasServices.getAllKelas();
        return res.status(200).send(kelass);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllKelas = getAllKelas;
const getKelasByNamaKelas = async (req, res, next) => {
    try {
        const { nama_kelas } = req.params;
        let result = await kelasServices.getKelasByNamaKelas(nama_kelas);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelasByNamaKelas = getKelasByNamaKelas;
const getKelasByGuru = async (req, res, next) => {
};
exports.getKelasByGuru = getKelasByGuru;
const getKelompokByKelas = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await kelasServices.getKelompokByKelas(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokByKelas = getKelompokByKelas;
