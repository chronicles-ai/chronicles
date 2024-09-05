import * as exceptions from '../../common/exceptions/exceptions';
import * as restoryRepository from '../../data-access/repositories/restory/restory.repositories';
import * as kelompokRepository from '../../data-access/repositories/kelompok/kelompok.repositories';
import * as storyRepository from '../../data-access/repositories/story/story.repositories';

import { validateRestory } from './restory.validator';
import { Restory, RestoryOutput } from '../../data-access/models/restory/restory';
import { StoryOutput } from '../../data-access/models/story/story';

export const createRestory = async (newRestory:Restory): Promise<RestoryOutput> => {
    validateRestory(newRestory);

    const judulStoryExist: boolean = await restoryRepository.existJudulOfRestory(newRestory.judul);
    if (judulStoryExist) {
        throw new exceptions.ElementAlreadyExists(`Judul ${newRestory.judul} already exist`);
    }

    return await restoryRepository.createRestory(newRestory);
};

export const deleteRestory = async (id: string): Promise<string> => {
    const existingRestory: boolean = await restoryRepository.existingRestoryById(id);
    if (!existingRestory) {
        throw new exceptions.ElementNotFoundException(`Restory with id ${id} not found`);
    }

    return await restoryRepository.deleteRestory(id);
};

export const getKelompokByRestory = async (id: string): Promise<RestoryOutput | null> => {
    const existingRestory: boolean = await restoryRepository.existingRestoryById(id);
    if (!existingRestory) {
        throw new exceptions.ElementNotFoundException(`Restory with id ${id} not found`);
    }

    const restory = await restoryRepository.getKelompokByRestory(id);
    return restory;
};

export const getRealStoryImages = async (id_story: string, id_kelompok: string): Promise<StoryOutput | null> => {
    const existingKelompok: boolean = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id_kelompok} not found`);
    }

    const existingStory: boolean = await storyRepository.existingStoryById(id_story);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id_story} not found`);
    }

    const result = await restoryRepository.getRealStoryImages(id_story, id_kelompok);
    return result;
};

export const getRestoryByKelompok = async (id_kelompok: string): Promise<RestoryOutput | null> => {
    const existingKelompok: boolean = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }

    const story = await restoryRepository.getRestoryByKelompokId(id_kelompok);
    return story;
}

