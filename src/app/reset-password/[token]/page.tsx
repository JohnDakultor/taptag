// app/reset-password/[token]/page.tsx
import { Metadata } from "next";
import ResetPasswordClient from "@/components/ui/reset-password";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return <ResetPasswordClient token={params.token} />;
}
