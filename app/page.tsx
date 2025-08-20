import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import StatsStrip from '@/components/StatsStrip';
import WaitlistForm from '@/components/WaitlistForm';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <NavBar />
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