import { PrismaClient } from "@prisma/client";

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
      { model_name: "AI Models" },
      { model_name: "Photography" },
      { model_name: "Art" },
      { model_name: "Technology" },
      { model_name: "Science" },
    ],
  });

  // ✅ Seed Users (5 người)
  const users = await prisma.$transaction([
    prisma.user.create({
      data: { first_name: "John", last_name: "Doe", username: "johndoe", email: "john@example.com", password: "123456", created_at: new Date() },
    }),
    prisma.user.create({
      data: { first_name: "Jane", last_name: "Smith", username: "janesmith", email: "jane@example.com", password: "123456", created_at: new Date() },
    }),
    prisma.user.create({
      data: { first_name: "Alice", last_name: "Johnson", username: "alicej", email: "alice@example.com", password: "123456", created_at: new Date() },
    }),
    prisma.user.create({
      data: { first_name: "Bob", last_name: "Brown", username: "bobb", email: "bob@example.com", password: "123456", created_at: new Date() },
    }),
    prisma.user.create({
      data: { first_name: "Charlie", last_name: "Davis", username: "charlied", email: "charlie@example.com", password: "123456", created_at: new Date() },
    }),
  ]);

  // ✅ Seed Posts (5 bài)
  const posts = await prisma.$transaction([
    prisma.post.create({ data: { uid: users[0].uid, description: "AI in 2025", prompt_used: "AI Future", created_at: new Date(), mid: 1, seen_count: 10 } }),
    prisma.post.create({ data: { uid: users[1].uid, description: "Beautiful Landscape", prompt_used: "Nature", created_at: new Date(), mid: 2, seen_count: 20 } }),
    prisma.post.create({ data: { uid: users[2].uid, description: "Modern Art", prompt_used: "Abstract", created_at: new Date(), mid: 3, seen_count: 30 } }),
    prisma.post.create({ data: { uid: users[3].uid, description: "New Tech Innovations", prompt_used: "Technology", created_at: new Date(), mid: 4, seen_count: 40 } }),
    prisma.post.create({ data: { uid: users[4].uid, description: "Scientific Breakthroughs", prompt_used: "Science", created_at: new Date(), mid: 5, seen_count: 50 } }),
  ]);

  // ✅ Seed Followers (5 quan hệ)
  await prisma.follower.createMany({
    data: [
      { following_user_id: users[0].uid, followed_user_id: users[1].uid, created_at: new Date() },
      { following_user_id: users[1].uid, followed_user_id: users[2].uid, created_at: new Date() },
      { following_user_id: users[2].uid, followed_user_id: users[3].uid, created_at: new Date() },
      { following_user_id: users[3].uid, followed_user_id: users[4].uid, created_at: new Date() },
      { following_user_id: users[4].uid, followed_user_id: users[0].uid, created_at: new Date() },
    ],
  });

  // ✅ Seed Likes (5 like)
  await prisma.like.createMany({
    data: [
      { uid: users[0].uid, pid: posts[1].pid, created_at: new Date() },
      { uid: users[1].uid, pid: posts[2].pid, created_at: new Date() },
      { uid: users[2].uid, pid: posts[3].pid, created_at: new Date() },
      { uid: users[3].uid, pid: posts[4].pid, created_at: new Date() },
      { uid: users[4].uid, pid: posts[0].pid, created_at: new Date() },
    ],
  });

  // ✅ Seed Seen (5 lượt xem)
  await prisma.seen.createMany({
    data: [
      { uid: users[0].uid, pid: posts[2].pid, created_at: new Date() },
      { uid: users[1].uid, pid: posts[3].pid, created_at: new Date() },
      { uid: users[2].uid, pid: posts[4].pid, created_at: new Date() },
      { uid: users[3].uid, pid: posts[0].pid, created_at: new Date() },
      { uid: users[4].uid, pid: posts[1].pid, created_at: new Date() },
    ],
  });

  // ✅ Seed Comments (5 bình luận)
  await prisma.comment.createMany({
    data: [
      { uid: users[0].uid, pid: posts[0].pid, comment: "Amazing AI insights!", created_at: new Date() },
      { uid: users[1].uid, pid: posts[1].pid, comment: "This is beautiful!", created_at: new Date() },
      { uid: users[2].uid, pid: posts[2].pid, comment: "Love this abstract style!", created_at: new Date() },
      { uid: users[3].uid, pid: posts[3].pid, comment: "Tech is evolving so fast!", created_at: new Date() },
      { uid: users[4].uid, pid: posts[4].pid, comment: "Science never stops amazing us!", created_at: new Date() },
    ],
  });

  // ✅ Seed Tags (5 tags)
  await prisma.tags.createMany({
    data: [
      { tag_content: "AI" },
      { tag_content: "Nature" },
      { tag_content: "Art" },
      { tag_content: "Technology" },
      { tag_content: "Science" },
    ],
  });

  // ✅ Seed Post_Tags (5 tags cho bài viết)
  await prisma.post_tags.createMany({
    data: [
      { pid: posts[0].pid, tid: 1 },
      { pid: posts[1].pid, tid: 2 },
      { pid: posts[2].pid, tid: 3 },
      { pid: posts[3].pid, tid: 4 },
      { pid: posts[4].pid, tid: 5 },
    ],
  });

  console.log("✅ Seeding completed with 5 items per table!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
