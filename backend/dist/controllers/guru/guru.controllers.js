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
exports.getKelasByGuru = exports.getAllGuru = exports.getGuru = exports.deleteGuru = exports.signUp = void 0;
const guruServices = __importStar(require("../../services/guru/guru.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const signUp = async (req, res, next) => {
    try {
        const newGuruId = generateid_1.generateIdUser.generateId('GUR_');
        const newGuruData = { ...req.body, id: newGuruId };
        let guru = await guruServices.createGuru(newGuruData);
        return res.status(201).send(guru);
    }
    catch (error) {
        return next(error);
    }
};
exports.signUp = signUp;
const deleteGuru = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await guruServices.deleteGuru(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteGuru = deleteGuru;
const getGuru = async (req, res, next) => {
    try {
        const { id } = req.params;
        let guru = await guruServices.getGuruById(id);
        return res.status(200).send(guru);
    }
    catch (error) {
        return next(error);
    }
};
exports.getGuru = getGuru;
const getAllGuru = async (req, res, next) => {
    try {
        let gurus = await guruServices.getAllGuru();
        return res.status(200).send(gurus);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllGuru = getAllGuru;
//get all kelas by guru
const getKelasByGuru = async (req, res, next) => {
    try {
        const { id } = req.params;
        let kelasByGuru = await guruServices.getKelasByGuru(id);
        return res.status(200).send(kelasByGuru);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelasByGuru = getKelasByGuru;
