import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Guru } from "../../models/guru/guru";
import { Nilai, NilaiInput, NilaiOutput } from "../../models/nilai/nilai";

export const createNilai = async (newNilai: Nilai): Promise<NilaiOutput> => {
    try {
        return await Nilai.create(newNilai);
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const deleteNilai = async (id: string): Promise<string> => {
    try {
        const result = await Nilai.destroy({ where: { id: id } });
        if (result === 0) {
            return 'Nilai not deleted';
        }
        return `Nilai ${id} is deleted`;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const existingNilaiById = async (id: string): Promise<boolean> => {
    try {
        const result = await Nilai.findByPk(id);
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}

export const getGuruByNilai = async (id: string): Promise<NilaiOutput | null> => {
    try {
        const tugas = await Nilai.findByPk(id, { include: [{ model: Guru, as: 'guru' }] });
        return tugas || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}

export const updateNilaiAndKomentar = async (id: string, updatedNilai: NilaiInput): Promise<NilaiOutput | null> => {
    try {
        await Nilai.update(updatedNilai, { where: { id: id }});
        return await Nilai.findByPk(id);
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const existingNilaiByIdGuruAndIdKelompok = async (id_guru: string, id_kelompok: string): Promise<boolean> => {
    try {
        const existNilai = await Nilai.findOne({ where: { id_guru: id_guru, id_kelompok: id_kelompok  }});

        return !!existNilai;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const getNilaiByKelompok = async (id_kelompok: string): Promise<Array<NilaiOutput> | null> => {
    try {
        const nilai = await Nilai.findAll({ where: { id_kelompok: id_kelompok } });

        return nilai || null;
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};

export const updateNilaiAndKomentarByKelompok = async (id: string, id_kelompok: string, updatedNilai: NilaiInput): Promise<NilaiOutput | null> => {
    try {
        await Nilai.update(updatedNilai, { where: { id: id, id_kelompok: id_kelompok } });
        return await Nilai.findByPk(id);
    } catch (error: any) {
        throw new DatabaseException(error.message); 
    }
};