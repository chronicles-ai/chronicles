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
exports.pertandinganRouter = void 0;
const express_1 = __importDefault(require("express"));
const pertandinganController = __importStar(require("../controllers/pertandingan/pertandingan.controllers"));
const auth_middlewares_1 = require("../common/middlewares/auth.middlewares");
exports.pertandinganRouter = express_1.default.Router();
exports.pertandinganRouter.get('/get/story/kelompok/:id', auth_middlewares_1.verifyJWTToken, pertandinganController.getStoryFromKelompokByPertandingan);
exports.pertandinganRouter.get('/get/kelompok/:id', auth_middlewares_1.verifyJWTToken, pertandinganController.getPertandinganRivalNew);
exports.pertandinganRouter.get('/get/:id/kelompok/:id_kelompok', auth_middlewares_1.verifyJWTToken, pertandinganController.getPertandinganRival);
exports.pertandinganRouter.get('/get/all', auth_middlewares_1.verifyJWTToken, pertandinganController.getAllPertandingan);
exports.pertandinganRouter.get('/get/:id', auth_middlewares_1.verifyJWTToken, pertandinganController.getKelompokPertandingan);
exports.pertandinganRouter.post('/post', auth_middlewares_1.verifyJWTToken, pertandinganController.createPertandingan);
exports.pertandinganRouter.delete('/delete', auth_middlewares_1.verifyJWTToken, pertandinganController.deletePertandingan);
