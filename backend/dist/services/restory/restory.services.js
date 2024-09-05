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
exports.getRestoryByKelompok = exports.getRealStoryImages = exports.getStoryOfRestoryById = exports.getKelompokByRestory = exports.deleteRestory = exports.createRestory = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const restoryRepository = __importStar(require("../../data-access/repositories/restory/restory.repositories"));
const kelompokRepository = __importStar(require("../../data-access/repositories/kelompok/kelompok.repositories"));
const storyRepository = __importStar(require("../../data-access/repositories/story/story.repositories"));
const restory_validator_1 = require("./restory.validator");
const createRestory = async (newRestory) => {
    (0, restory_validator_1.validateRestory)(newRestory);
    const judulStoryExist = await restoryRepository.existJudulOfRestory(newRestory.judul);
    if (judulStoryExist) {
        throw new exceptions.ElementAlreadyExists(`Judul ${newRestory.judul} already exist`);
    }
    return await restoryRepository.createRestory(newRestory);
};
exports.createRestory = createRestory;
const deleteRestory = async (id) => {
    const existingRestory = await restoryRepository.existingRestoryById(id);
    if (!existingRestory) {
        throw new exceptions.ElementNotFoundException(`Restory with id ${id} not found`);
    }
    return await restoryRepository.deleteRestory(id);
};
exports.deleteRestory = deleteRestory;
const getKelompokByRestory = async (id) => {
    const existingRestory = await restoryRepository.existingRestoryById(id);
    if (!existingRestory) {
        throw new exceptions.ElementNotFoundException(`Restory with id ${id} not found`);
    }
    const restory = await restoryRepository.getKelompokByRestory(id);
    return restory;
};
exports.getKelompokByRestory = getKelompokByRestory;
const getStoryOfRestoryById = async (id) => {
    const existingRestory = await restoryRepository.existingRestoryById(id);
    if (!existingRestory) {
        throw new exceptions.ElementNotFoundException(`Restory with id ${id} not found`);
    }
    const restory = await restoryRepository.getStoryOfRestoryById(id);
    return restory;
};
exports.getStoryOfRestoryById = getStoryOfRestoryById;
const getRealStoryImages = async (id_story, id_kelompok) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id_kelompok} not found`);
    }
    const existingStory = await storyRepository.existingStoryById(id_story);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id_story} not found`);
    }
    const result = await restoryRepository.getRealStoryImages(id_story, id_kelompok);
    return result;
};
exports.getRealStoryImages = getRealStoryImages;
const getRestoryByKelompok = async (id_kelompok) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }
    const story = await restoryRepository.getRestoryByKelompokId(id_kelompok);
    return story;
};
exports.getRestoryByKelompok = getRestoryByKelompok;
