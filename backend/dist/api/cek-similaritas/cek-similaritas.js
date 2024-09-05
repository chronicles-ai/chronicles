"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestSimilarityApi = void 0;
const axios_1 = __importDefault(require("axios"));
const sendRequestSimilarityApi = async (id_story_ganjil, orientation_ganjil, complication_ganjil, resolution_ganjil, reorientation_ganjil, kode_kelompok_ganjil, id_story_genap, orientation_genap, complication_genap, resolution_genap, reorientation_genap, kode_kelompok_genap) => {
    try {
        console.log('REQUESTING TO COLAB...');
        const response = axios_1.default.post('https://select-visually-ram.ngrok-free.app/v1/grading-similarity-document', {
            "lists": [
                {
                    "id_story": id_story_ganjil,
                    "orientation": orientation_ganjil,
                    "complication": complication_ganjil,
                    "resolution": resolution_ganjil,
                    "reorientation": reorientation_ganjil,
                    "kode_kelompok": kode_kelompok_ganjil
                },
                {
                    "id_story": id_story_genap,
                    "orientation": orientation_genap,
                    "complication": complication_genap,
                    "resolution": resolution_genap,
                    "reorientation": reorientation_genap,
                    "kode_kelompok": kode_kelompok_genap
                }
            ]
        });
        console.log("similarity score: ", (await response).data.similarity_results[0].similarity_score);
        return {
            similarity_score: (await response).data.similarity_results[0].similarity_score,
        };
    }
    catch (error) {
        return error;
    }
};
exports.sendRequestSimilarityApi = sendRequestSimilarityApi;
