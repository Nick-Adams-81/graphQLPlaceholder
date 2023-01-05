/*
  Warnings:

  - You are about to drop the `_FriendsToPerson` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_FriendsToPerson` DROP FOREIGN KEY `_FriendsToPerson_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FriendsToPerson` DROP FOREIGN KEY `_FriendsToPerson_B_fkey`;

-- DropTable
DROP TABLE `_FriendsToPerson`;

-- CreateTable
CREATE TABLE `PersonToFriends` (
    `id` INTEGER NOT NULL,
    `personId` INTEGER NOT NULL,
    `friendsId` INTEGER NOT NULL,

    PRIMARY KEY (`personId`, `friendsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Address_id_key` ON `Address`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Person_id_key` ON `Person`(`id`);

-- AddForeignKey
ALTER TABLE `PersonToFriends` ADD CONSTRAINT `PersonToFriends_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonToFriends` ADD CONSTRAINT `PersonToFriends_friendsId_fkey` FOREIGN KEY (`friendsId`) REFERENCES `Friends`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
