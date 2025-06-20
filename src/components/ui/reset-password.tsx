
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  token: string;
}

export default function ResetPasswordClient({ token }: Props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "validating" | "invalid" | "submitting" | "success" | "error">("validating");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/validate-token?token=${token}`);
        const data = await res.json();
        if (data.valid) {
          setStatus("idle");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");

      if (data.success) {
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "validating") {
    return <div className="text-white p-6 text-center">Validating token...</div>;
  }

  if (status === "invalid") {
    return <div className="text-red-400 p-6 text-center">Invalid or expired reset link.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-800 flex items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full bg-neutral-900 rounded-3xl shadow-lg p-10">
        <h1 className="text-3xl font-extrabold mb-6 text-yellow-500 text-center">
          Set a New Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-neutral-300">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-neutral-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-white text-lg py-3 rounded-full shadow-xl transition duration-300"
          >
            {status === "submitting" ? "Resetting..." : "Reset Password"}
          </Button>

          {status === "success" && (
            <p className="text-green-400 text-center">Password updated! Redirecting to login...</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    </main>
  );
}
