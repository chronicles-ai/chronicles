import axios from 'axios';

const voiceId = 'MF3mGyEYCl7XYWbV9V6O';
const modelId = 'eleven_multilingual_v2';
const voiceSettings = {
  stability: 0,
  similarity_boost: 0,
  style: 0,
  use_speaker_boost: true,
};

async function convertTextToSpeech(text: string): Promise<HTMLAudioElement> {
  try {
    const baseUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
    const headers = {
      Accept: 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': '4584a85feffd5e2c1406971a637a85ce',
    };

    const requestBody = {
      text,
      model_id: modelId,
      voice_settings: voiceSettings,
    };

    const response = await axios.post(
      `${baseUrl}/${voiceId}/stream`,
      requestBody,
      {
        headers,
        responseType: 'blob',
      }
    );

    const data = new Blob([response.data], { type: 'audio/mpeg' });

    if (response.status === 200) {
      return new Audio(URL.createObjectURL(data));
    } else {
      throw new Error('Unable to stream audio.');
    }
  } catch (error) {
    console.error('textToSpeech error', error);
    throw error;
  }
}

export default {
  convertTextToSpeech,
};
