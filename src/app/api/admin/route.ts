import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const keys: string[] = body.keys;

    const createdKeys = await prisma.key.createMany({
      data: keys.map((value) => ({ value })),
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, created: createdKeys });
  } catch (error) {
    console.error("Error saving keys:", error);
    return NextResponse.json({ error: "Failed to save keys" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const keys = await prisma.key.findMany({
      select: {
        value: true,
        activated: true,
      },
    });
    return NextResponse.json(keys);
  } catch (error) {
    console.error("Error fetching keys:", error);
    return NextResponse.json({ error: "Failed to fetch keys" }, { status: 500 });
  }
}
