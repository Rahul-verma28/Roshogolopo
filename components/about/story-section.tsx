"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function StorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--roshogolpo-footer)] mb-6 font-playfair">
            The Roshogolpo Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A journey of passion, tradition, and innovation in preserving Bengal's sweet heritage
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/traditional-bengali-sweet-making-heritage.jpg"
                alt="Traditional Bengali Sweet Making Heritage"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[var(--roshogolpo-footer)] font-playfair">
              Preserving Heritage, Embracing Innovation
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
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
              <p>
                At Roshogolpo, every bite is a blend of tradition, nostalgia, and innovation. Whether you're
                rediscovering lost flavors or trying Bengali sweets for the first time, we promise a sweet story in
                every box.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Heritage Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Traditional Recipes",
              description: "Authentic recipes passed down through generations, carefully preserved and perfected.",
              image: "/traditional-recipes-bengali-sweets.jpg",
            },
            {
              title: "Modern Innovation",
              description: "Contemporary techniques and fusion flavors that appeal to today's taste preferences.",
              image: "/modern-fusion-bengali-sweets.jpg",
            },
            {
              title: "Quality Ingredients",
              description: "Only the finest ingredients sourced from trusted suppliers across Bengal and beyond.",
              image: "/quality-ingredients-bengali-sweets.jpg",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[var(--roshogolpo-footer)] mb-3 font-playfair">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
