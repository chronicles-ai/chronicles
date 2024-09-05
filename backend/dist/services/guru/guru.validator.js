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
exports.validatePassword = exports.validateUsername = exports.validateGuru = void 0;
const stringValidators = __importStar(require("../../common/utils/validations/string.validator"));
const validateGuru = (newGuru) => {
    (0, exports.validateUsername)(newGuru.username);
    (0, exports.validatePassword)(newGuru.password);
};
exports.validateGuru = validateGuru;
const validateUsername = (username) => {
    stringValidators.throwExeptionIfEmptyString(username, 'Username cannot be empty');
    stringValidators.throwExceptionIfMinLength(username, 3, 'Username must be at least 3 characters long');
};
exports.validateUsername = validateUsername;
const validatePassword = (password) => {
    stringValidators.throwExeptionIfEmptyString(password, 'Password cannot be empty');
    stringValidators.throwExceptionIfMinLength(password, 6, 'Password must be at least 8 characters long');
    stringValidators.throwExceptionIfNotContainsLetters(password, 'Password must contain at least one letter');
    stringValidators.throwExceptionIfNotContainsNumbers(password, 'Password must contain at least one number');
    stringValidators.throwExceptionIfNotContainsSpecialCharacters(password, 'Password must contain at least one special character');
};
exports.validatePassword = validatePassword;
