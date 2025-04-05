/*
  Warnings:

  - A unique constraint covering the columns `[walletAccount_id,currency_id]` on the table `WalletsAsset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WalletsAsset_walletAccount_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "WalletsAsset_walletAccount_id_currency_id_key" ON "WalletsAsset"("walletAccount_id", "currency_id");
