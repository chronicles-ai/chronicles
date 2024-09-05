"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPertandingan = exports.getKelompokPertandingan = exports.getPertandinganRival = exports.getPertandinganRivalNew = exports.existingPertandinganByid = exports.getStoryFromKelompokByPertandingan = exports.deletePertandingan = exports.createPertandingan = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const kelompok_1 = require("../../models/kelompok/kelompok");
const pertandingan_kelompok_1 = require("../../models/kelompok/pertandingan.kelompok");
const story_1 = require("../../models/story/story");
const sequelize_1 = require("sequelize");
const createPertandingan = async (newPertandingan) => {
    try {
        return await pertandingan_kelompok_1.Pertandingan.create(newPertandingan);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createPertandingan = createPertandingan;
const deletePertandingan = async (id) => {
    try {
        const result = await pertandingan_kelompok_1.Pertandingan.destroy({ where: { id: id } });
        if (result === 0) {
            return `Pertandingan ${id} not delete`;
        }
        return `Pertandingan ${id} not deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deletePertandingan = deletePertandingan;
const getStoryFromKelompokByPertandingan = async (id) => {
    try {
        const pertandingan = await pertandingan_kelompok_1.Pertandingan.findByPk(id, {
            include: [
                {
                    model: kelompok_1.Kelompok,
                    include: [story_1.Story],
                },
            ],
        });
        return pertandingan;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getStoryFromKelompokByPertandingan = getStoryFromKelompokByPertandingan;
const existingPertandinganByid = async (id) => {
    try {
        const result = await pertandingan_kelompok_1.Pertandingan.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingPertandinganByid = existingPertandinganByid;
const getPertandinganRivalNew = async (id_kelompok) => {
    try {
        const pertandingan = await pertandingan_kelompok_1.Pertandingan.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { kode_kelompok_ganjil: id_kelompok },
                    { kode_kelompok_genap: id_kelompok }
                ],
            },
            include: [
                { model: kelompok_1.Kelompok, as: 'kelompokGanjil' },
                { model: kelompok_1.Kelompok, as: 'kelompokGenap' }
            ],
        });
        if (!pertandingan) {
            throw new exceptions_1.DatabaseException(`Pertandingan not found`);
        }
        return pertandingan;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getPertandinganRivalNew = getPertandinganRivalNew;
const getPertandinganRival = async (id, id_kelompok) => {
    try {
        const pertandingan = await pertandingan_kelompok_1.Pertandingan.findOne({
            where: {
                id,
                [sequelize_1.Op.or]: [
                    { kode_kelompok_ganjil: id_kelompok },
                    { kode_kelompok_genap: id_kelompok }
                ]
            },
            include: [
                { model: kelompok_1.Kelompok, as: 'kelompokGanjil' },
                { model: kelompok_1.Kelompok, as: 'kelompokGenap' }
            ]
        });
        return pertandingan || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getPertandinganRival = getPertandinganRival;
const getKelompokPertandingan = async (id) => {
    try {
        const kelompok = await kelompok_1.Kelompok.findByPk(id, { include: [{ model: pertandingan_kelompok_1.Pertandingan, as: 'kode_kelompok_ganjil' }] });
        return kelompok || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelompokPertandingan = getKelompokPertandingan;
const getAllPertandingan = async () => {
    try {
        const pertandingan = await pertandingan_kelompok_1.Pertandingan.findAll();
        return pertandingan || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getAllPertandingan = getAllPertandingan;
