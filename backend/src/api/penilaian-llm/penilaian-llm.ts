import axios from "axios";

export const sendRequestGradingLlmApi = async (input_text: string) => {
    try {
        console.log('REQUESTING TO COLAB...');
        const response = axios.post('https://select-visually-ram.ngrok-free.app/v1/grading-recommendation', {
            "input_text": input_text
        });

        console.log("message: ", (await response).data.message);
        console.log("result: ", (await response).data.result);
        console.log("final_grade: ", (await response).data.final_grade);

        return {
            message: (await response).data.message,
            result: (await response).data.result,
            final_grade: (await response).data.final_grade
        }
    } catch (error: any) {
        return error;
    }
};