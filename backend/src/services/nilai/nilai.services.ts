import * as exceptions from '../../common/exceptions/exceptions';
import * as nilaiRepository from '../../data-access/repositories/nilai/nilai.repositories';
// import * as storyRepository from '../../data-access/repositories/story/story.repositories';
// import * as restoryRepository from '../../data-access/repositories/restory/restory.repositories';
import * as kelompokRepository from '../../data-access/repositories/kelompok/kelompok.repositories';

import { Nilai, NilaiInput, NilaiOutput } from '../../data-access/models/nilai/nilai';

export const createNilai = async (newNilai: Nilai): Promise<NilaiOutput> => {    
    return await nilaiRepository.createNilai(newNilai);
};

export const deleteNilai = async (id: string): Promise<string> => {
    const existingNilai: boolean = await nilaiRepository.existingNilaiById(id);
    if (!existingNilai) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }

    return await nilaiRepository.deleteNilai(id);
};

export const getGuruByNilai = async (id: string): Promise<NilaiOutput | null> => {
    const existingNilai: boolean = await nilaiRepository.existingNilaiById(id);
    if (!existingNilai) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }

    return await nilaiRepository.getGuruByNilai(id);
};

export const updateNilaiAndKomentar = async (id: string, updatedNilai: NilaiInput): Promise<NilaiOutput | null> => {
    const existingNilai: boolean = await nilaiRepository.existingNilaiById(id);
    if (!existingNilai) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }

    return await nilaiRepository.updateNilaiAndKomentar(id, updatedNilai);
};

export const getNilaiByKelompok = async (id_kelompok: string): Promise<Array<NilaiOutput> | null> => {
    const existingKelompok = kelompokRepository.existingKelompokById(id_kelompok);

    if (!existingKelompok) {
        throw new exceptions.ElementNotFoundException(`Kelompok with ${id_kelompok} not found!!`);
    }

    const result = await nilaiRepository.getNilaiByKelompok(id_kelompok);
    return result || null;
};

export const updateNilaiAndKomentarByKelompok =  async (id: string, id_kelompok: string, updatedNilai: NilaiInput): Promise<NilaiOutput | null> => {
    const existingNilai: boolean = await nilaiRepository.existingNilaiById(id);
    if (!existingNilai) {
        throw new exceptions.ElementNotFoundException(`Tugas with ${id} not found!!`);
    }

    return await nilaiRepository.updateNilaiAndKomentarByKelompok(id, id_kelompok, updatedNilai);
}; 