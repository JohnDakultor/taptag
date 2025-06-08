
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ClientLayout from "../client-layout";
import Navigation from "./navigation"; // ✅ NEW Client Component

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "TapTag",
  description: "Instant digital portfolio sharing",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-800 text-white flex flex-col min-h-screen`}
      >
        <ClientLayout>
          <Navigation />
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 pb-20 sm:pb-0">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}
