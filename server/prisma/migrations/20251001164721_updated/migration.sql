/*
  Warnings:

  - You are about to drop the column `authorId` on the `Blogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Blogs" DROP CONSTRAINT "Blogs_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Blogs" DROP COLUMN "authorId";
