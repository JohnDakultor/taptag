import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(value: string | undefined) {
  if (!value) return null;
  return prisma.key.findUnique({
    where: { value },
  });
}
