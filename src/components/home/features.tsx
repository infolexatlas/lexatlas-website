import { Shield, FileText, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Shield,
    title: 'Trusted Guidance',
    description: 'Expert legal guidance crafted by international law specialists with decades of experience.',
  },
  {
    icon: FileText,
    title: 'Actionable Templates',
    description: 'Ready-to-use document templates and checklists that save you hours of research.',
  },
  {
    icon: Globe,
    title: 'Country-Specific',
    description: 'Tailored content for each country\'s unique legal requirements and procedures.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-4">
            Why Choose LexAtlas?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive legal kits provide everything you need to navigate 
            international procedures with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <CardTitle className="text-xl font-serif text-brand-deep">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
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
