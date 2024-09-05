"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = void 0;
const token_validator_1 = require("../../services/tokens/token.validator");
const exceptions_1 = require("../exceptions/exceptions");
;
const verifyJWTToken = async (req, res, next) => {
    const auth = req.header('Authorization');
    const token = auth ? auth.replace('Bearer ', '') : null;
    try {
        let decodedToken = await (0, token_validator_1.verifyToken)(token);
        req.username = decodedToken.username;
        next();
    }
    catch (error) {
        return (0, exceptions_1.evalException)(error, res);
    }
};
exports.verifyJWTToken = verifyJWTToken;
