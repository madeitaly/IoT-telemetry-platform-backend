/*
  Warnings:

  - You are about to drop the `DeviceRegistrationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Telemetry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeviceRegistrationToken" DROP CONSTRAINT "DeviceRegistrationToken_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Telemetry" DROP CONSTRAINT "Telemetry_deviceId_fkey";

-- DropTable
DROP TABLE "DeviceRegistrationToken";

-- DropTable
DROP TABLE "Telemetry";
