"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Heart, Coffee, Gift } from "lucide-react"

const collections = [
  {
    id: "classic",
    title: "Classic Collection",
    description: "Traditional Bengali sweets passed down through generations",
    image: "/traditional-bengali-sweets-rasgulla-sandesh-classi.jpg",
    icon: Heart,
    color: "from-amber-100 to-orange-100",
    items: ["Roshogolla", "Sandesh", "Mihidana", "Langcha"],
    href: "/products?category=classic",
  },
  {
    id: "fusion",
    title: "Fusion & Truffle",
    description: "Modern innovation meets traditional flavors",
    image: "/fusion-bengali-sweets-truffle-sandesh-modern-innov.jpg",
    icon: Sparkles,
    color: "from-purple-100 to-pink-100",
    items: ["Truffle Sandesh", "Flavoured Rasgullas", "Seasonal Collections"],
    href: "/products?category=fusion",
  },
  {
    id: "snacks",
    title: "Morning & Evening Snacks",
    description: "Soul of Kolkata street food culture",
    image: "/placeholder-38mbw.png",
    icon: Coffee,
    color: "from-green-100 to-teal-100",
    items: ["Radha Ballavi", "Kachori", "Singara", "Chop"],
    href: "/products?category=snacks",
  },
  {
    id: "packages",
    title: "Package Items",
    description: "Curated selection of authentic Bengal flavors",
    image: "/placeholder-3h072.png",
    icon: Gift,
    color: "from-blue-100 to-indigo-100",
    items: ["Darjeeling Tea", "Sundarban Honey", "Nabadwip Ghee", "Traditional Snacks"],
    href: "/products?category=packages",
  },
]

export function CollectionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--roshogolpo-footer)] mb-6 font-playfair">
            Our Sweet Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From time-honored classics to innovative fusion creations, discover the perfect sweet for every moment and
            celebration.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => {
            const IconComponent = collection.icon
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-20`} />
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <IconComponent className="h-5 w-5 text-[var(--roshogolpo-footer)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--roshogolpo-footer)] mb-2 font-playfair">
                        {collection.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{collection.description}</p>

                      {/* Items List */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-1">
                          {collection.items.map((item, itemIndex) => (
                            <span
                              key={itemIndex}
                              className="text-xs bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-footer)] px-2 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        asChild
                        className="w-full bg-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-hover)] text-white group/btn"
                      >
                        <Link href={collection.href}>
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[var(--roshogolpo-footer)] text-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-footer)] hover:text-white px-8 py-3 text-lg font-semibold group bg-transparent"
          >
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
