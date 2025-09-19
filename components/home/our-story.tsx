"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function OurStory() {
  return (
    <section className="py-12 sm:py-16 md:py-5 sm:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start md:items-center mb-8 sm:mb-10 md:mb-12"
        >
          {/* Left Images */}
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
            >
              <Image
                src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                alt="Traditional sweet shop interior with gift boxes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                priority
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden"
              >
                <Image
                  src="/bengali-sweet-making-process-traditional-kitchen-a.jpg"
                  alt="Traditional Bengali sweets making process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 23vw, 20vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden"
              >
                <Image
                  src="/traditional-bengali-sweets-rasgulla-sandesh-classi.jpg"
                  alt="Roshogolpo sweet shop display"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 23vw, 20vw"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6 sm:space-y-8 md:space-y-10"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-4 sm:mb-6">
                Our Story
              </h2>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <p className="text-sm sm:text-base leading-relaxed">
                  At Roshogolpo, we believe that every sweet tells a story.
                  Rooted in the rich culinary heritage of Bengal, our mission is
                  to preserve, celebrate, and reinvent traditional Bengali
                  sweets.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Roshogolpo's success stems from its blend of tradition,
                  innovation, and unwavering quality. Its dynamism is fueled by
                  a continuous effort to revamp products and packaging to align
                  with the evolving demographics of India.
                </p>

                <p className="text-sm sm:text-base leading-relaxed">
                  Roshogolpo is dedicated to authenticity, sourcing ingredients
                  like saffron from Kashmir for Malpua and paneer from Delhi for
                  savory delights, proving that great taste knows no boundaries.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <p className="text-[var(--roshogolpo-footer)] font-semibold text-base sm:text-lg md:text-xl">
                Stories Wrapped in Sugar Syrup
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Preserving Bengali heritage, one sweet at a time
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
