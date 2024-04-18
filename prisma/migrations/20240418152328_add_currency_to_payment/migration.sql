/*
  Warnings:

  - Added the required column `confirm` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "confirm" BOOLEAN NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;
