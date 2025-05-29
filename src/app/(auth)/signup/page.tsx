"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login"); // ✅ redirect on success
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full bg-neutral-900 rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-400 text-center">
          Create Your Account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-neutral-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              required
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
              required
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              required
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-red-500 font-medium text-sm">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-3 rounded-full shadow-xl transition duration-300"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-neutral-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
