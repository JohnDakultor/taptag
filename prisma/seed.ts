import { PrismaClient } from '../src/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: await hash('supersecurepassword', 10),
        name: 'Admin',
        username: 'admin',
        role: 'ADMIN',
      },
    });

    console.log(`✅ Admin user created with email: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin user already exists.`);
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
