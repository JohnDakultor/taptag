import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const resetRecord = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetRecord || new Date(resetRecord.expiresAt) < new Date()) {
    return NextResponse.json({ success: false, message: "Invalid or expired token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: resetRecord.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ success: true });
}
