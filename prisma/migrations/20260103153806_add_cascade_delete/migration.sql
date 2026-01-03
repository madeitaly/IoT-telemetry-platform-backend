-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceRegistrationToken" DROP CONSTRAINT "DeviceRegistrationToken_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Telemetry" DROP CONSTRAINT "Telemetry_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceRegistrationToken" ADD CONSTRAINT "DeviceRegistrationToken_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
