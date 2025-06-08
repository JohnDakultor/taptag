"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="min-h-screen bg-neutral-800 px-6 py-12 space-y-32 text-white">
      <section className="text-center" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-500">TapTag</h1>
        <p className="text-lg text-neutral-300 max-w-xl mx-auto">
          Connections made simple.
        </p>
      </section>

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

      {/* Card with background image and hover zoom on image only */}
      <section
        className="relative bg-neutral-900 rounded-3xl shadow-md py-12 px-8 max-w-5xl mx-auto space-y-6 overflow-hidden"
        data-aos="fade-up"
      >
        {/* Background image container with hover zoom */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-20 pointer-events-none select-none w-[400px] h-[400px] rounded-3xl overflow-hidden transition-transform duration-500 ease-in-out"
          style={{ zIndex: 0 }}
          // Add hover zoom effect on parent section hover
        >
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
            alt="NFC abstract"
            className="w-full h-full object-cover rounded-3xl transition-transform duration-500 ease-in-out"
            draggable={false}
          />
        </div>

        {/* Add group so we can target image on parent hover */}
        <div className="relative z-10 group">
          <h2 className="text-4xl font-bold text-center text-yellow-500 mb-4">
            What is NFC?
          </h2>
          <p className="text-neutral-300 text-lg text-center max-w-3xl mx-auto">
            Near Field Communication (NFC) is a short-range wireless technology that enables data exchange between devices placed close to each other, typically within 4 centimeters. It powers contactless payments, access control, and instant data sharing between smartphones.
          </p>
        </div>

        {/* Hover zoom effect */}
        <style jsx>{`
          section:hover div > img {
            transform: scale(1.1);
          }
        `}</style>
      </section>

      {/* Card without background image */}
      <section
        className="relative bg-neutral-900 rounded-3xl shadow-inner py-12 px-8 max-w-5xl mx-auto space-y-6 overflow-hidden"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-center text-yellow-500">
          How Can Your Business Benefit?
        </h2>
        <ul className="list-disc list-inside text-neutral-300 text-lg space-y-4 max-w-3xl mx-auto">
          <li>
            <strong className="text-white">Instant Contact Sharing:</strong> NFC business cards let users transfer contact details with a tap.
          </li>
          <li>
            <strong className="text-white">Customer Engagement:</strong> Direct users to websites, portfolios, or promotions effortlessly.
          </li>
          <li>
            <strong className="text-white">Operational Efficiency:</strong> Reduce wait times with streamlined, contactless interactions.
          </li>
          <li>
            <strong className="text-white">Sustainability:</strong> Ditch traditional paper cards for a greener, modern alternative.
          </li>
        </ul>
      </section>

      {/* <section className="bg-neutral-800 text-center mb-12" data-aos="fade-up">
        <Button className="bg-indigo-600 text-white hover:bg-indigo-500 text-lg px-8 py-4 rounded-full shadow-xl transition duration-300">
          Create Your TapTag
        </Button>
      </section> */}
    </main>
  );
}
