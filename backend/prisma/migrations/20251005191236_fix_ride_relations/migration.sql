/*
  Warnings:

  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_driverCedula_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ride" DROP CONSTRAINT "Ride_driverCedula_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "licenseUrl" TEXT,
ADD COLUMN     "vehicleBrand" TEXT,
ADD COLUMN     "vehicleModel" TEXT,
ADD COLUMN     "vehiclePhotoUrl" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Driver";

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverCedula_fkey" FOREIGN KEY ("driverCedula") REFERENCES "User"("cedula") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_driverCedula_fkey" FOREIGN KEY ("driverCedula") REFERENCES "User"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;
