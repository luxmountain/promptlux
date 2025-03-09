/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mid` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `uid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "edited_at" TIMESTAMP(3),
ADD COLUMN     "mid" INTEGER NOT NULL,
ADD COLUMN     "pid" SERIAL NOT NULL,
ADD COLUMN     "seen_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("pid");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "avatar_image" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

-- CreateTable
CREATE TABLE "Follower" (
    "following_user_id" TEXT NOT NULL,
    "followed_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("following_user_id","followed_user_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "uid" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("uid","pid")
);

-- CreateTable
CREATE TABLE "Seen" (
    "uid" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seen_pkey" PRIMARY KEY ("uid","pid")
);

-- CreateTable
CREATE TABLE "Comment" (
    "cid" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "comment_replied_to_id" INTEGER,
    "edited_at" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Post_tags" (
    "pid" INTEGER NOT NULL,
    "tid" INTEGER NOT NULL,

    CONSTRAINT "Post_tags_pkey" PRIMARY KEY ("pid","tid")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tid" SERIAL NOT NULL,
    "tag_content" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "Model_Category" (
    "mid" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,

    CONSTRAINT "Model_Category_pkey" PRIMARY KEY ("mid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_following_user_id_fkey" FOREIGN KEY ("following_user_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Post"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Post"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Post"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mid_fkey" FOREIGN KEY ("mid") REFERENCES "Model_Category"("mid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_tags" ADD CONSTRAINT "Post_tags_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Post"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_tags" ADD CONSTRAINT "Post_tags_tid_fkey" FOREIGN KEY ("tid") REFERENCES "Tags"("tid") ON DELETE RESTRICT ON UPDATE CASCADE;
