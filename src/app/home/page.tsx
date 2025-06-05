"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, GraduationCap, Globe, Link as LinkIcon } from "lucide-react";
import Loading from "@/components/ui/loading";

export default function Dashboard() {
  const { data: session } = useSession();
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const res = await fetch("/api/preview");
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    };

    if (session) {
      fetchPortfolio();
    }
  }, [session]);

  const username = portfolio?.username || session?.user?.username;
  const shareUrl = username
    ? `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/user/${username}`
    : "";

  if (!session) return <Loading message="fetching profile..." />;

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Card className="shadow-md rounded-2xl bg-neutral-800 text-white">
        <CardContent className="flex flex-col items-center space-y-4 py-6">
          {portfolio?.avatar && (
            <Avatar className="w-24 h-24">
              <AvatarImage src={portfolio.avatar} alt="Avatar" />
            </Avatar>
          )}

          <h1 className="text-2xl font-bold">
            {portfolio?.name || session.user?.name}
          </h1>
          <h2 className="text-lg text-yellow-400">{portfolio?.title}</h2>

          {shareUrl && (
            <div className="text-center">
              <p className="text-sm mb-2">Your public link:</p>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-yellow-400 hover:text-yellow-300 break-all flex items-center justify-center gap-2"
              >
                <Globe size={16} />
                {shareUrl}
              </a>
            </div>
          )}

          {portfolio?.experience && (
            <div className="w-full text-left">
              <h3 className="flex items-center gap-2 text-md font-semibold mb-1">
                <Briefcase size={16} />
                Experience
              </h3>
              <p className="text-sm text-gray-300">{portfolio.experience}</p>
            </div>
          )}

          {portfolio?.education && (
            <div className="w-full text-left">
              <h3 className="flex items-center gap-2 text-md font-semibold mb-1">
                <GraduationCap size={16} />
                Education
              </h3>
              <p className="text-sm text-gray-300">{portfolio.education}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
