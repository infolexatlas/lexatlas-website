import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - LexAtlas',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Create an account or make a purchase</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Complete forms on our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Process your purchases and provide access to legal kits</li>
                  <li>Send you important updates about your purchases</li>
                  <li>Provide customer support</li>
                  <li>Improve our services and website</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>To process payments through Stripe</li>
                  <li>To comply with legal requirements</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  4. Data Security
                </h2>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  5. Your Rights
                </h2>
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-brand-deep mb-4">
                  6. Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:contact.lexatlas@gmail.com" className="text-brand-gold hover:underline">
                    contact.lexatlas@gmail.com
                  </a>
                </p>
              </section>
            </div>
                      </div>
          </div>
      </div>
    </div>
  )
}
