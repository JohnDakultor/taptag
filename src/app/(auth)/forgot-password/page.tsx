"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full bg-neutral-900 rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-400 text-center">
          Reset Your Password
        </h1>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-neutral-300">
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-3 rounded-full shadow-xl transition duration-300"
          >
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-neutral-400">
          Remembered your password?{" "}
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
