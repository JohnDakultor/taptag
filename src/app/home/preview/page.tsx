"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Preview() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const res = await fetch("/api/preview");
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    };

    const fetchLinks = async () => {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    };

    fetchLinks();
    fetchPortfolio();
  }, []);

  const getLinkHref = (label: string, value: string) => {
    const lower = label.toLowerCase();

    if (lower.includes("phone") || lower.includes("call")) {
      return `tel:${value}`;
    }
    if (lower.includes("email")) {
      return `mailto:${value}`;
    }
    if (lower.includes("sms") || lower.includes("message")) {
      return `sms:${value}`;
    }
    if (value.startsWith("http")) {
      return value;
    }
    return `https://${value}`;
  };

  if (!portfolio) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:px-10">
      <Card
        className="max-w-xl mx-auto shadow-md rounded-2xl"
        style={{
          backgroundColor: portfolio.backgroundColor || "#fff",
          color: portfolio.textColor || "#000",
          fontFamily: portfolio.font || "inherit",
        }}
      >
        <CardContent
          className="space-y-6 p-6 flex flex-col"
          style={{
            textAlign: portfolio.alignment,
            alignItems:
              portfolio.alignment === "left"
                ? "flex-start"
                : portfolio.alignment === "right"
                ? "flex-end"
                : "center",
          }}
        >
          {portfolio.avatar && (
            <img
              src={portfolio.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
              style={{
                margin:
                  portfolio.alignment === "left"
                    ? "0"
                    : portfolio.alignment === "right"
                    ? "0 0 0 auto"
                    : "0 auto",
              }}
            />
          )}

          <h1 className="text-2xl font-bold">{portfolio.name}</h1>
          <h2 className="text-lg">{portfolio.title}</h2>
          <p>{portfolio.bio}</p>

          {portfolio.showContact && links.length > 0 && (
            <div className="w-full">
              <h3 className="font-semibold mb-2">Contact</h3>
              <ul className="space-y-2 text-sm">
                {links
                  .filter((link) => link.type === "contact" || link.type === "social")
                  .map((link) => (
                    <li key={link.id}>
                      <a
                        href={getLinkHref(link.label, link.value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80 transition"
                      >
                        <strong>{link.label}:</strong> {link.value}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {portfolio.skills && (
            <div className="w-full">
              <h3 className="font-semibold">Skills</h3>
              <p>{portfolio.skills}</p>
            </div>
          )}
          {portfolio.experience && (
            <div className="w-full">
              <h3 className="font-semibold">Experience</h3>
              <p>{portfolio.experience}</p>
            </div>
          )}
          {portfolio.education && (
            <div className="w-full">
              <h3 className="font-semibold">Education</h3>
              <p>{portfolio.education}</p>
            </div>
          )}
          {portfolio.projects && (
            <div className="w-full">
              <h3 className="font-semibold">Projects</h3>
              <p>{portfolio.projects}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
