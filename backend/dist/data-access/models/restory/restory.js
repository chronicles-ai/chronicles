"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
;
;
;
class Restory extends sequelize_1.Model {
}
exports.Restory = Restory;
;
Restory.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    id_story: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'story',
            key: 'id'
        },
    },
    id_kelompok: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'kelompok',
            key: 'id',
        },
    },
    judul: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orientation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    complication: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    resolution: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    reorientation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'restory',
    timestamps: false,
    sequelize: database_1.sequalize,
});
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Restory table created!!!'))
    .catch((error) => console.log('Error creating table restory: ', error));
