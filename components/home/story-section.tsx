"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, Heart } from "lucide-react"

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "50+", label: "Sweet Varieties" },
  { icon: Heart, value: "4.9", label: "Customer Rating" },
]

export function StorySection() {
  return (
    <section className="py-5 sm:py-10 bg-gradient-to-br from-[var(--roshogolpo-light)] to-[var(--roshogolpo-cream)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="text-[var(--roshogolpo-hover)] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mt-2 mb-6 font-playfair leading-tight">
                Every Sweet Tells a Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-700 leading-relaxed"
            >
              <p className="text-sm sm:text-lg">
                At Roshogolpo, we believe that every sweet tells a story. Rooted in the rich culinary heritage of
                Bengal, our mission is to preserve, celebrate, and reinvent traditional Bengali sweets.
              </p>
              <p>
                Bengal is known across the world for its unmatched variety of sweets, and many of these time-honored
                treasures are fading into obscurity. Our goal is to bring them back to life, one delicious bite at a
                time.
              </p>
              <p>
                From melt-in-your-mouth Rasgullas to soulful Sandesh, every bite carries the flavor of home and
                happiness. We take pride in reimagining classics for the contemporary palate while preserving their
                original essence.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 my-12"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <IconComponent className="h-6 w-6 text-[var(--roshogolpo-gold)]" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--roshogolpo-gold)]">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white px-8 py-3 text-sm sm:text-lg font-semibold group"
              >
                <Link href="/about">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[600px]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-gradient-to-br from-[var(--roshogolpo-gold)]/20 to-[var(--roshogolpo-hover)]/20 rounded-3xl"
              />
              <Image
                src="/bengali-sweet-making-process-traditional-kitchen-a.jpg"
                alt="Traditional Bengali Sweet Making Process"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />

              {/* Quote Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <blockquote className="text-[var(--roshogolpo-gold)] font-playfair text-sm sm:text-lg italic text-center">
                  "Let's create sweet memories together – because every sweet has a story, and we can't wait to hear
                  yours!"
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
