"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNilaiAndKomentar = exports.getGuruByNilai = exports.existingNilaiById = exports.deleteNilai = exports.createNilai = void 0;
const exceptions_1 = require("../../../common/exceptions/exceptions");
const guru_1 = require("../../models/guru/guru");
const nilai_1 = require("../../models/nilai/nilai");
const createNilai = async (newNilai) => {
    try {
        return await nilai_1.Nilai.create(newNilai);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.createNilai = createNilai;
const deleteNilai = async (id) => {
    try {
        const result = await nilai_1.Nilai.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Nilai not deleted';
        }
        return `Nilai ${id} is deleted`;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.deleteNilai = deleteNilai;
const existingNilaiById = async (id) => {
    try {
        const result = await nilai_1.Nilai.findByPk(id);
        return !!result;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.existingNilaiById = existingNilaiById;
const getGuruByNilai = async (id) => {
    try {
        const tugas = await nilai_1.Nilai.findByPk(id, { include: [{ model: guru_1.Guru, as: 'guru' }] });
        return tugas || null;
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.getGuruByNilai = getGuruByNilai;
const updateNilaiAndKomentar = async (id, nilai_kelompok, komentar) => {
    try {
        await nilai_1.Nilai.update({ nilai_kelompok: nilai_kelompok, komentar: komentar }, { where: { id: id } });
        return await nilai_1.Nilai.findByPk(id);
    }
    catch (error) {
        throw new exceptions_1.DatabaseException(error.message);
    }
};
exports.updateNilaiAndKomentar = updateNilaiAndKomentar;
