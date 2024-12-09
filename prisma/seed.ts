// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create test users
  const password = await bcrypt.hash('Password123!', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password,
    },
  });

  // Create bookmarks for user1
  const bookmarks = [
    {
      title: 'NestJS Documentation',
      url: 'https://docs.nestjs.com',
      description: 'Official NestJS framework documentation',
      userId: user1.id,
    },
    {
      title: 'GitHub',
      url: 'https://github.com',
      description: 'Where the world builds software',
      userId: user1.id,
    },
    {
      title: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/',
      description: 'Learn TypeScript programming',
      userId: user1.id,
    },
    // Add more bookmarks as needed
  ];

  for (const bookmark of bookmarks) {
    await prisma.bookmark.create({
      data: bookmark,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
