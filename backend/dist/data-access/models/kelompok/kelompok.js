"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kelompok = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
const story_1 = require("../story/story");
const restory_1 = require("../restory/restory");
const nilai_1 = require("../nilai/nilai");
;
;
class Kelompok extends sequelize_1.Model {
}
exports.Kelompok = Kelompok;
;
Kelompok.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nama_kelompok: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ketua: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    anggota1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    anggota2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    anggota3: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    anggota4: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_kelas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'kelas',
            key: 'id',
        },
    },
}, {
    tableName: 'kelompok',
    timestamps: true,
    sequelize: database_1.sequalize,
});
Kelompok.hasOne(story_1.Story, { foreignKey: 'id_kelompok', as: 'kelompok_story' });
Kelompok.hasOne(restory_1.Restory, { foreignKey: 'id_kelompok', as: 'kelompok_restory' });
Kelompok.hasMany(nilai_1.Nilai, { foreignKey: 'id_kelompok', as: 'nilai_kelompok' });
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Kelompok table created!!!'))
    .catch((error) => console.log('Error creating table kelompok: ', error));
