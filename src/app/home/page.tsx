"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, GraduationCap, Globe } from "lucide-react";
import Loading from "@/components/ui/loading";

export default function Dashboard() {
  const { data: session } = useSession();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      const [previewRes, keyRes] = await Promise.all([
        fetch("/api/preview"),
        fetch("/api/me"),
      ]);

      if (previewRes.ok) {
        const previewData = await previewRes.json();
        setPortfolio(previewData);
      }

      if (keyRes.ok) {
        const keyData = await keyRes.json();
        setKey(keyData.key);
      }
    };

    fetchData();
  }, [session]);

  const shareUrl = key
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/public-portfolio/${key}`
    : "";

  if (!session) return <Loading message="Loading your dashboard..." />;

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-800 overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500 bg-[length:300%_300%]" />

      <Card className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl text-white animate-fade-in transition-all duration-700">
        <CardContent className="p-8 sm:p-12 flex flex-col items-center gap-8">
          {/* Avatar + Name + Title */}
          <div className="flex flex-col items-center text-center gap-3">
            {portfolio?.avatar && (
              <Avatar className="w-28 h-28 ring-4 ring-yellow-400/30 shadow-lg">
                <AvatarImage src={portfolio.avatar} alt="Avatar" />
              </Avatar>
            )}
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm">
              {portfolio?.name || session.user?.name}
            </h1>
            {portfolio?.title && (
              <p className="text-lg sm:text-xl text-yellow-300 font-medium drop-shadow-sm">
                {portfolio.title}
              </p>
            )}
          </div>

          {/* Share Link */}
          {shareUrl && (
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base font-medium rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-100 transition-all"
            >
              <Globe size={18} />
              <span>View Public Profile</span>
            </a>
          )}

          {/* Experience + Education Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {portfolio?.experience && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Briefcase size={18} /> Experience
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {portfolio.experience}
                </p>
              </div>
            )}
            {portfolio?.education && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-white">
                  <GraduationCap size={18} /> Education
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {portfolio.education}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
