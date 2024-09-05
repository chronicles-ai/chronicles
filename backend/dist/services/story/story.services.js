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
exports.getKelompokStory = exports.getStoryByKelompok = exports.getStoryById = exports.updateGambar = exports.getKelompokByStory = exports.deleteStory = exports.createStory = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const storyRepository = __importStar(require("../../data-access/repositories/story/story.repositories"));
const kelompokRepository = __importStar(require("../../data-access/repositories/kelompok/kelompok.repositories"));
const story_validator_1 = require("./story.validator");
const createStory = async (newStory) => {
    (0, story_validator_1.validateStory)(newStory);
    const judulStoryExist = await storyRepository.existJudulOfStory(newStory.judul);
    if (judulStoryExist) {
        throw new exceptions.ElementAlreadyExists(`Judul ${newStory.judul} already exist`);
    }
    return await storyRepository.createStory(newStory);
};
exports.createStory = createStory;
const deleteStory = async (id) => {
    const existingStory = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }
    return await storyRepository.deleteStory(id);
};
exports.deleteStory = deleteStory;
const getKelompokByStory = async (id) => {
    const existingStory = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }
    const story = await storyRepository.getKelompokByStory(id);
    return story;
};
exports.getKelompokByStory = getKelompokByStory;
const updateGambar = async (id, url_gambar) => {
    const existingStory = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }
    const story = await storyRepository.updateGambar(id, url_gambar);
    return story;
};
exports.updateGambar = updateGambar;
const getStoryById = async (id) => {
    const existingStory = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }
    const story = await storyRepository.getStoryById(id);
    return story;
};
exports.getStoryById = getStoryById;
const getStoryByKelompok = async (id, id_kelompok) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }
    const story = await storyRepository.getStoryByKelompokId(id, id_kelompok);
    return story;
};
exports.getStoryByKelompok = getStoryByKelompok;
const getKelompokStory = async (id_kelompok) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }
    const allstory = await storyRepository.getKelompokStory(id_kelompok);
    return allstory;
};
exports.getKelompokStory = getKelompokStory;
