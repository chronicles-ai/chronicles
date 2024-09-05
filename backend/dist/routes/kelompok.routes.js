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
exports.kelompokRouter = void 0;
const express_1 = __importDefault(require("express"));
const kelompokController = __importStar(require("../controllers/kelompok/kelompok.controllers"));
const auth_middlewares_1 = require("../common/middlewares/auth.middlewares");
exports.kelompokRouter = express_1.default.Router();
exports.kelompokRouter.get('/get', auth_middlewares_1.verifyJWTToken, kelompokController.getAllKelompok);
exports.kelompokRouter.get('/get/:id', auth_middlewares_1.verifyJWTToken, kelompokController.getKelompok);
exports.kelompokRouter.get('/story/:id', auth_middlewares_1.verifyJWTToken, kelompokController.getStoryByKelompok);
exports.kelompokRouter.get('/get/class/:id_kelas', auth_middlewares_1.verifyJWTToken, kelompokController.getKelompokByClass);
exports.kelompokRouter.post('/post', auth_middlewares_1.verifyJWTToken, kelompokController.createKelompok);
exports.kelompokRouter.delete('/delete', auth_middlewares_1.verifyJWTToken, kelompokController.deleteKelompok);
exports.kelompokRouter.patch('/update/info/:id', auth_middlewares_1.verifyJWTToken, kelompokController.updateInfoKelompok);
exports.kelompokRouter.patch('/update/status/:id', auth_middlewares_1.verifyJWTToken, kelompokController.updateStatusKelompok);
