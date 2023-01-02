/*
  Warnings:

  - You are about to drop the column `first_name` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Person` table. All the data in the column will be lost.
  - Added the required column `name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Person` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Friends` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonFriend` (
    `personId` INTEGER NOT NULL,
    `friendsId` INTEGER NOT NULL,

    PRIMARY KEY (`personId`, `friendsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonFriend` ADD CONSTRAINT `PersonFriend_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonFriend` ADD CONSTRAINT `PersonFriend_friendsId_fkey` FOREIGN KEY (`friendsId`) REFERENCES `Friends`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
