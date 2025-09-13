export const CTASticky = () => {
  return (
    <section style={{ 
      padding: '80px 0', 
      backgroundColor: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        textAlign: 'center'
      }}>
        
        {/* Subtitle */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#D4AF37', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            Ready to Get Started?
          </span>
        </div>

        {/* Main Title */}
        <h2 style={{ 
          fontSize: '48px', 
          fontFamily: 'serif', 
          fontWeight: 'bold', 
          color: '#1A2E4F', 
          marginBottom: '24px',
          lineHeight: '1.1'
        }}>
          Your Cross-Border Marriage Journey Starts Here
        </h2>

        {/* Description */}
        <p style={{ 
          fontSize: '20px', 
          color: '#6B7280', 
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Join more than 200 international couples who have successfully navigated their legal requirements with confidence. 
          Get your comprehensive guide today and take the first step towards your future together.
        </p>

        {/* CTA Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          
          {/* Explore Legal Kits Button - Style bleu */}
          <a 
            href="/kits"
            className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 bg-brand-navy text-white font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
          >
            Browse kits
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Contact Our Team Button - Style standard du site */}
          <a 
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
          >
            Contact our team
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-brand-gold mb-2">10</div>
              <div className="text-sm text-brand-textMuted">Countries Covered</div>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-brand-gold mb-2">247</div>
              <div className="text-sm text-brand-textMuted">Couples Helped</div>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-brand-gold mb-2">24/7</div>
              <div className="text-sm text-brand-textMuted">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}