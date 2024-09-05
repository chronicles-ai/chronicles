"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const expiration_time = process.env.EXPIRED_TIME || '12h';
const secret_key = 'DamnMann*tap'; //env
const generateToken = async (user) => {
    let signOptions = {
        expiresIn: expiration_time,
    };
    let token = jsonwebtoken_1.default.sign({ id: user?.id, username: user?.username }, secret_key, signOptions);
    return token;
};
exports.generateToken = generateToken;
