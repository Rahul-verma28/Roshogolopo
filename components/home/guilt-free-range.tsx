"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GuiltFreeRange() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-brand-light rounded-2xl mb-12 bg-[var(--roshogolpo-header)] p-5"
        >
          <div className="md:flex gap-8 items-center w-full">
            <div className="grid grid-cols-2 gap-4 md:w-[60%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative h-120 rounded-lg overflow-hidden"
              >
                <Image
                  src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                  alt="Traditional Bengali sweets in decorative bowl"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative h-120 rounded-lg overflow-hidden"
              >
                <Image
                  src="/beautiful-bengali-sweets-display-with-rasgulla-san.jpg"
                  alt="Woman holding jar of guilt-free sweets"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6 w-[40%] p-10"
            >
              <div className="w-full">
                <Image
                  src="/decoration/leaves.png"
                  alt="Leaves Decoration"
                  width={120}
                  height={120}
                  className="object-cover"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--roshogolpo-active)] mb-4">
                  Guilt Free Range
                </h2>
                <p className="text-gray-600 text-md leading-relaxed">
                  Indulge guilt-free in our wide range of sugar-free treats,
                  bursting with flavor and healthfulness
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-hover)] text-white px-8 py-3 text-sm font-semibold group"
              >
                <Link href="/products">
                  Shop Guilt Free Sweets
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
