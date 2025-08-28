'use client'

import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Sarah & Marco',
    location: 'Italy → Germany',
    rating: 5,
    text: 'The marriage kit saved us weeks of research. Everything was clearly explained and we had our documents ready in no time.',
    avatar: 'SM',
  },
  {
    name: 'Emma & Pierre',
    location: 'France → Canada',
    rating: 5,
    text: 'Professional, comprehensive, and easy to follow. We felt confident throughout the entire process.',
    avatar: 'EP',
  },
  {
    name: 'David & Ana',
    location: 'Spain → Australia',
    rating: 5,
    text: 'Excellent resource for international couples. The step-by-step guidance made everything straightforward.',
    avatar: 'DA',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join hundreds of international couples who have successfully navigated their marriage procedures with LexAtlas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="w-6 h-6 text-blue-200 absolute -top-2 -left-1" />
                <p className="text-gray-700 leading-relaxed pl-4">
                  "{testimonial.text}"
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-gray-50 px-6 py-3 rounded-full">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              4.9/5 from 200+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
