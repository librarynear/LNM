/*
  Warnings:

  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_libraryId_fkey";

-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "facilities" TEXT[],
ADD COLUMN     "review_status" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Facility";
