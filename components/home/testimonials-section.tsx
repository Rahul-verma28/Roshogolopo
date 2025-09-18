"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    text: "Amazing fusion sweets! The truffle sandesh is a perfect blend of traditional and modern flavors. Their attention to detail is remarkable.",
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
  {
    name: "Sanjay Mehta",
    location: "Mumbai",
    text: "The package items, especially the Darjeeling tea and Nabadwip ghee, are of exceptional quality. A taste of Bengal at its finest!",
    rating: 5,
    image: "/indian-man-happy-customer-testimonial.jpg",
  },
  {
    name: "Meera Patel",
    location: "Bangalore",
    text: "Their fusion collection is innovative yet authentic. The chocolate truffle sandesh is a masterpiece!",
    rating: 5,
    image: "/indian-woman-smiling-customer-testimonial.jpg",
  },
  {
    name: "Ravi Krishnan",
    location: "Chennai",
    text: "Outstanding quality and service. The Bengali snacks remind me of the streets of Kolkata. Highly recommended!",
    rating: 5,
    image: "/indian-man-happy-customer-testimonial.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-5 sm:py-10 bg-white">
      <div className="container mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-6 font-playfair">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our sweet-loving
            community has to say about their Roshogolpo experience.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="p-5">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <div className="absolute -top-2 right-10 flex sm:space-x-4">
              <CarouselPrevious className="h-8 w-8 sm:h-10 sm:w-10" />
              <CarouselNext className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <CarouselContent className="p-0">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={`${testimonial.name}-${testimonial.location}`}
                  className="p-5 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
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
                            <Star
                              key={`star-${testimonial.name}-${i}`}
                              className="h-5 w-5 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                            />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className="text-gray-700 mb-6 text-xs sm:text-md leading-relaxed italic">
                          "{testimonial.text}"
                        </blockquote>

                        {/* Customer Info */}
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-[var(--roshogolpo-light)] flex items-center justify-center">
                            <span className="text-[var(--roshogolpo-gold)] font-semibold text-sm sm:text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--roshogolpo-gold)]">
                              {testimonial.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {testimonial.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
