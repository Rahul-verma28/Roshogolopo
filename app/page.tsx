import { HeroSection } from "@/components/home/hero-section"
import { CollectionsSection } from "@/components/home/collections-section"
import { StorySection } from "@/components/home/story-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"
import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import MakingTrendy from "@/components/ui/component/makingTrendy"
import FourPointSection from "@/components/home/four-points"
import TimelessTaste from "@/components/home/timeless-taste"

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "https://roshogolpo.com" }])

  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <HeroSection />
      {/* <MakingTrendy /> */}
      <CollectionsSection />
      <TimelessTaste />
      <FourPointSection />
      <StorySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
