import * as exceptions from '../../common/exceptions/exceptions';
import * as kelasRepository from '../../data-access/repositories/kelas/kelas.repositories';

import { validateKelas } from './kelas.validator';
import { Kelas, KelasOutput } from '../../data-access/models/kelas/kelas';

export const createKelas = async (newKelas: Kelas): Promise<KelasOutput> => {
    validateKelas(newKelas);

    const kelasExist: boolean = await kelasRepository.existingKelasByName(newKelas.nama_kelas);
    if (kelasExist) {
        throw new exceptions.ElementAlreadyExists(newKelas.nama_kelas);
    }

    return await kelasRepository.createKelas(newKelas);
};

export const deleteKelas = async (id: string): Promise<string> => {
    const existingKelas: boolean = await kelasRepository.existingKelasById(id);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Murid with ${id} not found!!`);
    }

    return await kelasRepository.deleteKelas(id);
};

export const getKelasById = async (id: string): Promise<KelasOutput | null> => {
    const kelas = await kelasRepository.getKelasById(id);

    return kelas;
}

export const getAllKelas = async (): Promise<Array<KelasOutput> | null> => {
    return await kelasRepository.getAllKelas() || null;
};

export const getKelasByNamaKelas = async (nama_kelas: string): Promise<KelasOutput | null> => {
    const existingKelas: boolean = await kelasRepository.existingKelasByName(nama_kelas);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Kelas ${nama_kelas} not found!!`);
    }

    const kelas = kelasRepository.getKelasByNamaKelas(nama_kelas);
    return kelas || null;
};

export const getKelompokByKelas = async (id: string): Promise<KelasOutput | null> => {
    const existingKelas: boolean = await kelasRepository.existingKelasById(id);
    if (!existingKelas) {
        throw new exceptions.ElementNotFoundException(`Kelas ${id} not found!!`);
    }

    const kelas = kelasRepository.getKelompokByKelas(id);
    return kelas || null;
}