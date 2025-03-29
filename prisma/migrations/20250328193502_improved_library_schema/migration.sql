/*
  Warnings:

  - You are about to drop the column `closesAt` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `opensAt` on the `Library` table. All the data in the column will be lost.
  - Added the required column `city` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closingTime` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `libraryName` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "closesAt",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "opensAt",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "closingTime" TEXT NOT NULL,
ADD COLUMN     "googleMapLink" TEXT,
ADD COLUMN     "libraryName" TEXT NOT NULL,
ADD COLUMN     "openingTime" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "facilityName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "libraryId" TEXT NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
