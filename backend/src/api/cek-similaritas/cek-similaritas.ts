import axios from "axios";

export const sendRequestSimilarityApi = async (id_story_ganjil: string, orientation_ganjil: string, complication_ganjil: string, resolution_ganjil: string, reorientation_ganjil: string, kode_kelompok_ganjil: string, id_story_genap: string, orientation_genap: string, complication_genap: string, resolution_genap: string, reorientation_genap: string, kode_kelompok_genap: string) => {
    try {
        console.log('REQUESTING TO COLAB...');
        const response = axios.post('https://select-visually-ram.ngrok-free.app/v1/grading-similarity-document', {
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
        }
    } catch (error: any) {
        return error;
    }
};