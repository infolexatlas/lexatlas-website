import type { Metadata } from 'next'
import Intro from '@/components/la/MarriageKit/Intro'
import HowItWorks from '@/components/la/MarriageKit/HowItWorks'
import CountryForm from '@/components/la/MarriageKit/CountryForm'
import Included from '@/components/la/MarriageKit/Included'
import WhyChoose from '@/components/la/MarriageKit/WhyChoose'
import TrustStrip from '@/components/la/MarriageKit/TrustStrip'
import ClosingCTA from '@/components/la/MarriageKit/ClosingCTA'

export const metadata: Metadata = {
  title: 'International Marriage Kits | LexAtlas',
  description: 'Get comprehensive guides for international marriage procedures between any two countries. Expert-built PDF guides with step-by-step instructions.',
  openGraph: {
    title: 'International Marriage Kits | LexAtlas',
    description: 'Get comprehensive guides for international marriage procedures between any two countries.',
    images: [
      {
        url: '/og/kits.svg',
        width: 1200,
        height: 630,
        alt: 'International Marriage Kits'
      }
    ]
  }
}

export default function MarriageKitLandingPage() {
  return (
    <main>
      <Intro />
      <HowItWorks />
      <CountryForm />
      <Included />
      <WhyChoose />
      <TrustStrip />
      <ClosingCTA />
    </main>
  )
}
