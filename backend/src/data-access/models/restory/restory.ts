import { Model, DataTypes } from "sequelize";
import { sequalize } from "../../../common/config/database";
import { Kelompok } from "../kelompok/kelompok";

interface RestoryAttributes {
    id: string,
    id_story: string,
    id_kelompok: string,
    judul: string
    orientation: string,
    complication: string,
    resolution: string,
    reorientation: string
};

export interface RestoryInput extends RestoryAttributes {};
export interface RestoryOutput extends Model<RestoryAttributes>, RestoryAttributes {};

export class Restory extends Model<RestoryAttributes, RestoryInput> implements RestoryAttributes {
    declare id: string;
    declare id_story: string;
    declare id_kelompok: string;
    declare judul: string;
    declare orientation: string;
    declare complication: string;
    declare resolution: string;
    declare reorientation: string;
};

Restory.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        id_story: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'story',
                key: 'id'
            },
        },
        id_kelompok: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'kelompok',
                key: 'id',
            },
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orientation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        complication: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        resolution: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reorientation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'restory',
        timestamps: false,
        sequelize: sequalize,
    },
);

sequalize.sync({ force: false })
    .then(() => console.log('Restory table created!!!'))
    .catch((error: Error) => console.log('Error creating table restory: ', error));