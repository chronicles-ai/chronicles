"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwExceptionIfNotNumber = exports.throwExceptionIfNumberGreaterThan = exports.throwExceptionIfNumberLessThan = void 0;
const exceptions_1 = require("../../exceptions/exceptions");
const throwExceptionIfNumberLessThan = (val, min, message) => {
    if (val < min) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNumberLessThan = throwExceptionIfNumberLessThan;
const throwExceptionIfNumberGreaterThan = (val, max, message) => {
    if (val > max) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNumberGreaterThan = throwExceptionIfNumberGreaterThan;
const throwExceptionIfNotNumber = (val, message) => {
    if (!val || isNaN(val)) {
        throw new exceptions_1.ElementInvalidException(message);
    }
};
exports.throwExceptionIfNotNumber = throwExceptionIfNotNumber;
