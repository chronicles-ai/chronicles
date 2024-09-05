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
exports.getAllPertandingan = exports.getKelompokPertandingan = exports.getPertandinganRival = exports.getPertandinganRivalNew = exports.getStoryFromKelompokByPertandingan = exports.deletePertandingan = exports.createPertandingan = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const pertandinganRepository = __importStar(require("../../data-access/repositories/kelompok/pertandingan.kelompok.repositories"));
const kelompokRepository = __importStar(require("../../data-access/repositories/kelompok/kelompok.repositories"));
const createPertandingan = async (newPertandingan) => {
    return await pertandinganRepository.createPertandingan(newPertandingan);
};
exports.createPertandingan = createPertandingan;
const deletePertandingan = async (id) => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);
    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }
    return await pertandinganRepository.deletePertandingan(id);
};
exports.deletePertandingan = deletePertandingan;
const getStoryFromKelompokByPertandingan = async (id) => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);
    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }
    const cerita_hasil_pertandingan_antar_kelompok = await pertandinganRepository.getStoryFromKelompokByPertandingan(id);
    return cerita_hasil_pertandingan_antar_kelompok || null;
};
exports.getStoryFromKelompokByPertandingan = getStoryFromKelompokByPertandingan;
const getPertandinganRivalNew = async (id_kelompok) => {
    const pertandingan = await pertandinganRepository.getPertandinganRivalNew(id_kelompok);
    return pertandingan;
};
exports.getPertandinganRivalNew = getPertandinganRivalNew;
const getPertandinganRival = async (id, id_kelompok) => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);
    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }
    const pertandingan = await pertandinganRepository.getPertandinganRival(id, id_kelompok);
    return pertandingan || null;
};
exports.getPertandinganRival = getPertandinganRival;
const getKelompokPertandingan = async (id) => {
    const existKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existKelompok) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }
    const pertandingan = await pertandinganRepository.getKelompokPertandingan(id);
    return pertandingan || null;
};
exports.getKelompokPertandingan = getKelompokPertandingan;
const getAllPertandingan = async () => {
    return await pertandinganRepository.getAllPertandingan();
};
exports.getAllPertandingan = getAllPertandingan;
