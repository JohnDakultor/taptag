"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const reviews = [
    { name: "Jane D.", avatar: "https://randomuser.me/api/portraits/women/1.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - Amazing product! Shared my info in seconds." },
    { name: "Michael T.", avatar: "https://randomuser.me/api/portraits/men/2.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - TapTag is a game-changer for networking!" },
    { name: "Sofia R.", avatar: "https://randomuser.me/api/portraits/women/3.jpg", text: "⭐️⭐️⭐️⭐️   - Slick, simple, sustainable." },
    { name: "Daniel C.", avatar: "https://randomuser.me/api/portraits/men/4.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - Clients love how easy it is to connect." },
    { name: "Ava N.", avatar: "https://randomuser.me/api/portraits/women/5.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - Clean design and effortless sharing!" },
    { name: "Leo B.", avatar: "https://randomuser.me/api/portraits/men/6.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - A must-have for events and expos." },
    { name: "Emily F.", avatar: "https://randomuser.me/api/portraits/women/7.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - The future of networking is here!" },
    { name: "Chris M.", avatar: "https://randomuser.me/api/portraits/men/8.jpg", text: "⭐️⭐️⭐️⭐️   - Great value and performance." },
    { name: "Lily A.", avatar: "https://randomuser.me/api/portraits/women/9.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - Love the eco-friendly concept!" },
    { name: "Josh K.", avatar: "https://randomuser.me/api/portraits/men/10.jpg", text: "⭐️⭐️⭐️⭐️⭐️  - Seamless and professional impression every time." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-800 px-6 py-12 space-y-32 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-4" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold text-yellow-500">TapTag</h1>
        <p className="text-lg text-neutral-300 max-w-xl mx-auto">
          Connections made simple.
        </p>
      </section>

      {/* Product Image */}
      <section className="flex justify-center" data-aos="zoom-in">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-600">
          <Image
            src="/images/nfc-card-mockup.png"
            alt="TapTag NFC Card"
            width={800}
            height={500}
            className="object-cover w-full h-auto"
          />
        </div>
      </section>

      {/* What is NFC */}
      <section className="max-w-6xl mx-auto space-y-8 bg-neutral-700 p-8 rounded-xl" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-yellow-500">What is NFC?</h2>
        <p className="text-neutral-300 text-lg text-center max-w-3xl mx-auto">
          Near Field Communication (NFC) enables fast, contactless data exchange between devices within just a few centimeters.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden group relative shadow-md">
              <Image
                src={`/images/${i}.png`}
                alt="NFC"
                 width={800}
            height={500}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      
<section
  className="relative max-w-6xl mx-auto rounded-xl overflow-hidden bg-neutral-800"
  data-aos="fade-up"
>
  <Image
    src="/images/4.png"
    alt="Business background"
    fill
    className="object-cover opacity-20"
  />
  <div className="relative p-10 md:p-20 z-10 space-y-8">
    <h2 className="text-4xl font-bold text-yellow-500 text-center">Business Benefits</h2>
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <ul className="list-disc list-inside text-neutral-300 text-lg space-y-4">
        <li>
          <strong className="text-white">Instant Contact Sharing:</strong> Impress clients and partners by exchanging contact info with a single tap—no more fumbling with paper cards.
        </li>
        <li>
          <strong className="text-white">Customer Engagement:</strong> Lead potential customers directly to your landing pages, portfolios, or social links to drive action instantly.
        </li>
        <li>
          <strong className="text-white">Operational Efficiency:</strong> Streamline introductions at events, expos, and meetings—saving time for your team and leaving a tech-savvy impression.
        </li>
        <li>
          <strong className="text-white">Eco-Friendly Approach:</strong> Reinforce your brand’s commitment to sustainability by replacing traditional business cards with reusable NFC tech.
        </li>
        <li>
          <strong className="text-white">Brand Modernization:</strong> Show that your company embraces cutting-edge tools, aligning with next-gen professional and digital culture.
        </li>
      </ul>
    </div>
  </div>
</section>


      {/* How It Works */}
      <section className="max-w-6xl mx-auto space-y-8 bg-neutral-700 p-8 rounded-xl" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-yellow-500">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Create Your TapTag", icon: "💳" },
            { title: "Tap To Share", icon: "📱" },
            { title: "Instant Connection", icon: "⚡" },
          ].map((step, idx) => (
            <div key={idx} className="bg-neutral-600 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-yellow-400">{step.title}</h3>
              <p className="text-neutral-300 mt-2">Effortless digital connection with a simple tap.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Features */}
     <section className="max-w-6xl mx-auto space-y-8" data-aos="fade-up">
  <h2 className="text-4xl font-bold text-center text-yellow-500">Modern Features</h2>
  <div className="grid md:grid-cols-3 gap-6">
    {[
      {
        keyword: "tap",
        title: "One-Tap Access",
        description: "Share your contact or profile instantly by tapping your NFC card to any phone."
      },
      {
        keyword: "share",
        title: "Smart Sharing",
        description: "Easily send links to portfolios, menus, or booking pages without apps or typing."
      },
      {
        keyword: "contactless",
        title: "Contactless & Secure",
        description: "Stay safe with touch-free exchanges that protect both you and your audience."
      }
    ].map((feature, idx) => (
      <div key={idx} className="rounded-xl overflow-hidden group shadow-md relative">
        <Image
          src={`/images/${feature.keyword}.png`}
          alt={feature.keyword}
          width={800}
          height={500}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `/images/${feature.keyword}.jpg`;
          }}
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-4 space-y-1">
          <p className="font-bold text-lg">{feature.title}</p>
          <p className="text-sm">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Review Carousel */}
      <section className="max-w-3xl mx-auto text-center space-y-6 mt-20" data-aos="zoom-in">
  <h2 className="text-3xl font-bold text-yellow-500">What People Are Saying</h2>
  <div className="relative bg-neutral-700 p-6 rounded-xl shadow-lg">
    <div className="flex flex-col items-center space-y-4 px-8 transition duration-500 ease-in-out">
      <img
        src={reviews[currentIndex].avatar}
        alt={reviews[currentIndex].name}
        className="w-16 h-16 rounded-full border-2 border-yellow-500 object-cover"
      />
      <p className="text-yellow-400 text-sm">{reviews[currentIndex].text}</p>
      <p className="text-neutral-300 text-xs italic">- {reviews[currentIndex].name}</p>
    </div>
  </div>
</section>

    </main>
  );
}
