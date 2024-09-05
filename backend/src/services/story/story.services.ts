import * as exceptions from '../../common/exceptions/exceptions';
import * as storyRepository from '../../data-access/repositories/story/story.repositories';
import * as kelompokRepository from '../../data-access/repositories/kelompok/kelompok.repositories';

import { validateStory } from './story.validator';
import { Story, StoryOutput } from '../../data-access/models/story/story';

export const createStory = async (newStory:Story): Promise<StoryOutput> => {
    validateStory(newStory);

    const judulStoryExist: boolean = await storyRepository.existJudulOfStory(newStory.judul);
    if (judulStoryExist) {
        throw new exceptions.ElementAlreadyExists(`Judul ${newStory.judul} already exist`);
    }

    return await storyRepository.createStory(newStory);
};

export const deleteStory = async (id: string): Promise<string> => {
    const existingStory: boolean = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }

    return await storyRepository.deleteStory(id);
};

export const getKelompokByStory = async (id: string): Promise<StoryOutput | null> => {
    const existingStory: boolean = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }

    const story = await storyRepository.getKelompokByStory(id);
    return story;
};

export const updateGambar = async (id: string, url_gambar: string): Promise<StoryOutput | null> => {
    const existingStory: boolean = await storyRepository.existingStoryById(id); 
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }

    const story = await storyRepository.updateGambar(id, url_gambar);
    return story;
};

export const getStoryById = async (id: string): Promise<StoryOutput | null> => {
    const existingStory: boolean = await storyRepository.existingStoryById(id);
    if (!existingStory) {
        throw new exceptions.ElementNotFoundException(`Story with id ${id} not found`);
    }

    const story = await storyRepository.getStoryById(id);
    return story;
};

export const getStoryByKelompok = async (id: string, id_kelompok: string): Promise<StoryOutput | null> => {
    const existingKelompok: boolean = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }

    const story = await storyRepository.getStoryByKelompokId(id, id_kelompok);
    return story;
};

export const getKelompokStory = async (id_kelompok: string): Promise<Array<StoryOutput> | null> => {
    const existingKelompok: boolean = await kelompokRepository.existingKelompokById(id_kelompok);
    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with id ${id_kelompok} not found`);
    }

    const allstory = await storyRepository.getKelompokStory(id_kelompok);
    return allstory;
};