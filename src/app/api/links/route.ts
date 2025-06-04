import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // adjust to your auth setup
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const links = await prisma.link.findMany({
    where: { user: { email: session.user?.email || '' } },
  });

  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();

  // Optional: Clear old links before saving new
  await prisma.link.deleteMany({
    where: { user: { email: session.user?.email || '' } },
  });

  // Save new links
  await prisma.user.update({
    where: { email: session.user?.email || '' },
    data: {
      links: {
        create: data,
      },
    },
  });

  return NextResponse.json({ success: true });
}
