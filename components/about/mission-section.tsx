"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Award } from "lucide-react"

const missions = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To preserve, celebrate, and reinvent traditional Bengali sweets, bringing time-honored treasures back to life for modern palates.",
  },
  {
    icon: Heart,
    title: "Our Passion",
    description:
      "Every sweet tells a story. We're passionate about sharing the rich culinary heritage of Bengal through authentic flavors and innovative creations.",
  },
  {
    icon: Lightbulb,
    title: "Our Innovation",
    description:
      "Blending traditional recipes with modern techniques to create fusion treats that honor the past while embracing the future.",
  },
  {
    icon: Award,
    title: "Our Promise",
    description:
      "Every bite is a blend of tradition, nostalgia, and innovation. We promise a sweet story in every box, crafted with love and authenticity.",
  },
]

export function MissionSection() {
  return (
    <section className="py-5 sm:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">
            Our Mission & Values
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Guided by our commitment to authenticity, innovation, and the preservation of Bengali sweet heritage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => {
            const IconComponent = mission.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                  <CardContent className="p-8">
                    <div className="bg-[var(--roshogolpo-light)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--roshogolpo-gold)] transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-[var(--roshogolpo-gold)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--roshogolpo-gold)] mb-4 font-playfair">
                      {mission.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
