import Image from 'next/image'
import React from 'react'

const MakingTrendy = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-14">
          <Image 
            src="/home/trendy.png" 
            alt="Making Trendy" 
            fill 
            priority
            className="object-contain" 
          />
        </div>
      </div>
    </section>
  )
}

export default MakingTrendy