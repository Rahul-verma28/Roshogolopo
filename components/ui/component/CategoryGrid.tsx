import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const collections = [
  {
    id: "classic",
    title: "Classic Collection",
    image: "/traditional-bengali-sweets-rasgulla-sandesh-classi.jpg",
    href: "/products?category=classic",
    productCount: 35,
  },
  {
    id: "fusion",
    title: "Fusion & Truffle",
    image: "/fusion-bengali-sweets-truffle-sandesh-modern-innov.jpg",
    href: "/products?category=fusion",
    productCount: 28,
  },
  {
    id: "snacks",
    title: "Morning & Evening Snacks",
    image: "/bengali-snack-mix-traditional-package.jpg",
    href: "/products?category=snacks",
    productCount: 41,
  },
  {
    id: "packages",
    title: "Package Items",
    image: "/nabadwip-ghee-traditional-package.jpg",
    href: "/products?category=packages",
    productCount: 15,
  },
  {
    id: "packages",
    title: "Package Items",
    image: "/nabadwip-ghee-traditional-package.jpg",
    href: "/products?category=packages",
    productCount: 15,
  },
];

const CategoryGrid = () => {
  return (
    <section className="pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Shop Our Range</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {collections.map((collection) => (
              <CarouselItem
                key={collection.id}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Link
                  key={collection.id}
                  href={collection.href}
                  className="group relative overflow-hidden rounded-lg aspect-[4/5] block"
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 mb-20"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-semibold">
                      {collection.title}
                    </h3>
                    <p className="text-sm mb-1">
                      {collection.productCount} Products
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryGrid;
