/*
  Warnings:

  - Added the required column `feePerHour` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feePerMonth` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "feePerHour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "feePerMonth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "whatsappNumber" TEXT;
