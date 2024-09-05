"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdUser = void 0;
class generateIdUser {
    static counter = 0;
    static generateId(prefix) {
        this.counter++;
        return prefix + this.counter.toString();
    }
}
exports.generateIdUser = generateIdUser;
