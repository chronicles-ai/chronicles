"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nilai = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
;
;
class Nilai extends sequelize_1.Model {
}
exports.Nilai = Nilai;
Nilai.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nilai_kelompok: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    nilai_similaritas: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
    },
    komentar: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    id_kelompok: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'kelompok',
            key: 'id',
        },
    },
    id_guru: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'guru',
            key: 'id'
        },
    },
}, {
    tableName: 'nilai',
    timestamps: true,
    sequelize: database_1.sequalize,
});
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Nilai table created!!!'))
    .catch((error) => console.log('Error creating table nilai: ', error));
