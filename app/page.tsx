import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import AppPreview from '@/components/AppPreview'
import HowItWorks from '@/components/HowItWorks'
import UseCases from '@/components/UseCases'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AppPreview />
      <HowItWorks />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  )
}
