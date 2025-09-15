import Image from 'next/image'
import React from 'react'

const MakingTrendy = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Image src="/home/trendy.png" alt="Making Trendy" fill className="object-contain" />
      </div>
    </section>
  )
}

export default MakingTrendy