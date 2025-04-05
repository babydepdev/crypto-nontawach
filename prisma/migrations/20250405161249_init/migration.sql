/*
  Warnings:

  - A unique constraint covering the columns `[user_id,type]` on the table `WalletsAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WalletsAccount_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "WalletsAccount_user_id_type_key" ON "WalletsAccount"("user_id", "type");
