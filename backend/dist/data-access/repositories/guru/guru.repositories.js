"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKelasByGuru = exports.getGuruByUsernameAndPass = exports.getAllGuru = exports.getGuruById = exports.getGuruByUsername = exports.existingGuruByUsername = exports.existingGuruById = exports.deleteGuru = exports.createGuru = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const guru_1 = require("../../models/guru/guru");
const kelas_1 = require("../../models/kelas/kelas");
const createGuru = async (newGuru) => {
    try {
        return await guru_1.Guru.create(newGuru);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createGuru = createGuru;
const deleteGuru = async (id) => {
    try {
        const result = await guru_1.Guru.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Guru not deleted';
        }
        return `Guru ${id} is deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deleteGuru = deleteGuru;
const existingGuruById = async (id) => {
    try {
        const result = await guru_1.Guru.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingGuruById = existingGuruById;
const existingGuruByUsername = async (username) => {
    try {
        const result = await guru_1.Guru.findOne({ where: { username } });
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingGuruByUsername = existingGuruByUsername;
const getGuruByUsername = async (username) => {
    try {
        const guru = await guru_1.Guru.findOne({ where: { username } });
        return guru || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getGuruByUsername = getGuruByUsername;
const getGuruById = async (id) => {
    try {
        const guru = await guru_1.Guru.findByPk(id);
        return guru || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getGuruById = getGuruById;
const getAllGuru = async () => {
    try {
        const gurus = await guru_1.Guru.findAll();
        return gurus || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getAllGuru = getAllGuru;
const getGuruByUsernameAndPass = async (username, password) => {
    try {
        const guru = await guru_1.Guru.findOne({ where: { username, password } });
        return guru || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getGuruByUsernameAndPass = getGuruByUsernameAndPass;
// get kelas by guru
const getKelasByGuru = async (id) => {
    try {
        const kelas_by_guru = await guru_1.Guru.findByPk(id, { include: [{ model: kelas_1.Kelas, as: 'guru' }] });
        return kelas_by_guru || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelasByGuru = getKelasByGuru;
