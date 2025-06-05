"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";

export default function Share() {
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const publicUrl = username ? `${baseUrl}/user/${username}` : "";

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUsername(data.username);
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!username) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <Card className="bg-neutral-800 text-white border rounded-2xl shadow">
        <CardHeader>
          <h2 className="text-xl font-semibold text-yellow-400">Share Your Portfolio</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-link" className="text-yellow-400">Your Public Link</Label>
            <div className="flex items-center space-x-2">
              <Input id="share-link" value={publicUrl} readOnly />
              <Button onClick={handleCopy} className="bg-yellow-500 hover:bg-yellow-400">
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2 flex flex-col items-center justify-center text-center">
  <Label className="text-yellow-400">Or Scan QR Code</Label>
  <QRCodeSVG value={publicUrl} size={160} bgColor="#fff" />
</div>

        </CardContent>
      </Card>
    </div>
  );
}
