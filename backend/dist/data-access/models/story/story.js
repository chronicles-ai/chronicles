"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../common/config/database");
const restory_1 = require("../restory/restory");
;
;
;
class Story extends sequelize_1.Model {
}
exports.Story = Story;
;
Story.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
    url_gambar: {
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
}, {
    tableName: 'story',
    timestamps: true,
    sequelize: database_1.sequalize,
});
Story.hasOne(restory_1.Restory, { foreignKey: 'id_story', as: 'real_story' });
database_1.sequalize.sync({ force: false })
    .then(() => console.log('Story table created!!!'))
    .catch((error) => console.log('Error creating table story: ', error));
