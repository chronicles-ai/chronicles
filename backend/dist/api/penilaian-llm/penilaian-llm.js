"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestGradingLlmApi = void 0;
const axios_1 = __importDefault(require("axios"));
const sendRequestGradingLlmApi = async (input_text) => {
    try {
        console.log('REQUESTING TO COLAB...');
        const response = axios_1.default.post('https://select-visually-ram.ngrok-free.app/v1/grading-recommendation', {
            "input_text": input_text
        });
        console.log("message: ", (await response).data.message);
        console.log("result: ", (await response).data.result);
        console.log("final_grade: ", (await response).data.final_grade);
        return {
            message: (await response).data.message,
            result: (await response).data.result,
            final_grade: (await response).data.final_grade
        };
    }
    catch (error) {
        return error;
    }
};
exports.sendRequestGradingLlmApi = sendRequestGradingLlmApi;
