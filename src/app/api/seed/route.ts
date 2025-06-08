import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existing) {
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: await hash(adminPassword, 10),
          name: 'Admin',
          username: 'admin',
          role: 'ADMIN',
        },
      });

      return NextResponse.json({ message: `✅ Admin user created with email: ${adminEmail}` });
    } else {
      return NextResponse.json({ message: 'ℹ️ Admin user already exists.' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// If you want to reject GET requests explicitly:
export function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
