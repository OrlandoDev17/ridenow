/*
  Warnings:

  - You are about to drop the column `type` on the `Ride` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "type";

-- DropEnum
DROP TYPE "public"."RideType";
