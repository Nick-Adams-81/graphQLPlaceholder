-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_personId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `Address` MODIFY `personId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
