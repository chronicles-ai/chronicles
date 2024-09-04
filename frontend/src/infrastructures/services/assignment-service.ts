import Cookies from 'js-cookie';

import API_URL from '@/config/api';
import { cookiesKey } from '@/config/cookies';

import Grade from '../models/grade';
import Pertandingan from '../models/pertandingan';
import Similarity from '../models/similarity';
import SimilarityParams from '../params/similarity-params';
import { PertandinganWithClass } from '../models/pertandingan_with_class';

async function getAllPertandingan(): Promise<Pertandingan[]> {
  try {
    // http://localhost:8080/chronicles-v1/api/pertandingan/get/all
    const response = await fetch(`${API_URL}/pertandingan/get/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error('Failed to fetch pertandingan');
    }

    const data: Pertandingan[] = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getPertandinganByClass(classId: string): Promise<PertandinganWithClass[]> {
  try {
    // http://localhost:8080/chronicles-v1/api/pertandingan/get/all
    const response = await fetch(`${API_URL}/pertandingan/get/kelas/${classId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error(await response.json() ?? 'Failed to fetch pertandingan');
    }

    const data: PertandinganWithClass[] = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}


async function generateFeedbackAndGrade(
  idGuru: string,
  idKelompok: string,
  idStory: string
): Promise<Grade> {
  try {
    // http://localhost:8080/chronicles-v1/api/nilai/post/guru/GUR_1/kelompok/KEL_beefy-midwife3110/story/STRY_2
    const response = await fetch(
      `${API_URL}/nilai/post/guru/${idGuru}/kelompok/${idKelompok}/story/${idStory}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
        },
      }
    );

    if (!response.ok) {
      throw Error('Failed to generate feedback and grade');
    }

    const data: Grade = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getGradeRecommendation(
  guruId: string,
  kelompokId: string,
  storyId: string
): Promise<Grade> {
  try {
    // http://localhost:8080/chronicles-v1/api/nilai/post/guru/GUR_1/kelompok/KEL_rear-view-overcoat8836/story/STRY_42
    const response = await fetch(
      `${API_URL}/nilai/post/guru/${guruId}/kelompok/${kelompokId}/story/${storyId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
        },
      }
    );

    if (!response.ok) {
      throw Error('Failed to fetch grade recommendation');
    }

    const data: Grade = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getGradeByTeamId(id: string): Promise<Grade[]> {
  try {
    // http://localhost:8080/chronicles-v1/api/nilai/get/kelompok/KEL_divisional-flywheel5191
    const response = await fetch(`${API_URL}/nilai/get/kelompok/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error('Failed to fetch grade');
    }

    const data: Grade[] = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function updateGrade(id: string, newScore: number) {
  try {
    // http://localhost:8080/chronicles-v1/api/nilai/update/nilai-komentar/NIL_1
    const response = await fetch(
      `${API_URL}/nilai/update/nilai-komentar/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
        },
        body: JSON.stringify({
          nilai_kelompok: newScore,
        }),
      }
    );

    if (!response.ok) {
      throw Error('Failed to update grade');
    }

    const data: Grade = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function checkSimilarity(params: SimilarityParams): Promise<Similarity> {
  try {
    // http://localhost:8080/chronicles-v1/api/nilai/similaritas
    const response = await fetch(`${API_URL}/nilai/similaritas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
      body: JSON.stringify({
        ...params,
        id_story_ganjil: '123',
        id_story_genap: '123',
        kode_kelompok_ganjil: '123',
        kode_kelompok_genap: '123',
      }),
    });

    if (!response.ok) {
      throw Error('Failed to check similarity');
    }

    const data: Similarity = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

export default {
  getAllPertandingan,
  getPertandinganByClass,
  generateFeedbackAndGrade,
  getGradeRecommendation,
  getGradeByTeamId,
  updateGrade,
  checkSimilarity,
};
