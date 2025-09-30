"use client"

import { useState, useEffect } from "react"
import { FeaturedProductCard } from "./featured-product-card"
import { products } from "@/lib/data/products"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function FeaturedProductsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const featuredProducts = products.filter((product) => product.featured)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--roshogolpo-gold)] mb-4 font-playfair">Featured Delights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of authentic Bengali sweets, crafted with love and tradition
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="">
              {featuredProducts.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 gap-8"
                >
                  <FeaturedProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="bg-white shadow-lg hover:bg-gray-50 border-gray-200" />
            <CarouselNext className="bg-white shadow-lg hover:bg-gray-50 border-gray-200" /> */}
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(featuredProducts.length / 4) }).map((_, index) => (
              <button
                key={`carousel-page-${featuredProducts.length}-${index}`}
                onClick={() => api?.scrollTo(index * 4)}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor((current - 1) / 4) === index
                    ? "bg-[var(--roshogolpo-gold)] w-8 h-3"
                    : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
