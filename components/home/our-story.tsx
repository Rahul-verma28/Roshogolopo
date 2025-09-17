"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-12"
        >
          {/* Left Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                alt="Traditional sweet shop interior with gift boxes"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative h-40 rounded-md overflow-hidden"
              >
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Traditional Bengali sweets making process"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative h-40 rounded-md overflow-hidden"
              >
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Roshogolpo sweet shop storefront"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Roshogolpo's success stems from its blend of tradition,
                  innovation, and unwavering quality. Its dynamism is fueled by
                  a continuous effort to revamp products and packaging to align
                  with the evolving demographics of India.
                </p>

                <p>
                  Roshogolpo is dedicated to authenticity, sourcing ingredients
                  like saffron from Kashmir for Malpua and paneer from Delhi for
                  savory delights, proving that great taste knows no boundaries.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-brand-footer font-semibold text-lg">
                Stories Wrapped in Sugar Syrup
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Preserving Bengali heritage, one sweet at a time
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
