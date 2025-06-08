// /app/api/user/route.ts
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth-option';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  // Optional: Add auth check if needed
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
