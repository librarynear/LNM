/*
  Warnings:

  - Added the required column `contactNumber` to the `Librarian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Librarian" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "profilePhoto" TEXT;
