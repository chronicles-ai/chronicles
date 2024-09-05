import * as exceptions from '../../common/exceptions/exceptions';
import * as pertandinganRepository from '../../data-access/repositories/kelompok/pertandingan.kelompok.repositories';
import * as kelompokRepository from '../../data-access/repositories/kelompok/kelompok.repositories';
import * as kelasRepository from '../../data-access/repositories/kelas/kelas.repositories';

import { Pertandingan, PertandinganOutput } from '../../data-access/models/kelompok/pertandingan.kelompok';
import { KelompokOutput } from '../../data-access/models/kelompok/kelompok';

export const createPertandingan = async (newPertandingan: Pertandingan): Promise<PertandinganOutput> => {
    return await pertandinganRepository.createPertandingan(newPertandingan);
};

export const deletePertandingan = async (id: string): Promise<string> => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);

    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }

    return await pertandinganRepository.deletePertandingan(id);
}

export const getStoryFromKelompokByPertandingan = async (id: string): Promise<PertandinganOutput | null> => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);

    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }

    const cerita_hasil_pertandingan_antar_kelompok = await pertandinganRepository.getStoryFromKelompokByPertandingan(id);
    return cerita_hasil_pertandingan_antar_kelompok || null;
}

export const getPertandinganRivalNew = async(id_kelompok: string): Promise<PertandinganOutput | null> => {
    const pertandingan = await pertandinganRepository.getPertandinganRivalNew(id_kelompok);
    return pertandingan;
};

export const getPertandinganRival = async (id: string, id_kelompok: string): Promise<PertandinganOutput | null> => {
    const existPertandingan = await pertandinganRepository.existingPertandinganByid(id);

    if (!existPertandingan) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }

    const pertandingan = await pertandinganRepository.getPertandinganRival(id, id_kelompok);
    return pertandingan || null;
};

export const getKelompokPertandingan = async (id: string): Promise<KelompokOutput | null> => {
    const existKelompok = await kelompokRepository.existingKelompokById(id);

    if (!existKelompok) {
        throw new exceptions.ElementNotFoundException(`Pertandingan ${id} not found`);
    }

    const pertandingan = await pertandinganRepository.getKelompokPertandingan(id);
    return pertandingan || null;
};

export const getAllPertandingan = async (): Promise<Array<PertandinganOutput> | null> => {
    return await pertandinganRepository.getAllPertandingan();
};

export const showPertandinganByKelas = async (id_kelas: string): Promise<Array<PertandinganOutput> | null> => {
    const existKelas = await kelasRepository.existingKelasById(id_kelas);

    if (!existKelas) {
        throw new exceptions.ElementNotFoundException(`Kelas ${id_kelas} not found`);
    }

    const pertandingan = await pertandinganRepository.showPertandinganByKelas(id_kelas);
    return pertandingan || null;
};