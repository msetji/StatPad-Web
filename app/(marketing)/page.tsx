import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import StatsStrip from '@/components/StatsStrip';
import WaitlistForm from '@/components/WaitlistForm';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function MarketingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <FeatureCards />
      <ScreenshotCarousel />
      <StatsStrip />
      <WaitlistForm />
      <ContactForm />
      <FAQ />
      <Footer />
    </main>
  );
}