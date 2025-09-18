"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Package } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Store Location",
    details: ["Shop No EF-09, First Floor", "Spectrum@Metro, Phase 2", "Noida, Sector 75", "Uttar Pradesh, India"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+91 9899743002", "+91 8010245230", "Available during business hours"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Sunday", "9:00 AM - 9:00 PM", "Open all days of the week"],
  },
  {
    icon: Car,
    title: "Delivery Areas",
    details: ["Greater Noida", "Noida", "Delhi NCR", "Same day delivery available"],
  },
]

const services = [
  {
    icon: Package,
    title: "Custom Orders",
    description: "Special orders for festivals, celebrations, and corporate events",
  },
  {
    icon: Car,
    title: "Home Delivery",
    description: "Fresh sweets delivered to your doorstep with proper packaging",
  },
  {
    icon: Mail,
    title: "Bulk Orders",
    description: "Special pricing for bulk orders and corporate gifting",
  },
]

export function ContactInfo() {
  return (
    <section className="py-16 bg-gradient-to-br from-[var(--roshogolpo-light)] to-[var(--roshogolpo-cream)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-8">
              Visit us at our store or get in touch through any of the following ways. We're here to help you find the
              perfect sweet for any occasion.
            </p>
          </div>

          {/* Contact Details */}
          <div className="grid gap-6">
            {contactDetails.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-[var(--roshogolpo-light)] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-[var(--roshogolpo-gold)]" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-lg font-semibold text-[var(--roshogolpo-gold)] mb-2">{item.title}</h3>
                          <div className="space-y-1">
                            {item.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-600 text-xs sm:text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Services */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">Our Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                          <div>
                            <h4 className="font-semibold text-[var(--roshogolpo-gold)]">{service.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
