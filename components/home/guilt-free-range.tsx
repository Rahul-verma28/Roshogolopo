"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GuiltFreeRange() {
  return (
    <section className="py-5 sm:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-brand-light rounded-lg sm:rounded-xl md:rounded-2xl bg-[var(--roshogolpo-cream)] p-4 sm:p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-[60%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative aspect-[3/4] sm:aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                  alt="Traditional Bengali sweets in decorative bowl"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative aspect-[3/4] sm:aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src="/classic-roshogolla-bengali-sweet.jpg"
                  alt="Woman holding jar of guilt-free sweets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 sm:space-y-6 w-full md:w-[40%] p-4 sm:p-6 md:p-10"
            >
              <div className="w-full">
                <Image
                  src="/decoration/leaves.png"
                  alt="Leaves Decoration"
                  width={80}
                  height={80}
                  className="object-cover w-16 sm:w-20 md:w-24 mb-4 sm:mb-6"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--roshogolpo-active)] mb-3 sm:mb-4">
                  Guilt Free Range
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Indulge guilt-free in our wide range of sugar-free treats,
                  bursting with flavor and healthfulness
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold group w-full sm:w-auto"
              >
                <Link href="/products" className="flex items-center justify-center">
                  Shop Guilt Free Sweets
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
