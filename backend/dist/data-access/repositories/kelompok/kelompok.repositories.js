"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoryByKelompok = exports.updateStatusKelompok = exports.updateInfoKelompok = exports.existigKelompokByUsername = exports.getKelompokByUsernameAndPassword = exports.createRandomAccounts = exports.getKelompokByClass = exports.getKelompokById = exports.getAllKelompok = exports.existingKelompokById = exports.existingKelompokByNama = exports.deleteKelompok = exports.createKelompok = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const kelompok_1 = require("../../models/kelompok/kelompok");
const story_1 = require("../../models/story/story");
const createKelompok = async (newKelompok) => {
    try {
        return await kelompok_1.Kelompok.create(newKelompok);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createKelompok = createKelompok;
const deleteKelompok = async (id) => {
    try {
        const result = await kelompok_1.Kelompok.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Kelompok not deleted';
        }
        return `Kelompok ${id} is deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deleteKelompok = deleteKelompok;
const existingKelompokByNama = async (nama_kelompok) => {
    try {
        const result = await kelompok_1.Kelompok.findOne({ where: { nama_kelompok: nama_kelompok } });
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingKelompokByNama = existingKelompokByNama;
const existingKelompokById = async (id) => {
    try {
        const result = await kelompok_1.Kelompok.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingKelompokById = existingKelompokById;
const getAllKelompok = async () => {
    try {
        const kelompoks = await kelompok_1.Kelompok.findAll();
        return kelompoks || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getAllKelompok = getAllKelompok;
const getKelompokById = async (id) => {
    try {
        const kelompok = await kelompok_1.Kelompok.findByPk(id);
        return kelompok || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelompokById = getKelompokById;
const getKelompokByClass = async (id_kelas) => {
    try {
        const kelompok = await kelompok_1.Kelompok.findAll({ where: { id_kelas: id_kelas } });
        return kelompok || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelompokByClass = getKelompokByClass;
const createRandomAccounts = async (accounts) => {
    try {
        const createdAccounts = [];
        for (const account of accounts) {
            const kelompok = await kelompok_1.Kelompok.create(account);
            createdAccounts.push(kelompok);
        }
        return createdAccounts;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createRandomAccounts = createRandomAccounts;
const getKelompokByUsernameAndPassword = async (username, password) => {
    try {
        const kelompok = await kelompok_1.Kelompok.findOne({ where: { username: username, password: password } });
        return kelompok || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
    ;
};
exports.getKelompokByUsernameAndPassword = getKelompokByUsernameAndPassword;
const existigKelompokByUsername = async (username) => {
    try {
        const result = await kelompok_1.Kelompok.findOne({ where: { username: username } });
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
    ;
};
exports.existigKelompokByUsername = existigKelompokByUsername;
//update info kelompok
const updateInfoKelompok = async (id, nama_kelompok, ketua, anggota1, anggota2, anggota3, anggota4) => {
    try {
        await kelompok_1.Kelompok.update({ nama_kelompok: nama_kelompok, ketua: ketua, anggota1: anggota1, anggota2: anggota2, anggota3: anggota3, anggota4: anggota4 }, { where: { id: id } });
        return await kelompok_1.Kelompok.findByPk(id);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.updateInfoKelompok = updateInfoKelompok;
//update status story restory kelompok
const updateStatusKelompok = async (id, status) => {
    try {
        await kelompok_1.Kelompok.update({ status: status }, { where: { id: id } });
        return await kelompok_1.Kelompok.findByPk(id);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.updateStatusKelompok = updateStatusKelompok;
const getStoryByKelompok = async (id) => {
    try {
        const kelompok_story = await kelompok_1.Kelompok.findByPk(id, { include: [{ model: story_1.Story, as: 'kelompok_story' }] });
        return kelompok_story || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getStoryByKelompok = getStoryByKelompok;
