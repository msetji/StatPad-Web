import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import StatsStrip from '@/components/StatsStrip';
import AppStoreButton from '@/components/AppStoreButton';
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
      <AppStoreButton />
      <ContactForm />
      <FAQ />
      <Footer />
    </main>
  );
}