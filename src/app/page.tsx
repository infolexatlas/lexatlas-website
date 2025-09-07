import Hero from '@/components/home/hero'
import HowItWorksSection from '@/components/la/Landing/HowItWorks'
import Benefits from '@/components/la/Landing/Benefits'
import Preview from '@/components/la/Landing/Preview'
import Trust from '@/components/la/Landing/Trust'
import FAQExtract from '@/components/la/Landing/FAQExtract'
import { KitSampleCTA } from '@/components/la/Kit/KitSampleCTA'
import ClosingCTA from '@/components/la/Landing/ClosingCTA'
import { devLog } from '@/lib/devLog'

export default function HomePage() {
  devLog('home:render:start');
  
  return (
    <div className="">
      {/* Hero (untouched) */}
      <Hero />

      {/* Premium landing flow */}
      <HowItWorksSection />
      <Benefits />
      <Preview />
      <Trust />
      <KitSampleCTA compact />
      <FAQExtract />
      <ClosingCTA />
    </div>
  )
  
  devLog('home:render:done');
}
 
