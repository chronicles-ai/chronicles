import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Story } from "../story/story";
import { Restory } from "../restory/restory";
import { Nilai } from "../nilai/nilai";

interface KelompokAttributes {
    id: string,
    username: string,
    password: string,
    nama_kelompok: string,
    status: string, // re-story or story
    ketua: string,
    anggota1: string,
    anggota2: string,
    anggota3: string,
    anggota4: string,
    id_kelas: string
}

export interface KelompokInput extends KelompokAttributes {};
export interface KelompokOutput extends Model<KelompokAttributes>, KelompokAttributes {};

export class Kelompok extends Model<KelompokAttributes, KelompokInput> implements KelompokAttributes {
    declare id: string;
    declare username: string;
    declare password: string;
    declare nama_kelompok: string;
    declare status: string;
    declare ketua: string;
    declare anggota1: string;
    declare anggota2: string;
    declare anggota3: string;
    declare anggota4: string;
    declare id_kelas: string;
};

Kelompok.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_kelompok: {
            type: DataTypes.STRING,
            allowNull: true,
        },  
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ketua: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        anggota1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        anggota2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        anggota3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        anggota4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_kelas: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'kelas',
                key: 'id',
            },
        },
    },
    {
        tableName: 'kelompok',
        timestamps: true,
        sequelize: sequalize,
    },
);

Kelompok.hasOne(Story, { foreignKey: 'id_kelompok', as: 'kelompok_story' });
Kelompok.hasOne(Restory, { foreignKey: 'id_kelompok', as: 'kelompok_restory' })

Kelompok.hasMany(Nilai, { foreignKey: 'id_kelompok', as: 'nilai_kelompok' });

sequalize.sync({ force: false })
    .then(() => console.log('Kelompok table created!!!'))
    .catch((error: Error) => console.log('Error creating table kelompok: ', error));