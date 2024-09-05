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
exports.getRestoryByKelompokId = exports.getRealStoryImages = exports.getStoryOfRestoryById = exports.getKelompokByRestory = exports.deleteRestory = exports.createRestory = void 0;
const restoryServices = __importStar(require("../../services/restory/restory.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const createRestory = async (req, res, next) => {
    try {
        const newRestoryId = generateid_1.generateIdUser.generateId('RSTRY_');
        const newRestoryData = { ...req.body, id: newRestoryId };
        const restory = await restoryServices.createRestory(newRestoryData);
        return res.status(201).send(restory);
    }
    catch (error) {
        return next(error);
    }
};
exports.createRestory = createRestory;
const deleteRestory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await restoryServices.deleteRestory(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteRestory = deleteRestory;
const getKelompokByRestory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await restoryServices.getKelompokByRestory(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokByRestory = getKelompokByRestory;
const getStoryOfRestoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await restoryServices.getStoryOfRestoryById(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getStoryOfRestoryById = getStoryOfRestoryById;
const getRealStoryImages = async (req, res, next) => {
    try {
        const { id_story } = req.params;
        const { id_kelompok } = req.params;
        const result = await restoryServices.getRealStoryImages(id_story, id_kelompok);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getRealStoryImages = getRealStoryImages;
const getRestoryByKelompokId = async (req, res, next) => {
    try {
        const { id_kelompok } = req.params;
        const result = await restoryServices.getRestoryByKelompok(id_kelompok);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getRestoryByKelompokId = getRestoryByKelompokId;
