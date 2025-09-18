import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TimelessTaste = () => {
  return (
    <section className="py-5 sm:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[url('/home/timeless-taste-bg.png')] bg-cover bg-bottom bg-no-repeat min-h-[160px] rounded-2xl relative p-8 md:p-12 flex items-center">
          <div className="sm:flex items-center justify-evenly gap-5 relative z-10 w-full">
            {/* <div className="text-white sm:w-[50%]">
              <h2 className="text-3xl sm:text-6xl font-semibold">
                Timeless Taste of Tradition
              </h2>
              <p className="text-center md:text-left text-sm sm:text-lg">
                Authentic Indian Mithai for Every Celebration
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-[var(--roshogolpo-hover)] text-black hover:text-white px-8 py-3 text-xs sm:text-sm font-semibold group rounded-full mt-4"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div> */}
            <div className="text-white w-full sm:w-[50%] space-y-3 sm:space-y-1 mb-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-center sm:text-left">
                Timeless Taste of Tradition
              </h2>
              <p className="text-center sm:text-left text-sm sm:text-base md:text-lg">
                Authentic Indian Mithai for Every Celebration
              </p>
              <div className="flex justify-center sm:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-[var(--roshogolpo-hover)] text-black hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold group rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/products" className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="">
              <Image
                src="/home/timeless-taste.png"
                alt="Timeless Testimonial"
                width={400}
                height={300}
                className="object-contain max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelessTaste;
