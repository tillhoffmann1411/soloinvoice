/*
  Warnings:

  - Added the required column `tax` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
