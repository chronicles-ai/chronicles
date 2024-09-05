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
exports.getStoryByKelompok = exports.updateStatusKelompok = exports.updateInfoKelompok = exports.getKelompokByUsernameAndPassword = exports.createRandomAccountByTeamNumbers = exports.getKelompokByClass = exports.getKelompokById = exports.getAllKelompok = exports.deleteKelompok = exports.createKelompok = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const kelompokRepository = __importStar(require("../../data-access/repositories/kelompok/kelompok.repositories"));
const pertandinganRepository = __importStar(require("../../data-access/repositories/kelompok/pertandingan.kelompok.repositories"));
const kelompok_validator_1 = require("./kelompok.validator");
const randomusername_1 = require("../../common/helpers/randomAccount/randomusername");
const generateid_1 = require("../../common/helpers/generateid/generateid");
const randompass_1 = require("../../common/helpers/randomAccount/randompass");
const createKelompok = async (newKelompok) => {
    (0, kelompok_validator_1.validateKelompok)(newKelompok);
    const kelompokExist = await kelompokRepository.existingKelompokByNama(newKelompok.nama_kelompok);
    if (kelompokExist) {
        throw new exceptions.ElementAlreadyExists(`Kelompok with ${newKelompok.nama_kelompok} already exist!!!`);
    }
    return await kelompokRepository.createKelompok(newKelompok);
};
exports.createKelompok = createKelompok;
const deleteKelompok = async (id) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id} not found!!!`);
    }
    return await kelompokRepository.deleteKelompok(id);
};
exports.deleteKelompok = deleteKelompok;
const getAllKelompok = async () => {
    return await kelompokRepository.getAllKelompok();
};
exports.getAllKelompok = getAllKelompok;
const getKelompokById = async (id) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id} not found!!`);
    }
    const kelompok = await kelompokRepository.getKelompokById(id);
    return kelompok;
};
exports.getKelompokById = getKelompokById;
const getKelompokByClass = async (id_kelas) => {
    const kelompok = await kelompokRepository.getKelompokByClass(id_kelas);
    if (!kelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id_kelas} not found!!`);
    }
    return kelompok;
};
exports.getKelompokByClass = getKelompokByClass;
const createRandomAccountByTeamNumbers = async (teamnumbers, newKelompok) => {
    const accounts = [];
    let pertandinganCreated = null;
    for (let i = 0; i < teamnumbers; i++) {
        const username = randomusername_1.generateRandomUsername.generateRandUname();
        const newKelompokId = generateid_1.generateIdUser.generateId('KEL_' + username);
        const password = randompass_1.generateRandomPassword.generateRandPass();
        let status;
        if (i % 2 !== 0) {
            status = 'story';
        }
        else {
            status = 'restory';
        }
        const newKelompokData = { ...newKelompok, id: newKelompokId, username: username, password: password, status: status };
        accounts.push(newKelompokData);
    }
    ;
    // Ensure all accounts are created before creating pertandingan
    const createdAccounts = await kelompokRepository.createRandomAccounts(accounts);
    for (let i = 1; i < teamnumbers; i += 2) {
        const kode_kelompok_genap = accounts[i].id;
        const kode_kelompok_ganjil = accounts[i - 1].id;
        const id_kelas = newKelompok.id_kelas;
        if (!kode_kelompok_ganjil || !id_kelas) {
            throw new Error('Kelompok ganjil atau id_kelas tidak ditemukan');
        }
        const newPertandingan = {
            id: generateid_1.generateIdUser.generateId('PTD_'),
            kode_kelompok_ganjil: kode_kelompok_ganjil,
            kode_kelompok_genap: kode_kelompok_genap,
            id_kelas: id_kelas
        };
        console.log('CREATING PERTANDINGAN...');
        pertandinganCreated = await pertandinganRepository.createPertandingan(newPertandingan);
    }
    ;
    return createdAccounts;
};
exports.createRandomAccountByTeamNumbers = createRandomAccountByTeamNumbers;
const getKelompokByUsernameAndPassword = async (username, password) => {
    const existingUsername = await kelompokRepository.existigKelompokByUsername(username);
    if (!existingUsername) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${username} not found!!!`);
    }
    const kelompok = await kelompokRepository.getKelompokByUsernameAndPassword(username, password);
    return kelompok || null;
};
exports.getKelompokByUsernameAndPassword = getKelompokByUsernameAndPassword;
const updateInfoKelompok = async (id, nama_kelompok, ketua, anggota1, anggota2, anggota3, anggota4) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id} not found!!`);
    }
    const updatedKelompokInfo = await kelompokRepository.updateInfoKelompok(id, nama_kelompok, ketua, anggota1, anggota2, anggota3, anggota4);
    return updatedKelompokInfo || null;
};
exports.updateInfoKelompok = updateInfoKelompok;
const updateStatusKelompok = async (id, status) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id} not found!!`);
    }
    const updatedKelompokStatus = await kelompokRepository.updateStatusKelompok(id, status);
    return updatedKelompokStatus || null;
};
exports.updateStatusKelompok = updateStatusKelompok;
const getStoryByKelompok = async (id) => {
    const existingKelompok = await kelompokRepository.existingKelompokById(id);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id} not found!!`);
    }
    const kelompok_story = await kelompokRepository.getStoryByKelompok(id);
    return kelompok_story || null;
};
exports.getStoryByKelompok = getStoryByKelompok;
