import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const ENV = process.env.NODE_ENV || 'development';
export const config = {
    isProduction: ENV === 'production',
    isDevelopment: ENV === 'development',
    port: process.env.PORT || 3000,
    // Use local DB if URL isn't provided, or force logic based on ENV
    databaseUrl: process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    redisUser: process.env.REDIS_USER || 'default',
    redisPassword: process.env.REDIS_PASSWORD,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_only',
};
//# sourceMappingURL=config.js.map