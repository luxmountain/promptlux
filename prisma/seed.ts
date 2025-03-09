import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️ Clearing old data...");
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follower.deleteMany();
  await prisma.seen.deleteMany();
  await prisma.post_tags.deleteMany();
  await prisma.tags.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.model_Category.deleteMany();

  console.log("🌱 Seeding database...");

  // ✅ Seed Categories
  await prisma.model_Category.createMany({
    data: [
      { mid: 1, model_name: "Category A" },
      { mid: 2, model_name: "Category B" },
    ],
  });

  // ✅ Seed Users (Fix: uuid for uid)
  const user1Id = uuidv4();
  const user2Id = uuidv4();

  await prisma.user.createMany({
    data: [
      { uid: user1Id, first_name: "John", last_name: "Doe", username: "johndoe", email: "john@example.com", password: "123456", created_at: new Date() },
      { uid: user2Id, first_name: "Jane", last_name: "Smith", username: "janesmith", email: "jane@example.com", password: "123456", created_at: new Date() },
    ],
  });

  // ✅ Seed Posts (Fix: pid is Int, uid uses uuid)
  await prisma.post.createMany({
    data: [
      { pid: 1, uid: user1Id, description: "Post 1", prompt_used: "Prompt 1", created_at: new Date(), mid: 1, seen_count: 10 },
      { pid: 2, uid: user2Id, description: "Post 2", prompt_used: "Prompt 2", created_at: new Date(), mid: 2, seen_count: 20 },
    ],
  });

  // ✅ Seed Followers
  await prisma.follower.createMany({
    data: [
      { following_user_id: user1Id, followed_user_id: user2Id, created_at: new Date() },
      { following_user_id: user2Id, followed_user_id: user1Id, created_at: new Date() },
    ],
  });

  // ✅ Seed Likes
  await prisma.like.createMany({
    data: [
      { uid: user1Id, pid: 1, created_at: new Date() },
      { uid: user2Id, pid: 2, created_at: new Date() },
    ],
  });

  // ✅ Seed Seen
  await prisma.seen.createMany({
    data: [
      { uid: user1Id, pid: 2, created_at: new Date() },
      { uid: user2Id, pid: 1, created_at: new Date() },
    ],
  });

  // ✅ Seed Comments (Fix: cid is Int, uid uses uuid)
  await prisma.comment.createMany({
    data: [
      { cid: 1, uid: user1Id, pid: 1, comment: "Great post!", created_at: new Date() },
      { cid: 2, uid: user2Id, pid: 2, comment: "Nice!", created_at: new Date() },
    ],
  });

  // ✅ Seed Tags
  await prisma.tags.createMany({
    data: [
      { tid: 1, tag_content: "Technology" },
      { tid: 2, tag_content: "Science" },
    ],
  });

  // ✅ Seed Post_Tags
  await prisma.post_tags.createMany({
    data: [
      { pid: 1, tid: 1 },
      { pid: 2, tid: 2 },
    ],
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
