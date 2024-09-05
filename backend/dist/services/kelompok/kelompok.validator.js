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
exports.validateStatus = exports.validateNamaKelompok = exports.validateKelompok = void 0;
const stringValidators = __importStar(require("../../common/utils/validations/string.validator"));
const validateKelompok = (newKelompok) => {
    (0, exports.validateNamaKelompok)(newKelompok.nama_kelompok);
    (0, exports.validateStatus)(newKelompok.status);
};
exports.validateKelompok = validateKelompok;
const validateNamaKelompok = (nama_kelompok) => {
    stringValidators.throwExeptionIfEmptyString(nama_kelompok, 'Nama kelompok cannot be empty');
    stringValidators.throwExceptionIfMinLength(nama_kelompok, 5, 'Nama kelompok must be at least 5 characters long');
};
exports.validateNamaKelompok = validateNamaKelompok;
const validateStatus = (status) => {
    stringValidators.throwExeptionIfEmptyString(status, 'Status cannot be empty');
};
exports.validateStatus = validateStatus;
