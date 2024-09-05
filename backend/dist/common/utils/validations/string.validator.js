"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwExceptionIfNotUppercaseLetters = exports.throwExceptionIfNotValidEmail = exports.throwExceptionIfNotContainsSpecialCharacters = exports.throwExceptionIfNotContainsLetters = exports.throwExceptionIfNotContainsNumbers = exports.throwExceptionIfMaxLength = exports.throwExceptionIfMinLength = exports.throwExeptionIfEmptyString = void 0;
const exceptions_1 = require("../../exceptions/exceptions");
const throwExeptionIfEmptyString = (val, message) => {
    if (!val) {
        throw new exceptions_1.ElementInvalidException(message);
    }
    if (val === '') {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExeptionIfEmptyString = throwExeptionIfEmptyString;
const throwExceptionIfMinLength = (val, minLength, message) => {
    if (val.length < minLength) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfMinLength = throwExceptionIfMinLength;
const throwExceptionIfMaxLength = (val, maxLength, message) => {
    if (val.length > maxLength) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfMaxLength = throwExceptionIfMaxLength;
const throwExceptionIfNotContainsNumbers = (val, message) => {
    var numbers = /[0-9]/g;
    if (!val.match(numbers)) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNotContainsNumbers = throwExceptionIfNotContainsNumbers;
const throwExceptionIfNotContainsLetters = (val, message) => {
    var letters = /[a-zA-Z]/g;
    if (!val.match(letters)) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNotContainsLetters = throwExceptionIfNotContainsLetters;
const throwExceptionIfNotContainsSpecialCharacters = (val, message) => {
    var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (!val.match(specialCharacters)) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNotContainsSpecialCharacters = throwExceptionIfNotContainsSpecialCharacters;
const throwExceptionIfNotValidEmail = (val, message) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!val.match(mailformat)) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNotValidEmail = throwExceptionIfNotValidEmail;
const throwExceptionIfNotUppercaseLetters = (val, message) => {
    var codeFormat = /^[A-Z]$/;
    for (let i = 0; i < val.length; i++) {
        if (!val[i].match(codeFormat)) {
            throw new exceptions_1.ElementInvalidException(message);
        }
    }
};
exports.throwExceptionIfNotUppercaseLetters = throwExceptionIfNotUppercaseLetters;
