import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth-option'; // adjust to your auth setup
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const saved = await prisma.portfolio.upsert({
    where: { userId: user.id },
    update: { ...body },
    create: {
      ...body,
      userId: user.id,
    },
  });

  return NextResponse.json(saved);
}
