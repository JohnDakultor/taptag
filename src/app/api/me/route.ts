// src/app/api/me/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option"; // adjust path to your NextAuth config
import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ username: user.username });
}
