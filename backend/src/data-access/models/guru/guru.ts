import { Model,DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Kelas } from "../kelas/kelas";
import { Nilai } from "../nilai/nilai";

interface GuruAttributes {
    id: string,
    username: string,
    password: string,
    nama: string
}

export interface GuruInput extends GuruAttributes {}
export interface GuruOutput extends Model<GuruAttributes>, GuruAttributes {}

export class Guru extends Model<GuruAttributes, GuruInput> implements GuruAttributes {
    declare id: string;
    declare username: string;
    declare password: string;
    declare nama: string;
};

Guru.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "guru",
        timestamps: false,
        sequelize: sequalize,
    }
);

Guru.hasMany(Kelas, { foreignKey: 'id_guru', as: 'guru' });
Guru.hasMany(Nilai, { foreignKey: 'id_guru', as: 'nilai_guru' });

sequalize.sync({ force: false })
    .then(() => console.log('Guru table created!!!'))
    .catch((error: Error) => console.log('Error creating table guru:', error))