// // "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const collections = [
//   {
//     id: "classic",
//     title: "Classic Collection",
//     image: "/traditional-bengali-sweets-rasgulla-sandesh-classi.jpg",
//     href: "/products?category=classic",
//     productCount: 35,
//   },
//   {
//     id: "fusion",
//     title: "Fusion & Truffle",
//     image: "/fusion-bengali-sweets-truffle-sandesh-modern-innov.jpg",
//     href: "/products?category=fusion",
//     productCount: 28,
//   },
//   {
//     id: "snacks",
//     title: "Morning & Evening Snacks",
//     image: "/classic-roshogolla-bengali-sweet.jpg",
//     href: "/products?category=snacks",
//     productCount: 41,
//   },
//   {
//     id: "packages",
//     title: "Package Items",
//     image: "/traditional-sandesh-bengali-sweet.jpg",
//     href: "/products?category=packages",
//     productCount: 15,
//   },
// ];

// const CategoryGrid = () => {

//   return (
//     <section className="pb-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-3 font-playfair">
//           Shop Our Range
//         </h2>

//         <Carousel
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="w-full"
//         >
//           <CarouselContent className="-ml-2 md:-ml-4">
//             {collections.map((collection) => (
//               <CarouselItem
//                 key={collection.id}
//                 className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
//               >
//                 <Link
//                   key={collection.id}
//                   href={collection.href}
//                   className="group relative overflow-hidden rounded-lg aspect-[4/5] block"
//                 >
//                   <Image
//                     src={collection.image}
//                     alt={collection.title}
//                     fill
//                     className="object-cover transition-transform duration-300 group-hover:scale-105 mb-20"
//                   />
//                   <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
//                   <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-6 text-white">
//                     <h3 className="text-sm sm:text-lg font-semibold">
//                       {collection.title}
//                     </h3>
//                     <p className="text-xs sm:text-sm ">
//                       {collection.productCount} Products
//                     </p>
//                   </div>
//                 </Link>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="h-8 w-8 left-2" />
//           <CarouselNext className="h-8 w-8 right-2" />
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default CategoryGrid;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { fetchCategories } from "@/lib/redux/slices/categoriesSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const CategoryGrid = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // Fetch categories with product count
    dispatch(fetchCategories({ includeProductCount: true }));
  }, [dispatch]);

  if (error) {
    return (
      <section className="pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-3 font-playfair">
            Shop Our Range
          </h2>
          <div className="text-center py-8">
            <p className="text-red-500">
              Failed to load categories. Please try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-3 font-playfair">
          Shop Our Range
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {isLoading
              ? // Loading skeleton
                [...Array(4)].map((_, index) => (
                  <CarouselItem
                    key={`skeleton-${index}`}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
                      <Skeleton className="w-full h-full" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-6">
                        <Skeleton className="h-4 sm:h-6 w-3/4 mb-2" />
                        <Skeleton className="h-3 sm:h-4 w-1/2" />
                      </div>
                    </div>
                  </CarouselItem>
                ))
              : // Actual categories
                categories
                  .filter((category) => category.isActive)
                  .map((category) => (
                    <CarouselItem
                      key={category._id}
                      className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="group relative overflow-hidden rounded-lg aspect-[4/5] block"
                      >
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-6 text-white">
                          <h3 className="text-sm sm:text-lg font-semibold">
                            {category.name}
                          </h3>
                          <p className="text-xs sm:text-sm">
                            {category.productCount || 0} Products
                          </p>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
          </CarouselContent>
          <CarouselPrevious className="h-8 w-8 left-2" />
          <CarouselNext className="h-8 w-8 right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryGrid;
