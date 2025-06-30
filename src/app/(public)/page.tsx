"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const reviews = [
  {
    name: "Jane D.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "⭐️⭐️⭐️⭐️⭐️ - Amazing product! Shared my info in seconds.",
  },
  {
    name: "Michael T.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "⭐️⭐️⭐️⭐️⭐️ - TapTag is a game-changer for networking!",
  },
  {
    name: "Sofia R.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "⭐️⭐️⭐️⭐️ - Slick, simple, sustainable.",
  },
];

export default function Home() {
  const [ci, setCi] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });
    const i = setInterval(() => setCi((p) => (p + 1) % reviews.length), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className="text-white scroll-smooth overflow-x-hidden max-w-screen bg-black font-serif">
      {/* Hero */}
      <section className="min-h-screen w-full flex flex-col lg:flex-row items-center px-6 py-24 bg-black">
        <div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 mb-12 lg:mb-0 lg:pr-20"
          data-aos="fade-right"
        >
          <h1 className="text-5xl font-bold text-[#D4AF37]">TapTag</h1>
          <p className="text-lg text-neutral-300 max-w-md leading-relaxed">
            Share your digital presence with effortless elegance.
          </p>
          {/* <Button className="bg-[#D4AF37] text-black hover:bg-[#c6a130] px-6 py-3 rounded-full text-lg shadow-lg transition">
            Get Started
          </Button> */}
        </div>
        <div className="w-full lg:w-1/2" data-aos="zoom-in">
          <Image
            src="/images/3.png"
            alt="TapTag in action"
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* What is TapTag */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center bg-[#0a0a0a] px-6 py-20">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0" data-aos="zoom-in">
          <Image
            src="/images/1.png"
            alt="TapTag NFC"
            width={800}
            height={600}
            className="rounded-2xl shadow-2xl"
          />
        </div>
        <div
          className="w-full lg:w-1/2 space-y-6 lg:pl-16 text-center lg:text-left"
          data-aos="fade-left"
        >
          <h2 className="text-4xl font-semibold text-[#D4AF37]">What is TapTag?</h2>
          <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
            A luxurious contactless NFC card that instantly shares your digital profile — no apps or typing required. Designed for professionals, creators, and brands who value presentation.
          </p>
        </div>
      </section>

      {/* Why Choose TapTag */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center bg-black px-6 py-20">
        <div
          className="w-full lg:w-1/2 space-y-6 lg:pr-16 mb-12"
          data-aos="fade-right"
        >
          <h2 className="text-4xl font-semibold text-[#D4AF37]">Why Choose TapTag</h2>
          <ul className="text-neutral-300 space-y-3 text-base">
            <li><strong className="text-white">✨ Instant Digital Exchange:</strong> Tap once to share instantly.</li>
            <li><strong className="text-white">📎 Smart Engagement:</strong> Link to portfolios, socials, and services.</li>
            <li><strong className="text-white">📲 Event Efficiency:</strong> Impress at expos and conferences.</li>
            <li><strong className="text-white">♻️ Eco‑Friendly:</strong> One card, endless use. Sustainable & smart.</li>
            <li><strong className="text-white">🛡️ Brand Modernization:</strong> A tech-forward first impression.</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2" data-aos="fade-left">
          <Image
            src="/images/4.png"
            alt="Business background"
            width={800}
            height={600}
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="min-h-screen bg-[#0a0a0a] px-6 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-14" data-aos="fade-up">
          <h2 className="text-4xl font-semibold text-[#D4AF37]">Modern Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📱",
                title: "One-Tap Access",
                desc: "Instantly open your profile — no app needed.",
              },
              {
                icon: "🌐",
                title: "Smart Sharing",
                desc: "Link to your business, socials, or booking pages.",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "You control what’s shared, when and how.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:border-[#D4AF37] transition">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-[#D4AF37]">{f.title}</h3>
                <p className="mt-2 text-neutral-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      {/* <section className="bg-black px-6 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-10" data-aos="fade-up">
          <h2 className="text-4xl font-semibold text-[#D4AF37]">Trusted by Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
              { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
              { name: "San Miguel", logo: "https://e7.pngegg.com/pngimages/179/435/png-clipart-san-miguel-beer-san-miguel-brewery-red-horse-beer-beer-logo-shield-thumbnail.png" },
              { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
              { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
            ].map((company, i) => (
              <div key={i} className="flex items-center justify-center h-20">
                <img src={company.logo} alt={company.name} className="max-h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="min-h-screen bg-black relative flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 z-0">
          <Image src="/images/tap.png" alt="Customer using TapTag" fill className="object-cover opacity-10" />
        </div>
        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.15)] max-w-md text-center" data-aos="zoom-in">
          <img src={reviews[ci].avatar} alt={reviews[ci].name} className="w-16 h-16 rounded-full border-2 border-[#D4AF37] mx-auto" />
          <p className="mt-4 text-[#D4AF37] text-base">{reviews[ci].text}</p>
          <p className="mt-2 text-neutral-300 italic text-sm">— {reviews[ci].name}</p>
        </div>
      </section>
    </main>
  );
}
