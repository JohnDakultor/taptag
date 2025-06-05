import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { portfolio: true },
  });

  if (!user?.portfolio) {
    return NextResponse.json({ error: "No portfolio found" }, { status: 404 });
  }

  return NextResponse.json({...user.portfolio, username: user.username});
}