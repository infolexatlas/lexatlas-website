import { Star, Quote } from 'lucide-react'

// Function to render stars with half-star support
const renderStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-brand-gold text-brand-gold" />)
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <div key="half-star" className="relative w-5 h-5">
        <Star className="w-5 h-5 text-brand-gold" />
        <div className="absolute inset-0 overflow-hidden">
          <Star className="w-5 h-5 fill-brand-gold text-brand-gold" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      </div>
    )
  }
  
  // Add empty stars to complete 5 stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-brand-gold" />)
  }
  
  return stars
}

const testimonials = [
  {
    name: 'Emily & Julien',
    location: 'France–USA',
    rating: 4.5,
    text: 'LexAtlas made our international marriage process incredibly smooth. The step-by-step guidance gave us confidence throughout the entire journey.',
    avatar: 'EJ',
  },
  {
    name: 'Sophie & James',
    location: 'France–UK',
    rating: 4.5,
    text: 'Professional, comprehensive, and easy to follow. We felt completely prepared for our marriage procedure thanks to LexAtlas.',
    avatar: 'SJ',
  },
  {
    name: 'Marie & Thomas',
    location: 'France–Canada',
    rating: 4.5,
    text: 'Excellent resource for international couples. The clarity and organization of information saved us weeks of research.',
    avatar: 'MT',
  },
]

export function Testimonials() {
  return (
    <section role="region" aria-labelledby="testimonials-title" className="bg-brand-gray py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-reveal">
          <div className="flex items-center justify-center mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-navy to-brand-gold mr-3"></div>
            <h2 id="testimonials-title" className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight">
              What Our Customers Say
            </h2>
          </div>
          <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
            Join hundreds of international couples who have successfully navigated their marriage procedures with LexAtlas.
          </p>
        </div>

        {/* Rating Badge */}
        <div className="text-center mb-12 lg:mb-16 animate-reveal">
          <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-xl2 shadow-soft border border-brand-gray/50">
            <div className="flex items-center space-x-1">
              {renderStars(4.5)}
            </div>
            <span className="text-sm font-medium text-brand-textMuted">
              Trusted by hundreds of couples • Rated 4.5/5
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-reveal rounded-xl2 border-0 bg-white p-8 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 h-full flex flex-col group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <h3 className="font-semibold text-brand-navy text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-brand-textMuted font-medium">
                    {testimonial.location}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-brand-navy to-brand-navyEdge rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-soft">
                  {testimonial.avatar}
                </div>
              </div>
              
              <div className="relative flex-1">
                <Quote className="w-8 h-8 text-brand-gold/30 absolute -top-2 -left-1" />
                <p className="text-brand-textMuted leading-relaxed pl-6 text-base">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
