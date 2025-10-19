/*
  Warnings:

  - The values [MOBILE,ZELLE,CREDIT] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `travelOption` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TravelOption" AS ENUM ('ONE_WAY', 'ROUND_TRIP');

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'PAGO_MOVIL', 'CREDITS');
ALTER TABLE "Ride" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "public"."PaymentMethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "travelOption" "TravelOption" NOT NULL;
