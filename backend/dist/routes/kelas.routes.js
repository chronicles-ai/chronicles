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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kelasRouter = void 0;
const express_1 = __importDefault(require("express"));
const kelasController = __importStar(require("../controllers/kelas/kelas.controllers"));
const auth_middlewares_1 = require("../common/middlewares/auth.middlewares");
exports.kelasRouter = express_1.default.Router();
exports.kelasRouter.get('/get', auth_middlewares_1.verifyJWTToken, kelasController.getAllKelas);
exports.kelasRouter.get('/get/:nama_kelas', auth_middlewares_1.verifyJWTToken, kelasController.getKelasByNamaKelas);
exports.kelasRouter.get('/get/kelompok/:id', auth_middlewares_1.verifyJWTToken, kelasController.getKelompokByKelas);
exports.kelasRouter.post('/post', auth_middlewares_1.verifyJWTToken, kelasController.createKelas);
exports.kelasRouter.delete('/delete', auth_middlewares_1.verifyJWTToken, kelasController.deleteKelas);
