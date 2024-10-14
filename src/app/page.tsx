import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import PricingSection from './components/PricingSection'
import Header from './components/Header'
import Footer from './components/Footer'
import { StatsSection } from './components/StatsSection'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
