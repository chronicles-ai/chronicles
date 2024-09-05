import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Kelompok } from "../kelompok/kelompok";

interface KelasAttributes {
    id: string,
    nama_kelas: string,
    id_guru: string
};

export interface KelasInput extends KelasAttributes {};
export interface KelasOutput extends Model<KelasAttributes>, KelasAttributes {};

export class Kelas extends Model<KelasAttributes, KelasInput> implements KelasAttributes {
    declare id: string;
    declare nama_kelas: string;
    declare id_guru: string;
};

Kelas.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        nama_kelas: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        id_guru: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'guru',
                key: 'id',
            },
        },
    },
    {
        tableName: 'kelas',
        timestamps: false,
        sequelize: sequalize,
    },
);

Kelas.hasMany(Kelompok, { foreignKey: 'id_kelas', as: 'kelompok_kelas'});

sequalize.sync({ force: false })
    .then(() => console.log('Kelas table created!!!'))
    .catch((error: Error) => console.log('Error creating table kelas: ', error));