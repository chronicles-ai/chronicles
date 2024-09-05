"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = void 0;
const generate_password_ts_1 = require("generate-password-ts");
class generateRandomPassword {
    static generateRandPass() {
        return (0, generate_password_ts_1.generate)({
            length: 5,
            numbers: true,
        });
    }
    ;
}
exports.generateRandomPassword = generateRandomPassword;
;
