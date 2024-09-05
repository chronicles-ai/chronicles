"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequalize = void 0;
const sequelize_1 = require("sequelize");
exports.sequalize = new sequelize_1.Sequelize('chronicles', //env
'avnadmin', //env
'AVNS_DnhVSwZtBL05nYGliqY', //env
{
    host: 'chronicles-student-dbf6.g.aivencloud.com', //env
    dialect: 'mysql', //env
    port: 22155, //env,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000,
    },
    retry: {
        max: 10,
        timeout: 5000,
    },
});
exports.sequalize.authenticate().then(() => {
    console.log('Successfully connect to Chronicles Database...');
}).catch((error) => {
    console.error('Error connecting to Database.', error);
});
