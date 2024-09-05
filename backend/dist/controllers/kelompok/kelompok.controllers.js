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
exports.getStoryByKelompok = exports.updateStatusKelompok = exports.updateInfoKelompok = exports.getKelompokByClass = exports.getKelompok = exports.getAllKelompok = exports.deleteKelompok = exports.createKelompok = void 0;
const kelompokServices = __importStar(require("../../services/kelompok/kelompok.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const createKelompok = async (req, res, next) => {
    try {
        const newKelompokId = generateid_1.generateIdUser.generateId('KEL_');
        const newKelompokData = { ...req.body, id: newKelompokId };
        let kelompok = await kelompokServices.createKelompok(newKelompokData);
        return res.status(201).send(kelompok);
    }
    catch (error) {
        return next(error);
    }
};
exports.createKelompok = createKelompok;
const deleteKelompok = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await kelompokServices.deleteKelompok(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteKelompok = deleteKelompok;
const getAllKelompok = async (req, res, next) => {
    try {
        let result = await kelompokServices.getAllKelompok();
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllKelompok = getAllKelompok;
const getKelompok = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await kelompokServices.getKelompokById(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompok = getKelompok;
const getKelompokByClass = async (req, res, next) => {
    try {
        const { id_kelas } = req.params;
        let result = await kelompokServices.getKelompokByClass(id_kelas);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokByClass = getKelompokByClass;
const updateInfoKelompok = async (req, res, next) => {
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
    }
    catch (error) {
        return next(error);
    }
};
exports.updateInfoKelompok = updateInfoKelompok;
const updateStatusKelompok = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        let result = await kelompokServices.updateStatusKelompok(id, status);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.updateStatusKelompok = updateStatusKelompok;
const getStoryByKelompok = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await kelompokServices.getStoryByKelompok(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
    ;
};
exports.getStoryByKelompok = getStoryByKelompok;
