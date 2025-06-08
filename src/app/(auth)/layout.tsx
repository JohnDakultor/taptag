import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "../globals.css";
// import Logo from "../../../public/images/taptag.jpg"
import Image from "next/image";

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
              {/* Logo icon */}
              <Image
                src="/images/taptag.jpg"
                alt="TapTag logo"
                className="w-20 h-10"
              />
              {/* <span>TapTag</span> */}
              
            </Link>

            
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
