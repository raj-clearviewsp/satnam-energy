import StorytellingHero from '@/components/home/StorytellingHero';
import EnergyGrowthScatter from '@/components/home/EnergyGrowthScatter';
import GenerationMixGlobe from '@/components/home/GenerationMixGlobe';
import EnergySecurityQuadrant from '@/components/home/EnergySecurityQuadrant';
import CountryDashboard from '@/components/home/CountryDashboard';
import CaseStudyCarousel from '@/components/home/CaseStudyCarousel';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <main>
      <StorytellingHero />
      <EnergyGrowthScatter />
      <GenerationMixGlobe />
      <EnergySecurityQuadrant />
      <CountryDashboard />
      <CaseStudyCarousel />
      <CallToAction />
    </main>
  );
}
