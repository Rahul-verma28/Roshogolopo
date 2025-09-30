"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MakingTrendy from "@/components/makingTrendy";

const QualityDelights = () => {
  return (
    <section className="relative w-full bg-[#760D1A] overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white space-y-6 order-2 lg:order-1 px-4 sm:px-6 lg:p-12"
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold leading-tight text-center lg:text-left">
                Quality that delights, in every bite.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl text-center lg:text-left">
                We offer a casual dining experience with a warm, welcoming
                atmosphere across all our locations. Our production facilities,
                including sweet production, kitchens, and bakeries, ensure high
                quality and hygiene. Our effected Private Limited is a leader in
                the sweets and snacks market in Gurgaon, Delhi, and Faridabad.
              </p>
            </div>
            <MakingTrendy />
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 w-full"
          >
            <div className="w-full overflow-hidden h-140">
              <Image
                src="/about/quality.png"
                alt="Quality Sweets Display"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wavy Border Bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C300,0 900,40 1200,20 L1200,40 L0,40 Z"
            className="fill-white"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default QualityDelights;
