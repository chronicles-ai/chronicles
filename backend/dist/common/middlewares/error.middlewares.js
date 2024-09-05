"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const exceptions_1 = require("../exceptions/exceptions");
const errorMiddleware = (err, req, res, next) => {
    let evalResult = (0, exceptions_1.evalException)(err, res);
    return evalResult;
};
exports.errorMiddleware = errorMiddleware;
