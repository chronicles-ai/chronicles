"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kelas = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
const kelompok_1 = require("../kelompok/kelompok");
;
;
;
class Kelas extends sequelize_1.Model {
}
exports.Kelas = Kelas;
;
Kelas.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nama_kelas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    id_guru: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'guru',
            key: 'id',
        },
    },
}, {
    tableName: 'kelas',
    timestamps: false,
    sequelize: database_1.sequalize,
});
Kelas.hasMany(kelompok_1.Kelompok, { foreignKey: 'id_kelas', as: 'kelompok_kelas' });
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Kelas table created!!!'))
    .catch((error) => console.log('Error creating table kelas: ', error));
