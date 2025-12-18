-- CreateTable
CREATE TABLE "Telemetry" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB NOT NULL,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "battery" DOUBLE PRECISION,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceRegistrationToken" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceRegistrationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Telemetry_deviceId_ts_idx" ON "Telemetry"("deviceId", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceRegistrationToken_token_key" ON "DeviceRegistrationToken"("token");

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceRegistrationToken" ADD CONSTRAINT "DeviceRegistrationToken_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
