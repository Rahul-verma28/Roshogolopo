import { HeroSection } from "@/components/home/hero-section";
import { CollectionsSection } from "@/components/home/collections-section";
import { StorySection } from "@/components/home/story-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { StructuredData } from "@/components/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import MakingTrendy from "@/components/ui/component/makingTrendy";
import FourPointSection from "@/components/home/four-points";
import TimelessTaste from "@/components/home/timeless-taste";
import TrustUs from "@/components/home/trust-us";
import CategoryGrid from "@/components/ui/component/CategoryGrid";
import { GuiltFreeRange } from "@/components/home/guilt-free-range";
import { OurStory } from "@/components/home/our-story";
import { OurSpeciality } from "@/components/home/our-speciality";

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://roshogolpo.com" },
  ]);

  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <HeroSection />
      <MakingTrendy />
      <CategoryGrid />
      <FourPointSection />
      <CollectionsSection />
      <OurSpeciality />
      <TimelessTaste />
      <OurStory />
      {/* <StorySection /> */}
      <GuiltFreeRange />
      <TestimonialsSection />
      <TrustUs />
      {/* <CTASection /> */}
    </div>
  );
}
