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
exports.updateNilaiAndKomentar = exports.getGuruByNilai = exports.deleteNilai = exports.createNilai = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const nilaiRepository = __importStar(require("../../data-access/repositories/nilai/nilai.repositories"));
const nilai_validator_1 = require("./nilai.validator");
const createNilai = async (newNilai) => {
    return await nilaiRepository.createNilai(newNilai);
};
exports.createNilai = createNilai;
const deleteNilai = async (id) => {
    const existingTugas = await nilaiRepository.existingNilaiById(id);
    if (!existingTugas) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }
    return await nilaiRepository.deleteNilai(id);
};
exports.deleteNilai = deleteNilai;
const getGuruByNilai = async (id) => {
    const existingTugas = await nilaiRepository.existingNilaiById(id);
    if (!existingTugas) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }
    return await nilaiRepository.getGuruByNilai(id);
};
exports.getGuruByNilai = getGuruByNilai;
const updateNilaiAndKomentar = async (id, nilai_kelompok, komentar) => {
    const existingTugas = await nilaiRepository.existingNilaiById(id);
    if (!existingTugas) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }
    (0, nilai_validator_1.validateNilaiKelompok)(nilai_kelompok);
    (0, nilai_validator_1.validateKomentar)(komentar);
    return await nilaiRepository.updateNilaiAndKomentar(id, nilai_kelompok, komentar);
};
exports.updateNilaiAndKomentar = updateNilaiAndKomentar;
