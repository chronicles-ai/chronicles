import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Kelompok, KelompokOutput } from "../../models/kelompok/kelompok";
import { Story } from "../../models/story/story";

export const createKelompok = async (newKelompok: Kelompok): Promise<KelompokOutput> => {
    try {
        return await Kelompok.create(newKelompok);
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const deleteKelompok = async (id: string): Promise<string> => {
    try {
        const result = await Kelompok.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Kelompok not deleted';
        }
        return `Kelompok ${id} is deleted`;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const existingKelompokByNama = async (nama_kelompok: string): Promise<boolean> => {
    try {
        const result = await Kelompok.findOne({ where: { nama_kelompok: nama_kelompok } });
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const existingKelompokById = async (id: string): Promise<boolean> => {
    try {
        const result = await Kelompok.findByPk(id);
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const getAllKelompok = async (): Promise<Array<KelompokOutput> | null> => {
    try {
        const kelompoks = await Kelompok.findAll();
        return kelompoks || null;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const getKelompokById = async (id: string): Promise<KelompokOutput | null> => {
    try {
        const kelompok = await Kelompok.findByPk(id);
        return kelompok || null;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const getKelompokByClass = async (id_kelas: string): Promise<Array<KelompokOutput> | null> => {
    try {
        const kelompok = await Kelompok.findAll({ where: { id_kelas: id_kelas } });
        return kelompok || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}

export const createRandomAccounts = async (accounts: Array<Kelompok>): Promise<Array<KelompokOutput>> => {
    try {
        const createdAccounts: Array<KelompokOutput> = [];  

        for (const account of accounts) {
            const kelompok = await Kelompok.create(account);
            createdAccounts.push(kelompok);
        }

        return createdAccounts;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getKelompokByUsernameAndPassword = async (username: string, password: string): Promise<KelompokOutput | null> => {
    try {
        const kelompok = await Kelompok.findOne({ where: { username: username, password: password }});
        return kelompok || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    };
};

export const existigKelompokByUsername = async (username: string): Promise<boolean> => {
    try {
        const result = await Kelompok.findOne({ where: { username: username } });
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    };
};

//update info kelompok
export const updateInfoKelompok = async (id: string, nama_kelompok: string, ketua: string, anggota1: string, anggota2: string, anggota3: string, anggota4: string): Promise<KelompokOutput | null> => {
    try {
        await Kelompok.update({ nama_kelompok: nama_kelompok, ketua: ketua, anggota1: anggota1, anggota2: anggota2, anggota3: anggota3, anggota4: anggota4 }, { where: { id: id }});
        return await Kelompok.findByPk(id);
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

//update status story restory kelompok
export const updateStatusKelompok = async (id: string, status: string): Promise<KelompokOutput | null> => {
    try {
        await Kelompok.update({ status: status }, { where: {id: id }});
        return await Kelompok.findByPk(id);
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const getStoryByKelompok = async (id: string): Promise<KelompokOutput | null> => {
    try {
        const kelompok_story = await Kelompok.findByPk(id, { include: [{ model: Story, as: 'kelompok_story' }]});
        return kelompok_story || null
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};