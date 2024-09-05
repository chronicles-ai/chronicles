"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUsername = void 0;
const unique_username_generator_1 = require("unique-username-generator");
class generateRandomUsername {
    static generateRandUname() {
        return (0, unique_username_generator_1.generateUsername)("-", 2, 20);
    }
    ;
}
exports.generateRandomUsername = generateRandomUsername;
;
