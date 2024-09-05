import { Sequelize } from "sequelize";

export const sequalize = new Sequelize (
    'DATABASE_NAME', //env
    'USERNAME', //env
    'PASSWORD', //env
    {
        host: 'HOSTNAME', //env
        dialect: 'mysql', //env
        port: 'PORT', //env,
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
    },
);

sequalize.authenticate().then(() => {
    console.log('Successfully connect to Chronicles Database...');
}).catch((error: any) => {
    console.error('Error connecting to Database.', error);
})