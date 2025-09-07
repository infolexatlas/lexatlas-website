import { Search, FileText, Download, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    icon: Search,
    title: 'Choose Your Kit',
    description: 'Select the marriage kit for your specific country pair from our comprehensive collection.',
    step: '1'
  },
  {
    icon: FileText,
    title: 'Get Expert Guidance',
    description: 'Access detailed procedures, document requirements, and legal guidance tailored to your situation.',
    step: '2'
  },
  {
    icon: Download,
    title: 'Instant Download',
    description: 'Download your comprehensive PDF guide immediately after secure payment processing.',
    step: '3'
  },
  {
    icon: CheckCircle,
    title: 'Follow & Complete',
    description: 'Use our step-by-step instructions to successfully complete your marriage procedure.',
    step: '4'
  }
]

export function HowItWorks() {
  return (
    <section className="bg-brand-gray py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-reveal">
          <div className="flex items-center justify-center mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-navy to-brand-gold mr-3"></div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight">
              How It Works
            </h2>
          </div>
          <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
            Get your cross-border marriage kit in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div key={step.step} className="animate-reveal" style={{ animationDelay: `${index * 0.15}s` }}>
              <Card className="relative h-full min-h-[280px] border-0 bg-white rounded-xl2 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-navy to-brand-navyEdge text-white rounded-full flex items-center justify-center text-sm font-bold shadow-soft">
                    {step.step}
                  </div>
                </div>
                <CardHeader className="text-center pt-10">
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-brand-gold/20 to-brand-softGold/20 rounded-xl2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-250">
                    <step.icon className="h-7 w-7 text-brand-gold" />
                  </div>
                  <CardTitle className="text-xl font-serif text-brand-navy font-bold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-brand-textMuted leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
