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
exports.guruRouter = void 0;
const express_1 = __importDefault(require("express"));
const guruController = __importStar(require("../controllers/guru/guru.controllers"));
const randomAccCreation = __importStar(require("../controllers/kelompok/random.account.controllers"));
const auth_middlewares_1 = require("../common/middlewares/auth.middlewares");
exports.guruRouter = express_1.default.Router();
exports.guruRouter.get('/get', guruController.getAllGuru);
exports.guruRouter.get('/get/:id', auth_middlewares_1.verifyJWTToken, guruController.getGuru);
exports.guruRouter.get('/kelas/:id', auth_middlewares_1.verifyJWTToken, guruController.getKelasByGuru);
exports.guruRouter.delete('/delete/:id', auth_middlewares_1.verifyJWTToken, guruController.deleteGuru);
exports.guruRouter.post('/signup', guruController.signUp);
exports.guruRouter.post('/kelas/:id_kelas/team-numbers/:team_numbers', randomAccCreation.createRandomAccountByTeamNumbers);
exports.default = exports.guruRouter;
