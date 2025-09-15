"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Star, Users } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[var(--roshogolpo-header)] via-[var(--roshogolpo-cream)] to-[var(--roshogolpo-light)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[var(--roshogolpo-gold)] blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[var(--roshogolpo-footer)] blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-[var(--roshogolpo-hover)] font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-[var(--roshogolpo-footer)] mt-2 mb-6 font-playfair leading-tight">
                Every Sweet Tells a{" "}
                <span className="text-[var(--roshogolpo-hover)] relative">
                  Story
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--roshogolpo-gold)] origin-left"
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              At Roshogolpo, we believe that every sweet tells a story. Rooted in the rich culinary heritage of Bengal,
              our mission is to preserve, celebrate, and reinvent traditional Bengali sweets for the modern palate.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Heart className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--roshogolpo-footer)]">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Star className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--roshogolpo-footer)]">50+</div>
                <div className="text-sm text-gray-600">Sweet Varieties</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Users className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--roshogolpo-footer)]">4.9</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] lg:h-[600px]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-[var(--roshogolpo-gold)]/20 to-[var(--roshogolpo-hover)]/20 rounded-3xl"
              />
              <Image
                src="/roshogolpo-founders-aritro-sanjukta-about.jpg"
                alt="Roshogolpo Founders - Aritro and Sanjukta"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
