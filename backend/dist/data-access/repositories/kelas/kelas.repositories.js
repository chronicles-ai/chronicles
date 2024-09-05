"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKelasByNamaKelas = exports.getKelompokByKelas = exports.getAllKelas = exports.existingKelasByName = exports.existingKelasById = exports.getKelasById = exports.deleteKelas = exports.createKelas = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const kelas_1 = require("../../models/kelas/kelas");
const kelompok_1 = require("../../models/kelompok/kelompok");
const createKelas = async (newKelas) => {
    try {
        return await kelas_1.Kelas.create(newKelas);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createKelas = createKelas;
const deleteKelas = async (id) => {
    try {
        const result = await kelas_1.Kelas.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Kelas not deleted';
        }
        return `Kelas ${id} not deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deleteKelas = deleteKelas;
const getKelasById = async (id) => {
    try {
        const result = await kelas_1.Kelas.findByPk(id);
        if (!result) {
            throw new exceptions_1.DatabaseException(`Couldn't find kelas with the id "${id}"`);
        }
        return result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelasById = getKelasById;
const existingKelasById = async (id) => {
    try {
        const result = await kelas_1.Kelas.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingKelasById = existingKelasById;
const existingKelasByName = async (nama_kelas) => {
    try {
        const result = await kelas_1.Kelas.findOne({ where: { nama_kelas } });
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingKelasByName = existingKelasByName;
const getAllKelas = async () => {
    try {
        const kelass = await kelas_1.Kelas.findAll();
        return kelass || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getAllKelas = getAllKelas;
//get kelompok by kelas
const getKelompokByKelas = async (id) => {
    try {
        const result = await kelas_1.Kelas.findByPk(id, { include: [{ model: kelompok_1.Kelompok, as: 'kelompok_kelas' }] });
        return result || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelompokByKelas = getKelompokByKelas;
const getKelasByNamaKelas = async (nama_kelas) => {
    try {
        const kelass = await kelas_1.Kelas.findOne({ where: { nama_kelas } });
        return kelass || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getKelasByNamaKelas = getKelasByNamaKelas;
