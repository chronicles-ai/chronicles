"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestoryByKelompokId = exports.getRealStoryImages = exports.getStoryOfRestoryById = exports.existingRestoryById = exports.existJudulOfRestory = exports.getKelompokByRestory = exports.deleteRestory = exports.createRestory = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const restory_1 = require("../../models/restory/restory");
const kelompok_1 = require("../../models/kelompok/kelompok");
const story_1 = require("../../models/story/story");
const createRestory = async (newRestory) => {
    try {
        return await restory_1.Restory.create(newRestory);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createRestory = createRestory;
const deleteRestory = async (id) => {
    try {
        const result = await restory_1.Restory.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Story not deleted';
        }
        return `Story ${id} is deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deleteRestory = deleteRestory;
const getKelompokByRestory = async (id) => {
    try {
        const story = await restory_1.Restory.findByPk(id, { include: kelompok_1.Kelompok });
        return story || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelompokByRestory = getKelompokByRestory;
const existJudulOfRestory = async (judul) => {
    try {
        const result = await restory_1.Restory.findOne({ where: { judul: judul } });
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existJudulOfRestory = existJudulOfRestory;
const existingRestoryById = async (id) => {
    try {
        const result = await restory_1.Restory.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingRestoryById = existingRestoryById;
const getStoryOfRestoryById = async (id) => {
    try {
        const restory = await restory_1.Restory.findByPk(id, { include: story_1.Story });
        return restory || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getStoryOfRestoryById = getStoryOfRestoryById;
const getRealStoryImages = async (id_story, id_kelompok) => {
    try {
        const result = await story_1.Story.findOne({ where: { id: id_story, id_kelompok: id_kelompok }, attributes: ['url_gambar'] });
        return result || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getRealStoryImages = getRealStoryImages;
const getRestoryByKelompokId = async (id_kelompok) => {
    try {
        const story = await restory_1.Restory.findOne({ where: { id_kelompok: id_kelompok } });
        return story || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getRestoryByKelompokId = getRestoryByKelompokId;
