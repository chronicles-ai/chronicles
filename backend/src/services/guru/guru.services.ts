import * as exceptions from '../../common/exceptions/exceptions';
import * as guruRepository from '../../data-access/repositories/guru/guru.repositories';

import { validateGuru } from './guru.validator';
import { Guru, GuruOutput } from '../../data-access/models/guru/guru';

export const createGuru = async (newGuru: Guru): Promise<GuruOutput> => {
    validateGuru(newGuru);

    const usernameExist: boolean = await guruRepository.existingGuruByUsername(newGuru.username);
    if (usernameExist) {
        throw new exceptions.ElementAlreadyExists(`Guru with ${newGuru.username} already exist!!`);
    }

    return await guruRepository.createGuru(newGuru);  
};

export const deleteGuru = async (id: string): Promise<string> => {
    const existingGuru: boolean = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }

    return await guruRepository.deleteGuru(id);
};

export const getGuruByUsername = async (username: string): Promise<GuruOutput | null> => {
    const existingGuru = await guruRepository.existingGuruByUsername(username);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${username} not found!!`);
    }

    const guru = await guruRepository.getGuruByUsername(username);
    return guru;
}

export const getGuruById = async (id: string): Promise<GuruOutput | null> => {
    const existingGuru = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }

    const guru = await guruRepository.getGuruById(id);
    return guru;
};

export const getAllGuru = async (): Promise<Array<GuruOutput> | null> => {
    return await guruRepository.getAllGuru();
};

export const getGuruByUsernameAndPass = async (username: string, password: string): Promise<GuruOutput | null> => {
    const existingGuru = await guruRepository.existingGuruByUsername(username);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${username} not found!!`);
    }

    const guru = await guruRepository.getGuruByUsernameAndPass(username, password);
    return guru;
};

export const getKelasByGuru = async (id: string): Promise<GuruOutput | null> => {
    const existingGuru = await guruRepository.existingGuruById(id);
    if (!existingGuru) {
        throw new exceptions.ElementNotFoundException(`Guru with ${id} not found!!`);
    }

    const kelasByGuru = await guruRepository.getKelasByGuru(id);
    return kelasByGuru;
};