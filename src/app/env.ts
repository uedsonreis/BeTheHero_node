import dotenv from 'dotenv';

declare var process: any;

// dotenv.config({
//     path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
// });

dotenv.config();

export default {
    // env: process.env.NODE_ENV,
    // local: process.env.NODE_ENV,
    portServer: process.env.PORT_SERVER,
    tokenSecret: process.env.TOKEN_SECRET,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_DATABASE,
        instance: process.env.DB_INSTANCE,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
    // , test: {
    //     storage: './__tests__/database.sqlite'
    // }
};