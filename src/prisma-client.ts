/*
    Centralized Prisma client
*/
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#prisma-client'
import { config } from './config.js';

const connectionString = `${config.databaseUrl}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter});

export {prisma};