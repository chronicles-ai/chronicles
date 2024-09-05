import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Kelompok } from "./kelompok";
import { Kelas } from "../kelas/kelas";

interface PertandinganAttributes {
    id: string,
    kode_kelompok_ganjil: string,
    kode_kelompok_genap: string,
    id_kelas: string
}

export interface PertandinganInput extends PertandinganAttributes {};
export interface PertandinganOutput extends Model<PertandinganAttributes>, PertandinganAttributes {};

export class Pertandingan extends Model<PertandinganAttributes, PertandinganInput> implements PertandinganAttributes {
    declare id: string;
    declare kode_kelompok_ganjil: string;
    declare kode_kelompok_genap: string;
    declare id_kelas: string;
}

Pertandingan.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        kode_kelompok_ganjil: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Kelompok,
                key: 'id',
            }
        },
        kode_kelompok_genap: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Kelompok,
                key: 'id',
            }
        },
        id_kelas: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Kelas,
                key: 'id',
            },
        },
    },
    {
        tableName: 'pertandingan',
        timestamps: true,
        sequelize: sequalize,
    },
);

Pertandingan.belongsTo(Kelompok, { foreignKey: 'kode_kelompok_ganjil', as: 'kelompokGanjil' });
Pertandingan.belongsTo(Kelompok, { foreignKey: 'kode_kelompok_genap', as: 'kelompokGenap' });

sequalize.sync({ force: false })
    .then(() => console.log('Pertandingan table created!!'))
    .catch((error: Error) => console.log('Error creating table pertandingan: ', error));
    