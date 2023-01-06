/*
  Warnings:

  - Added the required column `name` to the `PersonToFriends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PersonToFriends` ADD COLUMN `name` VARCHAR(191) NOT NULL;
