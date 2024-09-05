"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestGenApi = void 0;
const axios_1 = __importDefault(require("axios"));
const sendRequestGenApi = async (kelas, kelompok, story) => {
    try {
        console.log('REQUESTING TO COLAB...');
        const response = axios_1.default.post('https://adder-robust-seasnail.ngrok-free.app/v1/generate', {
            Kelas: kelas,
            Kelompok: kelompok,
            Story: story
        });
        console.log("message:", (await response).data.message);
        console.log("status:", (await response).data.status);
        console.log("url gambar:", (await response).data.url_gambar[0]);
        return {
            message: (await response).data.message,
            status: (await response).data.status,
            url_gambar: (await response).data.url_gambar[0]
        };
    }
    catch (error) {
        return error;
    }
};
exports.sendRequestGenApi = sendRequestGenApi;
