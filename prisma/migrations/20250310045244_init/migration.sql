/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Seen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `uid` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `uid` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `following_user_id` on the `Follower` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followed_user_id` on the `Follower` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uid` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uid` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uid` on the `Seen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_uid_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followed_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_following_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_uid_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_uid_fkey";

-- DropForeignKey
ALTER TABLE "Seen" DROP CONSTRAINT "Seen_uid_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "uid",
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
DROP COLUMN "following_user_id",
ADD COLUMN     "following_user_id" INTEGER NOT NULL,
DROP COLUMN "followed_user_id",
ADD COLUMN     "followed_user_id" INTEGER NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("following_user_id", "followed_user_id");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "uid",
ADD COLUMN     "uid" INTEGER NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("uid", "pid");

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "uid",
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seen" DROP CONSTRAINT "Seen_pkey",
DROP COLUMN "uid",
ADD COLUMN     "uid" INTEGER NOT NULL,
ADD CONSTRAINT "Seen_pkey" PRIMARY KEY ("uid", "pid");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "uid",
ADD COLUMN     "uid" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_following_user_id_fkey" FOREIGN KEY ("following_user_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
