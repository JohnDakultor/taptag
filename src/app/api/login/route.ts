// app/api/login/route.ts

import { PrismaClient } from "@/generated/prisma";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  // 🟡 You can later create a session, JWT, or set cookies here

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
