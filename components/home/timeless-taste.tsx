import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TimelessTaste = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[url('/home/timeless-taste-bg.png')] bg-cover bg-bottom bg-no-repeat min-h-[160px] rounded-2xl relative p-8 md:p-12 flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 w-full">
            <div className="pl-10 text-white">
              <h2 className="text-3xl sm:text-6xl font-semibold text-center md:text-left">
                Timeless Taste of Tradition
              </h2>
              <p className="text-center md:text-left text-lg">
                Authentic Indian Mithai for Every Celebration
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-[var(--roshogolpo-hover)] text-black hover:text-white px-8 py-3 text-lg font-semibold group rounded-full mt-4"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
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
