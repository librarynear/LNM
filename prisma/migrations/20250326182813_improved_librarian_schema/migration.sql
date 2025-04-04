/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Librarian` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Librarian` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Librarian` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `Librarian` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Librarian" DROP COLUMN "dateOfBirth",
DROP COLUMN "gender",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL;
