import Cookies from 'js-cookie';

import API_URL from '@/config/api';
import { cookiesKey } from '@/config/cookies';

import Class, { ClassResponse } from '../models/class';
import Team, { TeamResponse } from '../models/team';

async function fetchAllClasses(): Promise<Class[]> {
  try {
    // http://localhost:3000/chronicles-v1/api/kelas/get
    const response = await fetch(`${API_URL}/kelas/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (response.status !== 200) {
      throw Error('Failed to fetch classes');
    }

    const data: ClassResponse[] = await response.json();

    if (response.status !== 200) {
      throw Error('Error fetching classes');
    }

    return data.map((item) => {
      return {
        id: item.id,
        name: item.nama_kelas,
        teacherId: item.id_guru,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('An error occurred while logging in. Please try again.');
  }
}

async function fetchTeamsByClassId(classId: string): Promise<Team[]> {
  try {
    const response = await fetch(`${API_URL}/kelompok/get/class/${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (response.status !== 200) {
      throw Error('Failed to fetch teams');
    }

    const data: TeamResponse[] = await response.json();

    return data.map((item) => {
      return {
        id: item.id,
        classId: item.id_kelas,
        name: item.nama_kelompok,
        username: item.username,
        password: item.password,
        status: item.status,
        leader: item.ketua,
        member1: item.anggota1,
        member2: item.anggota2,
        member3: item.anggota3,
        member4: item.anggota4,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('An error occurred while logging in. Please try again.');
  }
}

async function generateTeams(
  classId: string,
  numOfTeams: number
): Promise<void> {
  try {
    const response = await fetch(
      `${API_URL}/guru/kelas/${classId}/team-numbers/${numOfTeams}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
        },
      }
    );

    if (response.status !== 201) {
      throw Error('Failed to generate teams');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('An error occurred while logging in. Please try again.');
  }
}

export default {
  fetchAllClasses,
  fetchTeamsByClassId,
  generateTeams,
};
