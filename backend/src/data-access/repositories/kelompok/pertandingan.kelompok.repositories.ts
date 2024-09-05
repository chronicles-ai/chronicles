import { DatabaseException } from "../../../common/exceptions/exceptions";
import { Kelompok, KelompokOutput } from "../../models/kelompok/kelompok";
import { Pertandingan, PertandinganInput, PertandinganOutput } from "../../models/kelompok/pertandingan.kelompok";
import { Restory } from "../../models/restory/restory";
import { Story } from "../../models/story/story";
import { Op } from "sequelize";

export const createPertandingan = async (newPertandingan: PertandinganInput): Promise<PertandinganOutput> => {
    try {
        return await Pertandingan.create(newPertandingan);
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const deletePertandingan = async (id: string): Promise<string> => {
    try {
        const result = await Pertandingan.destroy({ where: { id: id }});
        if (result === 0) {
            return `Pertandingan ${id} not delete`;
        }
        return `Pertandingan ${id} not deleted`;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}; 

export const getStoryFromKelompokByPertandingan = async (id: string): Promise<PertandinganOutput | null> => {
    try {
      const pertandingan = await Pertandingan.findByPk(id, {
        include: [
            { 
                model: Kelompok, 
                as: 'kelompokGanjil', 
                include: [
                    {
                        model: Story, 
                        as: 'kelompok_story', 
                    },
                ],
            },
            { 
                model: Kelompok, as: 'kelompokGenap', 
                include: [
                    {
                        model: Restory, 
                        as: 'kelompok_restory', 
                    },
                ],
            },
        ],
      });
      return pertandingan;
    } catch (error: any) {
      throw new DatabaseException(error.message);
    }
};


export const existingPertandinganByid = async (id: string): Promise<boolean> => {
    try {
        const result = await Pertandingan.findByPk(id);
        return !!result;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getPertandinganRivalNew = async (id_kelompok: string): Promise<PertandinganOutput | null> => {
    try {
        const pertandingan = await Pertandingan.findOne({
            where: {
                [Op.or]: [
                    { kode_kelompok_ganjil: id_kelompok },
                    { kode_kelompok_genap: id_kelompok }
                ],
            },
            include: [
                { model: Kelompok, as: 'kelompokGanjil' },
                { model: Kelompok, as: 'kelompokGenap' }
            ],
        });

        if (!pertandingan) {
            throw new DatabaseException(`Pertandingan not found`);
        }

        return pertandingan;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
}

export const getPertandinganRival = async (id: string, id_kelompok: string): Promise<PertandinganOutput | null> => {
    try {
        const pertandingan = await Pertandingan.findOne({
            where: {
                id,
                [Op.or]: [
                    { kode_kelompok_ganjil: id_kelompok },
                    { kode_kelompok_genap: id_kelompok }
                ]
            },
            include: [
                { model: Kelompok, as: 'kelompokGanjil' },
                { model: Kelompok, as: 'kelompokGenap' }
            ]
        });

        return pertandingan || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};


export const getKelompokPertandingan = async (id: string): Promise<KelompokOutput | null> => {
    try {
        const kelompok = await Kelompok.findByPk(id, { include: [{ model: Pertandingan, as: 'kode_kelompok_ganjil' }] });
        return kelompok || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const getAllPertandingan = async (): Promise<Array<PertandinganOutput> | null> => {
    try {
        const pertandingan = await Pertandingan.findAll();
        return pertandingan || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};

export const showPertandinganByKelas = async (id_kelas: string): Promise<Array<PertandinganOutput> | null> => {
    try {
        const pertandingan = await Pertandingan.findAll({
            where: {
                id_kelas: id_kelas,
            },
            include: [
                { model: Kelompok, as: 'kelompokGanjil' },
                { model: Kelompok, as: 'kelompokGenap' }
            ]
        });
        return pertandingan || null;
    } catch (error: any) {
        throw new DatabaseException(error.message);
    }
};
