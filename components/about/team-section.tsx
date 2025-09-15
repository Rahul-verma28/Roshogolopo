"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  {
    name: "Aritro",
    role: "Co-Founder & Culinary Expert",
    description:
      "With a strong foundation in catering and a passion for food that began in his mother's canteen, Aritro combines creativity with over 16 years of professional experience across Sales, Marketing, Event Management, Catering, and global MNCs. His travels inspire the innovative flavors that define Roshogolpo.",
    image: "/aritro-founder-roshogolpo.jpg",
    expertise: ["Culinary Arts", "Business Development", "Innovation", "Quality Control"],
  },
  {
    name: "Sanjukta",
    role: "Co-Founder & Creative Director",
    description:
      "A multi-faceted artist, Sanjukta adds depth to Roshogolpo through her keen eye for design and presentation. Her artistic sensibilities ensure every offering reflects elegance and storytelling, making each sweet not just a treat but a visual delight.",
    image: "/sanjukta-founder-roshogolpo.jpg",
    expertise: ["Design & Presentation", "Brand Strategy", "Customer Experience", "Artistic Vision"],
  },
]

export function TeamSection() {
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
            Meet the Team Behind Roshogolpo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The passionate founders who bring together culinary expertise and artistic vision to create sweet stories
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-32 h-32 mx-auto md:mx-0 flex-shrink-0">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-[var(--roshogolpo-footer)] mb-2 font-playfair">
                        {member.name}
                      </h3>
                      <p className="text-[var(--roshogolpo-hover)] font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-700 leading-relaxed mb-6">{member.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            className="bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-light)]"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Associates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-[var(--roshogolpo-footer)] mb-6 font-playfair">Our Associates</h3>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Supporting them is a diverse team of IIT and IIM alumni, media professionals, legal advisors, IT
            specialists, and hospitality experts. Together, they contribute to brand building, product development, and
            innovation — ensuring Roshogolpo remains a trusted name for authentic flavors with a modern touch.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
