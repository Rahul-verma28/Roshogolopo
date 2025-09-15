"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock } from "lucide-react"

export function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--roshogolpo-header)] via-[var(--roshogolpo-cream)] to-[var(--roshogolpo-light)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--roshogolpo-footer)] mb-6 font-playfair">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Visit our store, give us a call, or send us a message. Let's create sweet
            memories together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--roshogolpo-footer)] mb-2">Visit Our Store</h3>
            <p className="text-gray-600 text-sm">
              Shop No EF-09, First Floor
              <br />
              Spectrum@Metro, Phase 2
              <br />
              Noida, Sector 75
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Phone className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--roshogolpo-footer)] mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm">
              <a href="tel:+919899743002" className="hover:text-[var(--roshogolpo-footer)] transition-colors">
                +91 9899743002
              </a>
              <br />
              <a href="tel:+918010245230" className="hover:text-[var(--roshogolpo-footer)] transition-colors">
                +91 8010245230
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="h-6 w-6 text-[var(--roshogolpo-footer)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--roshogolpo-footer)] mb-2">Business Hours</h3>
            <p className="text-gray-600 text-sm">
              Monday - Sunday
              <br />
              9:00 AM - 9:00 PM
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
