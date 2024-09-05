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
exports.createRandomAccountByTeamNumbers = void 0;
const kelompokServices = __importStar(require("../../services/kelompok/kelompok.services"));
const createRandomAccountByTeamNumbers = async (req, res, next) => {
    try {
        const { team_numbers } = req.params;
        const { id_kelas } = req.params;
        if (!team_numbers || isNaN(parseInt(team_numbers))) {
            return res.status(400).json({ error: "Invalid team_numbers parameter" });
        }
        const team_numbers_number = parseInt(team_numbers);
        if (team_numbers_number <= 0) {
            return res.status(400).json({ error: "team_numbers must be a positive number" });
        }
        const newKelompokData = { ...req.body, id_kelas: id_kelas };
        const akun = await kelompokServices.createRandomAccountByTeamNumbers(team_numbers_number, newKelompokData);
        return res.status(201).send(akun);
    }
    catch (error) {
        return next(error);
    }
};
exports.createRandomAccountByTeamNumbers = createRandomAccountByTeamNumbers;
