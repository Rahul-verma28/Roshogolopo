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
    image: "/mihidana-bardhaman-bengali-sweet.jpg",
    link: "/products/ajmeri-kalakand",
  },
  {
    id: 2,
    name: "Motichoor Laddu",
    image: "/classic-roshogolla-bengali-sweet.jpg",
    link: "/products/motichoor-laddu",
  },
  {
    id: 3,
    name: "Malai Sandwich",
    image: "/traditional-sandesh-bengali-sweet.jpg",
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
    <section className="py-5 sm:py-10 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center w-full gap-8 md:gap-12 pb-5">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 border-l-4 sm:border-l-6 rounded-xl border-[var(--roshogolpo-active)] p-4 sm:p-6 md:p-8 w-full md:w-[35%]"
          >
            <Image
              src="/decoration/leaves.png"
              alt="Leaves Decoration"
              width={80}
              height={80}
              className="object-cover w-16 sm:w-20 md:w-24 lg:w-28"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--roshogolpo-active)] mb-2 sm:mb-4">
              Our Speciality
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              handmade sweet confections that always get a little more love!
            </p>
            <Link
              href="/products"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--roshogolpo-gold)] text-white text-sm sm:text-base rounded-full hover:bg-[var(--roshogolpo-gold)]/90 transition-colors"
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
              <CarouselContent className="-ml-2 sm:-ml-4">
                {specialities.map((sweet) => (
                  <CarouselItem 
                    key={sweet.id} 
                    className="pl-2 sm:pl-4 basis-4/5 sm:basis-2/3 md:basis-1/2"
                  >
                    <Link href={sweet.link} className="block relative group">
                      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                        <Image
                          src={sweet.image}
                          alt={sweet.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 80vw, (max-width: 768px) 66vw, (max-width: 1024px) 50vw, 33vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 transition-opacity group-hover:opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                          <h3 className="text-base sm:text-lg md:text-xl text-white font-semibold font-playfair drop-shadow-md">
                            {sweet.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-8 right-0 sm:right-4 md:right-10 flex space-x-2 sm:space-x-4">
                <CarouselPrevious className="h-8 w-8 sm:h-10 sm:w-10" />
                <CarouselNext className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
