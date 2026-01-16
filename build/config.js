import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env.NODE_ENV ?? 'development';
const isProduction = ENV === 'production';
export const config = {
    isProduction,
    isDevelopment: !isProduction,
    port: process.env.PORT,
    databaseUrl: isProduction
        ? process.env.DATABASE_URL
        : process.env.DATABASE_URL_LOCAL,
    redisUrl: isProduction
        ? process.env.REDIS_URL
        : process.env.REDIS_URL_LOCAL,
    jwtSecret: isProduction ? process.env.JWT_SECRET : 'dev_secret_only',
};
//# sourceMappingURL=config.js.map