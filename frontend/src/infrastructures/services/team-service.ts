import Cookies from 'js-cookie';

import API_URL from '@/config/api';
import { cookiesKey } from '@/config/cookies';

import Team, { RivalResponse, TeamResponse } from '../models/team';
import TeamParams from '../params/team-params';

async function getTeamsById(id: string): Promise<Team> {
  try {
    const response = await fetch(`${API_URL}/kelompok/get/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team');
    }

    const team: TeamResponse = await response.json();

    return {
      id: team.id,
      name: team.nama_kelompok,
      leader: team.ketua,
      member1: team.anggota1,
      member2: team.anggota2,
      member3: team.anggota3,
      member4: team.anggota4,
      status: team.status,
      username: team.username,
      password: team.password,
    } satisfies Team;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function updateTeam(team: TeamParams): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/kelompok/update/info/${team.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
      body: JSON.stringify(team),
    });

    if (!response.ok) {
      throw new Error('Failed to update team');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to update team');
  }
}

async function getRival(id: string): Promise<RivalResponse> {
  try {
    // http://localhost:8080/chronicles-v1/api/pertandingan/get/kelompok/KEL_beefy-midwife3110
    const response = await fetch(`${API_URL}/pertandingan/get/kelompok/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rival');
    }

    const rival: RivalResponse = await response.json();

    return rival;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to update team');
  }
}

export default {
  getTeamsById,
  updateTeam,
  getRival,
};
