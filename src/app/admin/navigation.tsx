"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden sm:block w-full bg-neutral-900 border-b border-neutral-700">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 sm:px-6">
          {/* Left side: logo or links (optional) */}
          <div className="text-yellow-500 font-bold text-lg">Administrator</div>

          {/* Right side: logout */}
          <div className="flex items-center space-x-6 text-sm">
            <button
              onClick={() => signOut()}
              className="flex flex-col items-center text-neutral-400 hover:text-white transition"
            >
              <LogOut size={22} />
              <span className="mt-0.5 text-[10px]">Logout</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 sm:hidden flex justify-around px-2 py-2">
        <button
          onClick={() => signOut()}
          className="flex flex-col items-center justify-center text-neutral-400 hover:text-white transition"
        >
          <LogOut size={22} />
          <span className="mt-0.5 text-[10px]">Logout</span>
        </button>
      </nav>
    </>
  );
}
