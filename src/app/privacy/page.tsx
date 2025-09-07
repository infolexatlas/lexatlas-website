import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | LexAtlas',
  description:
    'Learn how LexAtlas collects, uses, stores, and protects your data. GDPR-ready policy including legal basis, retention, international transfers, and your rights.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: August 30, 2025</p>

        <div className="mt-8 space-y-8 text-slate-800 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Make a purchase of a marriage kit</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
              <li>Complete forms on our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p className="mt-2">We use the information we collect to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Process purchases and provide access to legal kits (<em>contractual necessity</em>)</li>
              <li>Send important updates about your purchases (<em>contractual necessity</em>)</li>
              <li>Provide customer support (<em>legitimate interest</em>)</li>
              <li>Send marketing communications when you have given consent (<em>consent</em>)</li>
              <li>Improve our services and website (<em>legitimate interest</em>)</li>
              <li>Comply with legal obligations (<em>legal obligation</em>)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Information Sharing</h2>
            <p className="mt-2">
              We do not sell or rent your personal information. We may share it only:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>With service providers (e.g., Stripe for payment processing, Resend for transactional emails)</li>
              <li>To comply with legal requirements or court orders</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. International Data Transfers</h2>
            <p className="mt-2">
              Some of our providers (e.g., Stripe, Resend) process data outside the European Economic Area (EEA).
              In such cases, appropriate safeguards are applied, such as the use of Standard Contractual Clauses
              approved by the European Commission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Data Retention</h2>
            <p className="mt-2">We keep your personal information only for as long as necessary:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Purchases: kept as long as required by tax and accounting obligations</li>
              <li>Newsletter: kept until you unsubscribe</li>
              <li>Support requests: kept until resolved, or for a reasonable follow-up period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Cookies</h2>
            <p className="mt-2">
              We use cookies and similar technologies to improve your browsing experience. For details,
              please see our{' '}
              <Link href="/cookie-policy" className="text-slate-900 underline underline-offset-4 hover:text-black">
                Cookie Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Your Rights</h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw your consent at any time (e.g., for marketing emails)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p className="mt-2">
              If you have any questions or requests about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:contact.lexatlas@gmail.com" className="text-slate-900 underline underline-offset-4 hover:text-black">
                contact.lexatlas@gmail.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
