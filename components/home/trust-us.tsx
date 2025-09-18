"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const trustBadges = [
  {
    id: 1,
    name: "Since 1988",
    image: "/trust/trust-01.png"
  },
  {
    id: 2,
    name: "Quality Assured",
    image: "/trust/trust-02.png"
  },
  {
    id: 3,
    name: "ISO Certified",
    image: "/trust/trust-03.png"
  },
  {
    id: 4,
    name: "Eco Friendly",
    image: "/trust/trust-04.png"
  },
];

function TrustUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 mb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
          You Can Trust Us
        </p>

        <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">
          Clean, Authentic And Sustainable
        </h2>
      </motion.div>

      <div className="flex justify-center items-center gap-3 sm:gap-16">
        {trustBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src={badge.image || "/placeholder.svg"}
                alt={badge.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {badge.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default TrustUs;
