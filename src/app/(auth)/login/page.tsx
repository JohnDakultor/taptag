"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false, 
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push("/home"); // Redirect after successful login
    } else {
      setError(res?.error || "Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full bg-neutral-900 rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-400 text-center">
          Login to TapTag
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-neutral-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Your password"
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {error && <p className="text-red-500 font-medium text-sm">{error}</p>}

          <div className="flex justify-between items-center">
            <a
              href="/forgot-password"
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-3 rounded-full shadow-xl transition duration-300"
          >
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-neutral-400">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
