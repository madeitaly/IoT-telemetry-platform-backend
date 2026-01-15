import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env.NODE_ENV ?? 'development';
export const config = ENV === 'production'
    ? {
        isProduction: true,
        isDevelopment: false,
        port: process.env.PORT,
        databaseUrl: process.env.DATABASE_URL,
        redisUrl: process.env.REDIS_URL,
        //redisUser: process.env.REDIS_USER,
        //redisPassword: process.env.REDIS_PASSWORD,
        //redisHost: process.env.REDIS_HOST,
        //redisPort: process.env.REDIS_PORT
        //  ? Number(process.env.REDIS_PORT)
        //  : undefined,
        jwtSecret: process.env.JWT_SECRET,
    }
    : {
        isProduction: false,
        isDevelopment: true,
        port: process.env.PORT,
        databaseUrl: process.env.DATABASE_URL_LOCAL,
        redisUrl: 'redis://localhost:6379',
        jwtSecret: 'dev_secret_only',
    };
//# sourceMappingURL=config.js.map