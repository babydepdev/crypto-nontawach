/*
  Warnings:

  - Added the required column `wallet_account_id` to the `WithDrawals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WithDrawals" ADD COLUMN     "wallet_account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WithDrawals" ADD CONSTRAINT "WithDrawals_wallet_account_id_fkey" FOREIGN KEY ("wallet_account_id") REFERENCES "WalletsAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
