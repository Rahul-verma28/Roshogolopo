"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[var(--roshogolpo-gold)] blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[var(--roshogolpo-gold)] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[var(--roshogolpo-hover)] blur-2xl"></div>
      </div>

      <div className="container mx-auto p-4 pt-10 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-6"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-[var(--roshogolpo-gold)] font-medium">
                Trusted by 10,000+ sweet lovers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair leading-tight"
            >
              Stories Wrapped in{" "}
              <span className="text-[var(--roshogolpo-hover)] relative">
                Sugar Syrup
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--roshogolpo-gold)] origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Discover authentic Bengali sweets reimagined for modern taste. From melt-in-your-mouth Rasgullas to
              soulful Sandesh, every bite carries the flavor of home and happiness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white px-8 py-3 text-sm sm:text-lg font-semibold group"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] hover:text-white px-8 py-3 text-sm sm:text-lg font-semibold bg-transparent"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-xs sm:text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full"></div>
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full"></div>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full"></div>
                <span>Traditional Recipes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                alt="Authentic Bengali Sweets Collection"
                fill
                className="object-cover rounded-3xl"
                priority
              />

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-[var(--roshogolpo-light)]"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--roshogolpo-hover)]">50+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Sweet Varieties</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-[var(--roshogolpo-light)]"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--roshogolpo-hover)]">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-600">Customer Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="w-6 h-10 border-2 border-[var(--roshogolpo-gold)] rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-1 h-3 bg-[var(--roshogolpo-gold)] rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}
    </section>
  )
}
