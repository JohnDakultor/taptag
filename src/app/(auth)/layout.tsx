import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapTag",
  description: "Instant digital portfolio sharing",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-800 text-white flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className="w-full bg-neutral-900 border-b border-neutral-700">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
              href="/"
              className="flex items-center space-x-2 text-yellow-500 text-2xl font-bold"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
                alt="TapTag logo"
                className="w-8 h-8"
              />
              <span>TapTag</span>
            </Link>

            <div className="space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md border border-yellow-600 hover:bg-yellow-600 transition"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-neutral-900 border-t border-neutral-700">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 text-neutral-400 text-sm">
            <p>© {new Date().getFullYear()} TapTag. All rights reserved.</p>
            <div className="mt-2 md:mt-0 space-x-4">
              <Link href="/" className="hover:text-yellow-500">
                Home
              </Link>
              <Link href="/login" className="hover:text-yellow-500">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-500">
                Sign Up
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
