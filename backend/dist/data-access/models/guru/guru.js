"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guru = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
const kelas_1 = require("../kelas/kelas");
const nilai_1 = require("../nilai/nilai");
class Guru extends sequelize_1.Model {
}
exports.Guru = Guru;
;
Guru.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nama: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "guru",
    timestamps: false,
    sequelize: database_1.sequalize,
});
Guru.hasMany(kelas_1.Kelas, { foreignKey: 'id_guru', as: 'guru' });
Guru.hasMany(nilai_1.Nilai, { foreignKey: 'id_guru', as: 'nilai_guru' });
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Guru table created!!!'))
    .catch((error) => console.log('Error creating table guru:', error));
