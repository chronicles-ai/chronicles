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
exports.getKelasByGuru = exports.getGuruByUsernameAndPass = exports.getAllGuru = exports.getGuruById = exports.getGuruByUsername = exports.deleteGuru = exports.createGuru = void 0;
const exceptions = __importStar(require("../../common/exceptions/exceptions"));
const guruRepository = __importStar(require("../../data-access/repositories/guru/guru.repositories"));
const guru_validator_1 = require("./guru.validator");
const createGuru = async (newGuru) => {
    (0, guru_validator_1.validateGuru)(newGuru);
    const usernameExist = await guruRepository.existingGuruByUsername(newGuru.username);
    if (usernameExist) {
        throw new exceptions.ElementAlreadyExists(`Guru with ${newGuru.username} already exist!!`);
    }
    return await guruRepository.createGuru(newGuru);
};
exports.createGuru = createGuru;
const deleteGuru = async (id) => {
    const existingGuru = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }
    return await guruRepository.deleteGuru(id);
};
exports.deleteGuru = deleteGuru;
const getGuruByUsername = async (username) => {
    const existingGuru = await guruRepository.existingGuruByUsername(username);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${username} not found!!`);
    }
    const guru = await guruRepository.getGuruByUsername(username);
    return guru;
};
exports.getGuruByUsername = getGuruByUsername;
const getGuruById = async (id) => {
    const existingGuru = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }
    const guru = await guruRepository.getGuruById(id);
    return guru;
};
exports.getGuruById = getGuruById;
const getAllGuru = async () => {
    return await guruRepository.getAllGuru();
};
exports.getAllGuru = getAllGuru;
const getGuruByUsernameAndPass = async (username, password) => {
    const existingGuru = await guruRepository.existingGuruByUsername(username);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${username} not found!!`);
    }
    const guru = await guruRepository.getGuruByUsernameAndPass(username, password);
    return guru;
};
exports.getGuruByUsernameAndPass = getGuruByUsernameAndPass;
const getKelasByGuru = async (id) => {
    const existingGuru = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }
    const kelasByGuru = await guruRepository.getKelasByGuru(id);
    return kelasByGuru;
};
exports.getKelasByGuru = getKelasByGuru;
