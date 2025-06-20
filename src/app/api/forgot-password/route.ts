// src/app/api/forgot-password/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // avoid exposing valid emails
    return NextResponse.json({ success: true });
  }

  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: expires,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

  // Configure transport (example with Gmail SMTP)
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  try {
    await transporter.sendMail({
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });
    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }

  return NextResponse.json({ success: true });
}
