// app/reset-password/[token]/page.tsx
import { Metadata } from "next";
import ResetPasswordClient from "@/components/ui/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return <ResetPasswordClient token={params.token} />;
}
