import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | LexAtlas',
  description:
    'Read the Terms of Service governing your access to and use of LexAtlas. Includes license, acceptable use, payments, refunds, intellectual property, disclaimers, and contact details.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: August 30, 2025</p>

        <div className="mt-8 space-y-8 text-slate-800 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
            <p className="mt-2">
              These Terms of Service ("Terms") govern your access to and use of the LexAtlas website,
              products, and services (collectively, the "Services"). By accessing or using the Services,
              you agree to be bound by these Terms and our{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-black">Privacy Policy</Link>.
              If you do not agree, do not use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Who We Are</h2>
            <p className="mt-2">
              LexAtlas provides informational guides ("Kits") to help users understand cross-border marriage
              procedures. LexAtlas is not a law firm. The Kits are curated by legal researchers and do not
              constitute legal advice. For specific legal advice, consult a qualified attorney in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Eligibility</h2>
            <p className="mt-2">
              You must be at least 18 years old or the age of majority in your jurisdiction to use the Services.
              By using the Services, you represent and warrant that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Accounts</h2>
            <p className="mt-2">
              If any portion of the Services requires an account, you agree to provide accurate information and
              keep it updated. You are responsible for maintaining the confidentiality of your credentials and
              for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Purchases, Pricing & Taxes</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Prices are displayed in EUR and may change at any time prior to purchase.</li>
              <li>Payments are processed by third-party providers (e.g., Stripe). Your purchase is subject to their terms.</li>
              <li>Applicable taxes may be collected based on your location and local laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Refunds</h2>
            <p className="mt-2">
              Due to the digital and immediately accessible nature of the Kits, purchases are generally
              non-refundable once delivered. If you believe there has been an error with your purchase,
              please contact us at{' '}
              <a href="mailto:contact.lexatlas@gmail.com" className="underline underline-offset-4 hover:text-black">
                contact.lexatlas@gmail.com
              </a>.
              We will review requests in good faith as permitted by applicable consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. License & Use Restrictions</h2>
            <p className="mt-2">
              Upon purchase, LexAtlas grants you a personal, non-exclusive, non-transferable license to access
              and use the purchased Kit(s) for your own personal, non-commercial use. You may not:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Reproduce, distribute, resell, sublicense, or publicly display the Kits;</li>
              <li>Use the Kits to provide a competing service;</li>
              <li>Remove or alter any proprietary notices;</li>
              <li>Use the Services in violation of applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Content Accuracy & Updates</h2>
            <p className="mt-2">
              We strive to keep Kits accurate and current. However, laws and administrative practices change.
              The Services are provided for informational purposes and without any guarantee that they are
              error-free, current, or suitable for your specific circumstances. You are responsible for verifying
              requirements with official sources and competent authorities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Intellectual Property</h2>
            <p className="mt-2">
              The Services, including the Kits, text, graphics, logos, and other materials, are protected by
              intellectual property laws. All rights not expressly granted are reserved by LexAtlas and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. Third-Party Services</h2>
            <p className="mt-2">
              We may integrate with third-party services (e.g., Stripe for payments, Resend for email delivery).
              We are not responsible for third-party services or their terms. Your use of those services is subject
              to their respective policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. Disclaimers</h2>
            <p className="mt-2">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW,
              LEXATLAS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">12. Limitation of Liability</h2>
            <p className="mt-2">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEXATLAS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
              FROM YOUR USE OF THE SERVICES.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">13. Changes to the Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. The "Last updated" date reflects the latest version.
              Your continued use of the Services after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">14. Governing Law</h2>
            <p className="mt-2">
              These Terms are governed by the laws applicable in your country of residence, subject to any
              overriding mandatory consumer protection provisions. Disputes shall be subject to the jurisdiction
              of the competent courts of your habitual residence unless otherwise required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">15. Contact Us</h2>
            <p className="mt-2">
              For questions about these Terms, contact:{' '}
              <a href="mailto:contact.lexatlas@gmail.com" className="underline underline-offset-4 hover:text-black">
                contact.lexatlas@gmail.com
              </a>
            </p>
          </section>

        </div>
      </section>
    </main>
  )
}
