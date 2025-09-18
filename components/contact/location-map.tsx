"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Navigation } from "lucide-react"

export function LocationMap() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8234567890123!2d77.3456789!3d28.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzA0LjQiTiA3N8KwMjAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">
            Find Us Here
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Greater Noida at Spectrum@Metro, we're easily accessible and waiting to serve you
            the finest Bengali sweets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gray-200">
                {/* Placeholder for map - in a real app, you'd use Google Maps or similar */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--roshogolpo-light)] to-[var(--roshogolpo-cream)]">
                  <div className="text-center">
                    <Navigation className="h-12 w-12 text-[var(--roshogolpo-gold)] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[var(--roshogolpo-gold)] mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">
                      Shop No EF-09, First Floor
                      <br />
                      Spectrum@Metro, Phase 2, Noida, Sector 75
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        asChild
                        className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white"
                      >
                        <a
                          href="https://maps.google.com/?q=Spectrum+Metro+Phase+2+Noida+Sector+75"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Google Maps
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-gold)] hover:text-white bg-transparent"
                      >
                        <a href="tel:+919899743002">Call for Directions</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Directions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="border-0 shadow-lg bg-[var(--roshogolpo-light)]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[var(--roshogolpo-gold)] mb-4 font-playfair">How to Reach Us</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-[var(--roshogolpo-gold)] mb-2">By Metro</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Take the Blue Line to Sector 51 Metro Station. Spectrum@Metro is directly connected to the metro
                    station.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--roshogolpo-gold)] mb-2">By Car</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Ample parking available at Spectrum@Metro. Take the Noida-Greater Noida Expressway and exit at
                    Sector 75.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--roshogolpo-gold)] mb-2">By Bus</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Multiple bus routes serve the area. Get off at Spectrum Metro bus stop and take the elevator to the
                    first floor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
