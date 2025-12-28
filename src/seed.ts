import { config } from '../src/config.js';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter});

async function main() {
  // 1. THE SAFETY CHECK
  const isRemote = config.databaseUrl?.includes('neon.tech') || 
                   config.databaseUrl?.includes('supabase') ||
                   config.isProduction;

  if (isRemote) {
    console.error("\n🛑 SAFETY WARNING: YOU ARE ATTEMPTING TO SEED A REMOTE/PRODUCTION DATABASE.");
    console.error("This will delete all existing data. If you are sure, comment out this check.\n");
    process.exit(1); // Stop the script immediately
  }
  
  console.log('--- Start Seeding ---');

  // 1. Clear existing data (Be careful with this in production!)
  await prisma.telemetry.deleteMany();
  await prisma.deviceRegistrationToken.deleteMany();
  await prisma.device.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);
  const userIds: number[] = [];

  // 2. Create 10 Users
  console.log('Creating 10 users...');
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        password: passwordHash,
      },
    });
    userIds.push(user.id);
  }

  // 3. Create 100 Devices (randomly assigned to users)
  console.log('Creating 100 devices and tokens...');
  const deviceIds: number[] = [];
  for (let i = 1; i <= 100; i++) {
    const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
    const device = await prisma.device.create({
      data: {
        serial: `SN-${crypto.randomInt(100000, 999999)}-${i}`,
        name: `IoT-Device-${i}`,
        location: ['Milan', 'Rome', 'New York', 'London', 'Tokyo'][Math.floor(Math.random() * 5)],
        ownerId: randomUser,
        tokens: {
          create: {
            token: crypto.randomBytes(32).toString('hex'),
            expiresAt: new Date('9999-12-31'),
          },
        },
      },
    });
    deviceIds.push(device.id);
  }

  // 4. Create 1000 Telemetry points (10 per device, 1h apart)
  console.log('Creating 1000 telemetry entries...');
  const telemetryData = [];

  for (const deviceId of deviceIds) {
    // Each device starts sending data at a random point in the last 7 days
    const startOffsetDays = Math.random() * 7;
    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - (startOffsetDays * 24));

    for (let j = 0; j < 10; j++) {
      telemetryData.push({
        deviceId,
        ts: new Date(currentTime),
        temperature: parseFloat((20 + Math.random() * 10).toFixed(2)),
        humidity: parseFloat((40 + Math.random() * 20).toFixed(2)),
        battery: parseFloat((80 - (j * 2)).toFixed(2)),
        payload: { firmware: "1.0.4", status: "ok" }
      });

      // Increment time by 1 hour for the next data point
      currentTime.setHours(currentTime.getHours() + 1);
    }
  }

  // Use createMany for high-performance insertion of telemetry
  await prisma.telemetry.createMany({
    data: telemetryData,
  });

  console.log('--- Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
