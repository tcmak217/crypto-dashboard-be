/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quote_symbol_key" ON "Quote"("symbol");
