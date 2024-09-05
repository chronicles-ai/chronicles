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
exports.updateNilaiAndKomentar = exports.gradingStory = exports.getGuruByNilai = exports.deleteNilai = exports.createNilai = void 0;
const nilaiServices = __importStar(require("../../services/nilai/nilai.services"));
const storyServices = __importStar(require("../../services/story/story.services"));
const restoryServices = __importStar(require("../../services/restory/restory.services"));
const kelompokServices = __importStar(require("../../services/kelompok/kelompok.services"));
const generateid_1 = require("../../common/helpers/generateid/generateid");
const penilaian_llm_1 = require("../../api/penilaian-llm/penilaian-llm");
const createNilai = async (req, res, next) => {
    try {
        const newTugasId = generateid_1.generateIdUser.generateId('TGS_');
        const newTugasData = { ...req.body, id: newTugasId };
        const tugas = await nilaiServices.createNilai(newTugasData);
        return res.status(201).send(tugas);
    }
    catch (error) {
        return next(error);
    }
};
exports.createNilai = createNilai;
const deleteNilai = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await nilaiServices.deleteNilai(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteNilai = deleteNilai;
const getGuruByNilai = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await nilaiServices.getGuruByNilai(id);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.getGuruByNilai = getGuruByNilai;
const gradingStory = async (req, res, next) => {
    try {
        const newNilaiId = generateid_1.generateIdUser.generateId('NIL_');
        const { id_kelompok } = req.params;
        const { id_story } = req.params;
        const { id_guru } = req.params;
        const getKelompok = await kelompokServices.getKelompokById(id_kelompok);
        if (!getKelompok) {
            return res.status(404).send({ message: 'Kelompok tidak ditemukan' });
        }
        const { status } = getKelompok;
        let getStory;
        if (status === "story") {
            console.log('story...');
            getStory = await storyServices.getStoryByKelompok(id_story, id_kelompok);
        }
        if (status === "restory") {
            console.log('restory...');
            getStory = await restoryServices.getRestoryByKelompok(id_kelompok);
        }
        const { orientation, complication, resolution, reorientation } = getStory;
        const story_text = orientation + ',' + complication + ',' + resolution + ',' + reorientation;
        const grade = await (0, penilaian_llm_1.sendRequestGradingLlmApi)(story_text);
        const { message, result, final_grade } = grade;
        if (message != "Processed text" && result === null && final_grade === 0) {
            return res.status(400).send({ message: "Gagal mengenerate penilaian" });
        }
        ;
        const nilai_kelompok = parseFloat(final_grade);
        console.log('Inserting nilai processes...');
        const newNilaiData = { ...req.body, id: newNilaiId, id_kelompok: id_kelompok, id_guru: id_guru, nilai_kelompok: nilai_kelompok, komentar: result };
        const nilai_komentar = await nilaiServices.createNilai(newNilaiData);
        return res.status(200).send(nilai_komentar);
    }
    catch (error) {
        return next(error);
    }
};
exports.gradingStory = gradingStory;
const updateNilaiAndKomentar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nilai_kelompok, komentar } = req.body;
        const result = await nilaiServices.updateNilaiAndKomentar(id, nilai_kelompok, komentar);
        return res.status(200).send(result);
    }
    catch (error) {
        return next(error);
    }
};
exports.updateNilaiAndKomentar = updateNilaiAndKomentar;
