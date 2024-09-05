import axios from 'axios';

export const sendRequestGenApi = async (kelas: string, kelompok: string, story: string) => {
    try {
        console.log('REQUESTING TO COLAB...')
        const response = axios.post('https://adder-robust-seasnail.ngrok-free.app/v1/generate', {
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
    } catch (error: any) {
        return error;
    }
};