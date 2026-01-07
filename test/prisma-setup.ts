import { config } from '../src/config.js';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = `${config.databaseUrl}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({adapter});

// Function to clean DB
export const clearDatabase = async () => {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
};

afterAll(async () => {
  await prisma.$disconnect();
});