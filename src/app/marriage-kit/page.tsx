import type { Metadata } from 'next'
import Intro from '@/components/la/MarriageKit/Intro'
import HowItWorks from '@/components/la/MarriageKit/HowItWorks'
import CountryForm from '@/components/la/MarriageKit/CountryForm'
import Included from '@/components/la/MarriageKit/Included'
import WhyChoose from '@/components/la/MarriageKit/WhyChoose'
import TrustStrip from '@/components/la/MarriageKit/TrustStrip'
import ClosingCTA from '@/components/la/MarriageKit/ClosingCTA'

export const metadata: Metadata = {
  title: 'International Marriage Kits',
  description: 'Expert-built guides for international marriage. Select two countries to get a tailored PDF with documentation requirements and step-by-step timelines.'
}

export default function MarriageKitPage() {
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


