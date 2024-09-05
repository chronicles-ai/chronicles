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
exports.getKelompokStory = exports.getStoryById = exports.getKelompokByStory = exports.deleteStory = exports.createStory = void 0;
const storyServices = __importStar(require("../../services/story/story.services"));
const kelompokServices = __importStar(require("../../services/kelompok/kelompok.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const genai_services_1 = require("../../api/generative-ai-gambar/genai.services");
const createStory = async (req, res, next) => {
    try {
        const newStoryId = generateid_1.generateIdUser.generateId('STRY_');
        const { orientation, complication, resolution, reorientation, id_kelompok } = req.body;
        const newStoryData = { ...req.body, id: newStoryId };
        const story_text = orientation + '\n' + complication + '\n' + resolution + '\n' + reorientation;
        const getKelas = await kelompokServices.getKelompokById(id_kelompok);
        if (!getKelas) {
            return res.status(400).json({ message: "Gagal mengenerate gambar" });
        }
        const { id_kelas } = getKelas;
        console.log('GENERATE GAMBAR....');
        const gen_image = await (0, genai_services_1.sendRequestGenApi)(id_kelas, id_kelompok, story_text);
        const { message, status, url_gambar } = gen_image;
        console.log("url gambar: ", typeof url_gambar === "string");
        console.log("message: ", typeof message === "string");
        console.log("status: ", typeof status === "string");
        if (message != "Image processed" && status != "False") {
            return res.status(400).json({ message: "Gagal mengenerate gambar" });
        }
        console.log("insert to database...");
        await storyServices.createStory(newStoryData);
        console.log("updating gambar...");
        const result = await storyServices.updateGambar(newStoryId, url_gambar);
        console.log("SUCCESS...");
        return res.status(201).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.createStory = createStory;
const deleteStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await storyServices.deleteStory(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteStory = deleteStory;
const getKelompokByStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await storyServices.getKelompokByStory(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokByStory = getKelompokByStory;
const getStoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await storyServices.getStoryById(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getStoryById = getStoryById;
const getKelompokStory = async (req, res, next) => {
    try {
        const { id_kelompok } = req.params;
        let result = await storyServices.getKelompokStory(id_kelompok);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getKelompokStory = getKelompokStory;
