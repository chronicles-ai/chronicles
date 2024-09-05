import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Guru, GuruOutput } from "../../models/guru/guru";
import { Kelas } from "../../models/kelas/kelas";

export const createGuru = async (newGuru: Guru): Promise<GuruOutput> => {
    try {
        return await Guru.create(newGuru);
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const deleteGuru = async (id: string): Promise<string> => {
    try {
        const result = await Guru.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Guru not deleted';
        }
        return `Guru ${id} is deleted`;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const existingGuruById = async (id: string): Promise<boolean> => {
    try {
        const result = await Guru.findByPk(id);
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const existingGuruByUsername = async (username: string): Promise<boolean> => {
    try {
        const result = await Guru.findOne({ where: { username } });
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getGuruByUsername = async (username: string): Promise<GuruOutput | null> => {
    try {
        const guru = await Guru.findOne({ where: { username } });
        return guru || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}

export const getGuruById = async (id: string): Promise<GuruOutput | null> => {
    try {
        const guru = await Guru.findByPk(id);
        return guru || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getAllGuru = async (): Promise<Array<GuruOutput> | null> => {
    try {
        const gurus = await Guru.findAll();
        return gurus || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getGuruByUsernameAndPass = async (username: string, password: string): Promise<GuruOutput | null> => {
    try {
        const guru = await Guru.findOne({ where: { username, password } });
        return guru || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

// get kelas by guru
export const getKelasByGuru = async (id: string): Promise<GuruOutput | null> => {
    try {
        const kelas_by_guru = await Guru.findByPk(id, { include: [{ model: Kelas, as: 'guru' }] });
        return kelas_by_guru || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};