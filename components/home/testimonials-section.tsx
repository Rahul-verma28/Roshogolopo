"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "The Roshogollas here taste exactly like the ones my grandmother used to make in Kolkata. Pure nostalgia in every bite!",
    image: "/indian-woman-smiling-customer-testimonial.jpg",
  },
  {
    name: "Rajesh Kumar",
    location: "Noida",
    text: "Amazing fusion sweets! The truffle sandesh is a perfect blend of traditional and modern flavors.",
    rating: 5,
    image: "/indian-man-happy-customer-testimonial.jpg",
  },
  {
    name: "Anita Das",
    location: "Gurgaon",
    text: "Fresh, authentic, and beautifully presented. Roshogolpo has become our go-to for all celebrations.",
    rating: 5,
    image: "/indian-woman-happy-customer-testimonial.jpg",
  },
]

export function TestimonialsSection() {
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
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our sweet-loving community has to say about their Roshogolpo
            experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-[var(--roshogolpo-light)]/30">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-[var(--roshogolpo-gold)] opacity-20">
                    <Quote className="h-8 w-8" />
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--roshogolpo-light)] flex items-center justify-center">
                      <span className="text-[var(--roshogolpo-footer)] font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--roshogolpo-footer)]">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
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
