"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative h-[450px] w-full overflow-hidden">
      <Image
        src="/about/about-hero-bg.png"
        alt="Dental team smiling"
        fill
        className="object-cover brightness-90"
        priority
      />
      <div className="absolute inset-0 flex items-end justify-center bg-black/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-screen-2xl px-5 md:px-10 pb-10 mx-auto text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Visit Today & Taste the Best
          </h1>
          <p className="text-center text-sm sm:text-lg text-white/90">
            Experience the Best Sweets' Delicious Flavors in Every Bite.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
