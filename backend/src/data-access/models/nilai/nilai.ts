import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";

interface NilaiAttributes {
    id: string,
    nilai_kelompok: number,
    nilai_similaritas:  number,
    komentar: string,
    id_kelompok: string,
    id_guru: string  
}

export interface NilaiInput extends NilaiAttributes {};
export interface NilaiOutput extends Model<NilaiAttributes>, NilaiAttributes {};

export class Nilai extends Model<NilaiAttributes, NilaiInput> implements NilaiAttributes {
    declare id: string;
    declare nilai_kelompok: number;
    declare nilai_similaritas: number;
    declare komentar: string;
    declare id_kelompok: string;
    declare id_guru: string;
}

Nilai.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        nilai_kelompok: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        nilai_similaritas: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        komentar: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        id_kelompok: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'kelompok',
                key: 'id',
            },
        },
        id_guru: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'guru',
                key: 'id'
            },
        },
    },
    {
        tableName: 'nilai',
        timestamps: true,
        sequelize: sequalize,
    },
);

sequalize.sync({ force: false })
    .then(() => console.log('Nilai table created!!!'))
    .catch((error: Error) => console.log('Error creating table nilai: ', error));