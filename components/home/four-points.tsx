import React from "react";
import Image from "next/image";

const FourPoints = [
  {
    title: "Loved By India",
    description: "Loved by 5 lakh+ customers",
    img: "/home/four-points/image-01.png",
  },
  {
    title: "Handmade",
    description: "Every piece is made with love",
    img: "/home/four-points/image-02.png",
  },
  {
    title: "Fast Shipping",
    description: "Ships In 5-7 Days",
    img: "/home/four-points/image-03.png",
  },
  {
    title: "No Preservatives",
    description: "Pure taste, naturally fresh",
    img: "/home/four-points/image-04.png",
  },
];

const FourPointSection = () => {
  return (
    <section className="py-10 bg-[var(--roshogolpo-active)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white font-medium text-md">
        {FourPoints.map((point, index) => (
          <div key={index}>
            <Image src={point.img} alt={point.title} width={60} height={60} className="mb-4 mx-auto" />
            <h3 className="text-lg ">{point.title}</h3>
            <p>{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FourPointSection;
