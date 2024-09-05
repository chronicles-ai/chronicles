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
exports.getKelompokByKelas = exports.getKelasByNamaKelas = exports.getAllKelas = exports.getKelasById = exports.deleteKelas = exports.createKelas = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const kelasRepository = __importStar(require("../../data-access/repositories/kelas/kelas.repositories"));
const kelas_validator_1 = require("./kelas.validator");
const createKelas = async (newKelas) => {
    (0, kelas_validator_1.validateKelas)(newKelas);
    const kelasExist = await kelasRepository.existingKelasByName(newKelas.nama_kelas);
    if (kelasExist) {
        throw new exceptions.ElementAlreadyExists(newKelas.nama_kelas);
    }
    return await kelasRepository.createKelas(newKelas);
};
exports.createKelas = createKelas;
const deleteKelas = async (id) => {
    const existingKelas = await kelasRepository.existingKelasById(id);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Murid with ${id} not found!!`);
    }
    return await kelasRepository.deleteKelas(id);
};
exports.deleteKelas = deleteKelas;
const getKelasById = async (id) => {
    const kelas = await kelasRepository.getKelasById(id);
    return kelas;
};
exports.getKelasById = getKelasById;
const getAllKelas = async () => {
    return await kelasRepository.getAllKelas() || null;
};
exports.getAllKelas = getAllKelas;
const getKelasByNamaKelas = async (nama_kelas) => {
    const existingKelas = await kelasRepository.existingKelasByName(nama_kelas);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Kelas ${nama_kelas} not found!!`);
    }
    const kelas = kelasRepository.getKelasByNamaKelas(nama_kelas);
    return kelas || null;
};
exports.getKelasByNamaKelas = getKelasByNamaKelas;
const getKelompokByKelas = async (id) => {
    const existingKelas = await kelasRepository.existingKelasById(id);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Kelas ${id} not found!!`);
    }
    const kelas = kelasRepository.getKelompokByKelas(id);
    return kelas || null;
};
exports.getKelompokByKelas = getKelompokByKelas;
