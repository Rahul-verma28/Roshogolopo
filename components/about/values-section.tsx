"use client"

import { motion } from "framer-motion"

export function ValuesSection() {
  return (
    <section className="py-5 sm:py-10 bg-[var(--roshogolpo-hover)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl lg:text-4xl font-bold mb-8 font-playfair">Let's Create Sweet Memories Together</h2>
          <p className="text-md sm:text-xl mb-8 opacity-90 leading-relaxed">
            Because every sweet has a story, and we can't wait to hear yours!
          </p>
          <blockquote className="text-sm sm:text-2xl italic font-playfair opacity-90">
            "From melt-in-your-mouth Rasgullas to soulful Sandesh, every bite carries the flavor of home and happiness"
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
