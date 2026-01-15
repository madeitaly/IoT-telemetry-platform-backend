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
    redisUrl: process.env.REDIS_URL ?? (isProduction ? undefined : 'redis://localhost:6379'),
    jwtSecret: isProduction ? process.env.JWT_SECRET : 'dev_secret_only',
};
//# sourceMappingURL=config.js.map