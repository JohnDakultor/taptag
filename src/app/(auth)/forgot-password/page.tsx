"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full bg-neutral-900 rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-yellow-500 text-center">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-neutral-300">
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-700 text-white text-lg py-3 rounded-full shadow-xl transition duration-300"
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </Button>

          {status === "success" && (
            <p className="text-green-400 text-center">Check your email for the reset link.</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center">Something went wrong. Try again.</p>
          )}
        </form>

        <p className="mt-6 text-center text-neutral-400">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-yellow-500 hover:text-yellow-700 font-semibold underline"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
