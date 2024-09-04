/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usename` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `user_to_contacts_fk`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `usename`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`username`);

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `user_to_contacts_fk` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
