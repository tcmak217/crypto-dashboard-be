/*
  Warnings:

  - Added the required column `change` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "change" DOUBLE PRECISION NOT NULL;
