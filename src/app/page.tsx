import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import PricingSection from './components/PricingSection'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      {/* Other components */}
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
      {/* Other components */}
    </main>
  )
}