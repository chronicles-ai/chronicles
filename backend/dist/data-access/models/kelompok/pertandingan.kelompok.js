"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pertandingan = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
const kelompok_1 = require("./kelompok");
const kelas_1 = require("../kelas/kelas");
;
;
class Pertandingan extends sequelize_1.Model {
}
exports.Pertandingan = Pertandingan;
Pertandingan.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    kode_kelompok_ganjil: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: kelompok_1.Kelompok,
            key: 'id',
        }
    },
    kode_kelompok_genap: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: kelompok_1.Kelompok,
            key: 'id',
        }
    },
    id_kelas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: kelas_1.Kelas,
            key: 'id',
        },
    },
}, {
    tableName: 'pertandingan',
    timestamps: true,
    sequelize: database_1.sequalize,
});
Pertandingan.belongsTo(kelompok_1.Kelompok, { foreignKey: 'kode_kelompok_ganjil', as: 'kelompokGanjil' });
Pertandingan.belongsTo(kelompok_1.Kelompok, { foreignKey: 'kode_kelompok_genap', as: 'kelompokGenap' });
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Pertandingan table created!!'))
    .catch((error) => console.log('Error creating table pertandingan: ', error));
