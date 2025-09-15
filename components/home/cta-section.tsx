"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--roshogolpo-footer)] to-[var(--roshogolpo-hover)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-playfair">Ready to Taste the Stories?</h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Visit our store in Greater Noida or order online to experience the authentic taste of Bengal's favorite
              sweets and snacks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--roshogolpo-footer)] hover:bg-gray-100 px-8 py-4 text-lg font-semibold group"
            >
              <Link href="/products">
                Order Online
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--roshogolpo-footer)] px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <Link href="/contact">Visit Our Store</Link>
            </Button>
          </motion.div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Visit Us</div>
                <div className="text-sm opacity-80">Shop EF-09, Spectrum@Metro, Phase 2, Noida</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold">Call Us</div>
                <div className="text-sm opacity-80">+91 9899743002 • +91 8010245230</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
