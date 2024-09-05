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
exports.getAllPertandingan = exports.getKelompokPertandingan = exports.getPertandinganRival = exports.getPertandinganRivalNew = exports.getStoryFromKelompokByPertandingan = exports.deletePertandingan = exports.createPertandingan = void 0;
const pertandinganServices = __importStar(require("../../services/pertandingan/pertandingan.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const createPertandingan = async (req, res, next) => {
    try {
        const newPertandinganId = generateid_1.generateIdUser.generateId('PERT_');
        const newPertandinganData = { ...req.body, id: newPertandinganId };
        let pertandingan = await pertandinganServices.createPertandingan(newPertandinganData);
        return res.status(200).send(pertandingan);
    }
    catch (error) {
        return next(error);
    }
};
exports.createPertandingan = createPertandingan;
const deletePertandingan = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await pertandinganServices.deletePertandingan(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deletePertandingan = deletePertandingan;
const getStoryFromKelompokByPertandingan = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await pertandinganServices.getStoryFromKelompokByPertandingan(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getStoryFromKelompokByPertandingan = getStoryFromKelompokByPertandingan;
const getPertandinganRivalNew = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pertandinganServices.getPertandinganRivalNew(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getPertandinganRivalNew = getPertandinganRivalNew;
const getPertandinganRival = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_kelompok } = req.params;
        let result = await pertandinganServices.getPertandinganRival(id, id_kelompok);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getPertandinganRival = getPertandinganRival;
const getKelompokPertandingan = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await pertandinganServices.getKelompokPertandingan(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokPertandingan = getKelompokPertandingan;
const getAllPertandingan = async (req, res, next) => {
    try {
        let result = await pertandinganServices.getAllPertandingan();
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllPertandingan = getAllPertandingan;
