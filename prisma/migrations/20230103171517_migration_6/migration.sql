/*
  Warnings:

  - You are about to drop the column `friendsId` on the `Person` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_friendsId_fkey`;

-- AlterTable
ALTER TABLE `Person` DROP COLUMN `friendsId`;

-- CreateTable
CREATE TABLE `_FriendsToPerson` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FriendsToPerson_AB_unique`(`A`, `B`),
    INDEX `_FriendsToPerson_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FriendsToPerson` ADD CONSTRAINT `_FriendsToPerson_A_fkey` FOREIGN KEY (`A`) REFERENCES `Friends`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FriendsToPerson` ADD CONSTRAINT `_FriendsToPerson_B_fkey` FOREIGN KEY (`B`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
