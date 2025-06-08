

// import { PrismaClient } from "@/generated/prisma";
// import { hash } from "bcryptjs";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { email, password, name, username } = body;

//   if (!email || !password || !name || !username) {
//     return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//   }

//   const existing = await prisma.user.findUnique({ where: { email } });
//   if (existing) {
//     return NextResponse.json({ message: "Email already exists" }, { status: 409 });
//   }

//   const hashed = await hash(password, 10);
//   const user = await prisma.user.create({
//     data: { email, password: hashed, name, username },
//   });

//   return NextResponse.json({ user }, { status: 201 });
// }
import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, username, key, role } = body;

  if (!email || !password || !name || !username || !key) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // Check if key exists
  // Check if key exists and is not yet activated
const existingKey = await prisma.key.findFirst({
  where: {
    value: key,
    activated: false,
  },
});

if (!existingKey) {
  return NextResponse.json({ message: "Invalid or already used activation key" }, { status: 403 });
}

const hashed = await hash(password, 10);

// Create user
const user = await prisma.user.create({
  data: {
    email,
    password: hashed,
    name,
    username,
    role: "USER",
  },
});

// Mark key as used
await prisma.key.update({
  where: { id: existingKey.id },
  data: {
    activated: true,
    usedBy: user.id,
  },
});

return NextResponse.json({ user }, { status: 201 });
}
