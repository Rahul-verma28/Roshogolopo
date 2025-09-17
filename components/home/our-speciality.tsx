"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const specialities = [
  {
    id: 1,
    name: "Ajmeri Kalakand",
    image: "/indian-sweets-kalakand.jpg",
    link: "/products/ajmeri-kalakand",
  },
  {
    id: 2,
    name: "Motichoor Laddu",
    image: "/motichoor-laddu-bengali-sweet.jpg",
    link: "/products/motichoor-laddu",
  },
  {
    id: 3,
    name: "Malai Sandwich",
    image: "/malai-sandwich-bengali-sweet.jpg",
    link: "/products/malai-sandwich",
  },
  {
    id: 4,
    name: "Rose Sandesh",
    image: "/rose-truffle-sandesh-fusion.jpg",
    link: "/products/rose-sandesh",
  },
  {
    id: 5,
    name: "Chocolate Truffle Sandesh",
    image: "/chocolate-truffle-sandesh-fusion.jpg",
    link: "/products/chocolate-truffle-sandesh",
  },
];

export function OurSpeciality() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-3 border-l-6 rounded-xl border-[var(--roshogolpo-active)] p-8 md:w-[35%]"
          >
            <Image
              src="/decoration/leaves.png"
              alt="Leaves Decoration"
              width={120}
              height={120}
              className="object-cover"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--roshogolpo-active)] mb-4">
              Our Speciality
            </h2>
            <p className="text-md text-gray-600">
              handmade sweet confections that always get a little more love!
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-[var(--roshogolpo-footer)] text-white rounded-full hover:bg-[var(--roshogolpo-footer)]/90 transition-colors"
            >
              See All
            </Link>
          </motion.div>

          {/* Right Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-[65%]"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {specialities.map((sweet) => (
                  <CarouselItem key={sweet.id} className="md:basis-1/2">
                    <Link href={sweet.link} className="block relative group">
                      <div className="relative h-140 overflow-hidden rounded-lg">
                        <Image
                          src={sweet.image}
                          alt={sweet.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-xl text-white font-semibold font-playfair">
                            {sweet.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-8 right-10 flex">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
