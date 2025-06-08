
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Home, Link2, Palette, Share2, Eye, LogOut } from "lucide-react";
// import Logo from "../../../public/images/taptag.jpg"
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();

  const tabs = [
    { href: "/home", icon: <Home size={22} />, label: "Home" },
    { href: "/home/link", icon: <Link2 size={22} />, label: "Link" },
    { href: "/home/design", icon: <Palette size={22} />, label: "Design" },
    { href: "/home/share", icon: <Share2 size={22} />, label: "Share" },
    { href: "/home/preview", icon: <Eye size={22} />, label: "Preview" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden sm:block w-full bg-neutral-900 border-b border-neutral-700">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 sm:px-6">
          <Link
            href="/home"
            className="flex items-center space-x-2 text-yellow-500 text-xl sm:text-2xl font-bold"
          >
            {/* Logo icon */}
            <Image
              src="/images/taptag.jpg"
              alt="TapTag logo"
              className="w-20 h-10"
            />
            {/* <span>TapTag</span> */}
          </Link>

          <div className="flex items-center space-x-6 text-sm">
            {tabs.map((tab) => (
              <NavIcon
                key={tab.href}
                href={tab.href}
                icon={tab.icon}
                label={tab.label}
                active={pathname === tab.href}
              />
            ))}
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
        {tabs.map((tab) => (
          <NavIcon
            key={tab.href}
            href={tab.href}
            icon={tab.icon}
            label={tab.label}
            active={pathname === tab.href}
          />
        ))}
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

function NavIcon({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center transition text-xs ${
        active ? "text-white" : "text-neutral-400 hover:text-white"
      }`}
    >
      {icon}
      <span className="mt-0.5 text-[10px]">{label}</span>
    </Link>
  );
}
