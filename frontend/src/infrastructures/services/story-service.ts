import Cookies from 'js-cookie';

import API_URL from '@/config/api';
import { cookiesKey } from '@/config/cookies';

import Restory, { RestoryResponse } from '../models/restory';
import Story, { StoryResponse } from '../models/story';
import StoryByKelompokResponse from '../models/story-by-kelompok';
import ReStoryParams from '../params/restory-params';
import StoryParams from '../params/story-params';

async function createStory(story: StoryParams): Promise<Story> {
  try {
    const response = await fetch(`${API_URL}/story/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
      body: JSON.stringify(story),
    });

    if (!response.ok) {
      throw Error((await response.json()).message ?? 'Failed to create story');
    }

    const data: StoryResponse = await response.json();

    return {
      id: data.id,
      title: data.judul,
      orientation: data.orientation,
      complication: data.complication,
      resolution: data.resolution,
      reorientation: data.reorientation,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      imageUrl: data.url_gambar,
      teamId: data.id_kelompok,
    } satisfies Story;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Unexpected Error: Failed to create story');
  }
}

async function createRestory(restory: ReStoryParams): Promise<Story> {
  try {
    const response = await fetch(`${API_URL}/restory/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
      body: JSON.stringify(restory),
    });

    if (!response.ok) {
      throw Error((await response.json()).message ?? 'Failed to create story');
    }

    const data: StoryResponse = await response.json();

    return {
      id: data.id,
      title: data.judul,
      orientation: data.orientation,
      complication: data.complication,
      resolution: data.resolution,
      reorientation: data.reorientation,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      imageUrl: data.url_gambar,
      teamId: data.id_kelompok,
    } satisfies Story;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getStoryById(id: string): Promise<StoryResponse> {
  try {
    const response = await fetch(`${API_URL}/story/get/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error((await response.json())?.message ?? 'Failed to fetch story');
    }

    const data: StoryResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getStoryByKelompokId(id: string): Promise<Story> {
  try {
    // http://localhost:8080/chronicles-v1/api/kelompok/story/KEL_monthly-dispute722
    const response = await fetch(`${API_URL}/kelompok/story/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error((await response.json()).message ?? 'Failed to fetch story');
    }

    const data: StoryByKelompokResponse = await response.json();

    console.log('getStoryByKelompokId', data.kelompok_story);
    if (data.kelompok_story === null) {
      return {
        id: '~~~',
        title: '',
        orientation: '',
        complication: '',
        resolution: '',
        reorientation: '',
        createdAt: '',
        updatedAt: '',
        imageUrl: '',
        teamId: '',
      } satisfies Story;
    }

    return {
      id: data.kelompok_story.id,
      title: data.kelompok_story.judul,
      orientation: data.kelompok_story.orientation,
      complication: data.kelompok_story.complication,
      resolution: data.kelompok_story.resolution,
      reorientation: data.kelompok_story.reorientation,
      createdAt: data.kelompok_story.createdAt,
      updatedAt: data.kelompok_story.updatedAt,
      imageUrl: data.kelompok_story.url_gambar,
      teamId: data.kelompok_story.id_kelompok,
    } satisfies Story;

    // return data.map((item) => {
    //   return {
    //     id: item.id,
    //     title: item.judul,
    //     orientation: item.orientation,
    //     complication: item.complication,
    //     resolution: item.resolution,
    //     reorientation: item.reorientation,
    //     createdAt: item.createdAt,
    //     updatedAt: item.updatedAt,
    //     imageUrl: item.url_gambar,
    //     teamId: item.id_kelompok,
    //   };
    // });
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

async function getRestoryByKelompokId(id: string): Promise<Restory> {
  try {
    // /get/kelompok/:id_kelompok
    const response = await fetch(`${API_URL}/restory/get/kelompok/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get(cookiesKey.token),
      },
    });

    if (!response.ok) {
      throw Error('Failed to fetch story');
    }

    const data: RestoryResponse = await response.json();

    return {
      id: data.id,
      storyId: data.id_story,
      title: data.judul,
      orientation: data.orientation,
      complication: data.complication,
      resolution: data.resolution,
      reorientation: data.reorientation,
      teamId: data.id_kelompok,
    } satisfies Restory;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Failed to fetch team');
  }
}

export default {
  createStory,
  createRestory,
  getStoryById,
  getStoryByKelompokId,
  getRestoryByKelompokId,
};
