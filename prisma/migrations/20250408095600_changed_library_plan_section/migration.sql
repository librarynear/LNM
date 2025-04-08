/*
  Warnings:

  - You are about to drop the column `feePerHour` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `feePerMonth` on the `Library` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "feePerHour",
DROP COLUMN "feePerMonth";

-- CreateTable
CREATE TABLE "LibraryPlan" (
    "id" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "monthlyFee" TEXT NOT NULL,
    "planType" TEXT NOT NULL,
    "description" TEXT,
    "libraryId" TEXT NOT NULL,

    CONSTRAINT "LibraryPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LibraryPlan_libraryId_idx" ON "LibraryPlan"("libraryId");

-- AddForeignKey
ALTER TABLE "LibraryPlan" ADD CONSTRAINT "LibraryPlan_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
