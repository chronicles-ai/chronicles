"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const exceptions_1 = require("../../common/exceptions/exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = 'DamnMann*tap'; //env
const verifyToken = async (token) => {
    token = token ? token.replace('Bearer ', '') : null;
    if (!token)
        throw new exceptions_1.InvalidCredentials('Invalid Token');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret_key);
        if (typeof decoded !== 'object' || !decoded.id || !decoded.username) {
            throw new exceptions_1.InvalidCredentials('Invalid Token');
        }
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new exceptions_1.InvalidCredentials('Token Expired');
        }
        throw new exceptions_1.InvalidCredentials('Invalid Token');
    }
};
exports.verifyToken = verifyToken;
