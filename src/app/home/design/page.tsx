"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FONT_OPTIONS = [
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Poppins", value: "Poppins, sans-serif" },
];

const ALIGNMENT_OPTIONS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export default function PortfolioDesigner() {
  const [links, setLinks] = useState([]);
  const [portfolio, setPortfolio] = useState({
    name: "",
    title: "",
    bio: "",
    showContact: false,
    showSkills: true,
    avatar: "",
    backgroundColor: "#f7f7f7",
    textColor: "#333333",
    font: "sans-serif",
    alignment: "left",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data);
    };

    fetchLinks();
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setPortfolio((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange("avatar", event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-500">
        Design Your Portfolio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: Form */}
        <div className="space-y-6">
          {/* Style Settings */}
          <Card className="bg-background border rounded-2xl shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary">Style</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <Input
                  id="background-color"
                  type="color"
                  value={portfolio.backgroundColor}
                  onChange={(e) =>
                    handleChange("backgroundColor", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <Input
                  id="text-color"
                  type="color"
                  value={portfolio.textColor}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <select
                  id="font"
                  value={portfolio.font}
                  onChange={(e) => handleChange("font", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alignment">Text Alignment</Label>
                <select
                  id="alignment"
                  value={portfolio.alignment}
                  onChange={(e) => handleChange("alignment", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground"
                >
                  {ALIGNMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="bg-background border rounded-2xl shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary">
                Personal Info
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputGroup
                label="Name"
                id="name"
                value={portfolio.name}
                onChange={(e: any) => handleChange("name", e.target.value)}
              />
              <InputGroup
                label="Title"
                id="title"
                value={portfolio.title}
                onChange={(e: any) => handleChange("title", e.target.value)}
              />
              <TextareaGroup
                label="Bio"
                id="bio"
                value={portfolio.bio}
                onChange={(e: any) => handleChange("bio", e.target.value)}
              />
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-background border rounded-2xl shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary">
                Contact Info
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="show-contact"
                  checked={portfolio.showContact}
                  onCheckedChange={(val) => handleChange("showContact", val)}
                />
                <Label htmlFor="show-contact">Show Contact Info</Label>
              </div>
              {portfolio.showContact && links.length > 0 && (
                <Section title="Contact">
                  <ul className="space-y-1">
                    {links.map((link: any, i: number) => (
                      <li key={i}>
                        <strong>{link.type}:</strong>{" "}
                        <a
                          className="underline"
                          href={
                            link.value.startsWith("http")
                              ? link.value
                              : `mailto:${link.value}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label || link.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </CardContent>
          </Card>

          {/* Skills and Experience */}
          <Card className="bg-background border rounded-2xl shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-primary">
                Skills & Experience
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="show-skills"
                  checked={portfolio.showSkills}
                  onCheckedChange={(val) => handleChange("showSkills", val)}
                />
                <Label htmlFor="show-skills">Show Skills</Label>
              </div>
              {portfolio.showSkills && (
                <InputGroup
                  label="Skills (comma separated)"
                  id="skills"
                  value={portfolio.skills}
                  onChange={(e: any) => handleChange("skills", e.target.value)}
                />
              )}
              <TextareaGroup
                label="Experience"
                id="experience"
                value={portfolio.experience}
                onChange={(e: any) =>
                  handleChange("experience", e.target.value)
                }
              />
              <TextareaGroup
                label="Education"
                id="education"
                value={portfolio.education}
                onChange={(e: any) => handleChange("education", e.target.value)}
              />
              <TextareaGroup
                label="Projects"
                id="projects"
                value={portfolio.projects}
                onChange={(e: any) => handleChange("projects", e.target.value)}
              />
            </CardContent>
          </Card>

          <Button
  className="w-full text-lg rounded-xl bg-yellow-500 hover:bg-yellow-400"
  size="lg"
  onClick={async () => {
    const res = await fetch("/api/design", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
    });

    if (res.ok) {
      alert("Portfolio saved!");
    } else {
      alert("Failed to save portfolio.");
    }
  }}
>
  Save Portfolio
</Button>

        </div>

        {/* RIGHT: Preview */}
        <div
          className="rounded-2xl p-6 border shadow-inner max-h-[calc(100vh-6rem)] overflow-y-auto"
          style={{
            backgroundColor: portfolio.backgroundColor,
            color: portfolio.textColor,
            fontFamily: portfolio.font,
          }}
        >
          <div
            className={`space-y-6 whitespace-pre-wrap break-words text-${portfolio.alignment}`}
          >
            <div className="inline-block">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                {portfolio.avatar ? (
                  <AvatarImage src={portfolio.avatar} />
                ) : (
                  <AvatarFallback>{portfolio.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{portfolio.name}</h2>
                <p>{portfolio.title}</p>
              </div>
            </div>

            {portfolio.bio && <Section title="About" content={portfolio.bio} />}
            {portfolio.showContact && links.length > 0 && (
              <Section title="Contact">
                <ul className="space-y-1">
                  {links.map((link: any, i: number) => (
                    <li key={i}>
                      <strong>{link.type}:</strong>{" "}
                      <a
                        className="underline"
                        href={
                          link.value.startsWith("http")
                            ? link.value
                            : `mailto:${link.value}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label || link.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {portfolio.showSkills && portfolio.skills && (
              <Section title="Skills">
                <div
                  className={`flex flex-wrap gap-2 ${
                    portfolio.alignment === "center"
                      ? "justify-center"
                      : portfolio.alignment === "right"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {portfolio.skills.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="bg-primary text-white px-3 py-1 rounded-full text-xs"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}
            {portfolio.experience && (
              <Section title="Experience" content={portfolio.experience} />
            )}
            {portfolio.education && (
              <Section title="Education" content={portfolio.education} />
            )}
            {portfolio.projects && (
              <Section title="Projects" content={portfolio.projects} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, id, value, onChange }: any) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={onChange} />
    </div>
  );
}

function TextareaGroup({ label, id, value, onChange }: any) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} rows={4} value={value} onChange={onChange} />
    </div>
  );
}

function Section({ title, content, children }: any) {
  return (
    <section className="space-y-1">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {content ? <p>{content}</p> : children}
    </section>
  );
}
