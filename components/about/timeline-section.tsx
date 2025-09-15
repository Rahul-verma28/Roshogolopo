"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const timelineEvents = [
  {
    year: "2020",
    title: "The Idea is Born",
    description:
      "Aritro and Sanjukta recognize the need to preserve traditional Bengali sweets that are fading into obscurity.",
  },
  {
    year: "2021",
    title: "Recipe Research",
    description:
      "Extensive research into authentic recipes from different regions of Bengal, connecting with traditional sweet makers.",
  },
  {
    year: "2022",
    title: "First Kitchen",
    description:
      "Setting up the first kitchen and perfecting recipes, combining traditional methods with modern quality standards.",
  },
  {
    year: "2023",
    title: "Roshogolpo Launches",
    description: "Official launch with classic collection, introducing authentic Bengali sweets to Greater Noida.",
  },
  {
    year: "2024",
    title: "Fusion Innovation",
    description: "Launch of fusion and truffle collections, blending traditional flavors with contemporary techniques.",
  },
  {
    year: "2025",
    title: "Growing Community",
    description:
      "Expanding our reach and building a community of sweet lovers who appreciate authentic Bengali heritage.",
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--roshogolpo-light)] to-[var(--roshogolpo-cream)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--roshogolpo-footer)] mb-6 font-playfair">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a simple idea to a growing community of sweet lovers - the Roshogolpo timeline
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--roshogolpo-footer)] opacity-20"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-[var(--roshogolpo-footer)] mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold text-[var(--roshogolpo-footer)] mb-3 font-playfair">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-[var(--roshogolpo-footer)] rounded-full border-4 border-white shadow-lg"></div>
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
