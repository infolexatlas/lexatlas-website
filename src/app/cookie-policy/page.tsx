import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | LexAtlas',
  description:
    'Learn how LexAtlas uses cookies and similar technologies, what types we use, why we use them, and how you can manage your preferences.',
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: August 30, 2025</p>

        <div className="mt-8 space-y-8 text-slate-800 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold">1. What Are Cookies?</h2>
            <p className="mt-2">
              Cookies are small text files stored on your device by a website. They help websites
              remember your actions and preferences (such as login, language, and display preferences)
              to improve your browsing experience. Similar technologies such as local storage, pixels,
              and tags may also be used and are collectively referred to in this policy as "cookies."
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. How We Use Cookies</h2>
            <p className="mt-2">
              LexAtlas uses cookies to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Enable core site features and security;</li>
              <li>Remember your selections (e.g., forms and UI preferences);</li>
              <li>Measure site performance and usage;</li>
              <li>Facilitate purchases and payment flows;</li>
              <li>Improve our content, products, and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Types of Cookies We Use</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Strictly Necessary Cookies</span> – Required for core functionality
                such as page navigation, security, and session handling. The site cannot function properly without these cookies.
              </li>
              <li>
                <span className="font-medium">Performance & Analytics Cookies</span> – Help us understand how visitors
                interact with our site (e.g., pages viewed, actions taken) so we can improve performance and content.
              </li>
              <li>
                <span className="font-medium">Functionality Cookies</span> – Remember choices you make (such as form inputs or UI preferences)
                to provide a more personalized experience.
              </li>
              <li>
                <span className="font-medium">Payment Cookies</span> – Used by our payment processor to facilitate secure checkout
                and prevent fraud.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Third-Party Cookies & Services</h2>
            <p className="mt-2">
              We may use third-party services that set cookies in order to deliver functionality or analytics:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Analytics (e.g., Plausible)</span> – Privacy-friendly analytics to measure traffic and usage patterns.
                We do not use analytics to collect sensitive personal data.
              </li>
              <li>
                <span className="font-medium">Payments (e.g., Stripe)</span> – To process transactions securely and detect/prevent fraud.
              </li>
              <li>
                <span className="font-medium">Email Delivery (e.g., Resend)</span> – To deliver transactional emails (e.g., sample downloads or receipts).
              </li>
            </ul>
            <p className="mt-2">
              Third-party providers have their own privacy and cookie policies. We recommend reviewing their policies
              for more details on how they handle data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Managing Cookies</h2>
            <p className="mt-2">
              You can manage or disable cookies at any time using your browser settings. Keep in mind that disabling
              certain cookies—especially strictly necessary cookies—may impact site functionality. For more information,
              consult your browser's help pages. Common links:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Chrome: <a className="underline underline-offset-4" href="https://support.google.com/chrome/answer/95647" target="_blank">https://support.google.com/chrome/answer/95647</a></li>
              <li>Firefox: <a className="underline underline-offset-4" href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank">https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer</a></li>
              <li>Safari: <a className="underline underline-offset-4" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471</a></li>
              <li>Edge: <a className="underline underline-offset-4" href="https://support.microsoft.com/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879" target="_blank">https://support.microsoft.com/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Consent</h2>
            <p className="mt-2">
              Where required by law, we request your consent before placing non-essential cookies on your device.
              You can withdraw or modify your consent at any time via your browser settings or any consent tools we provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Updates to This Policy</h2>
            <p className="mt-2">
              We may update this Cookie Policy from time to time to reflect changes in technology, law, or our services.
              The "Last updated" date indicates the most recent changes. Significant updates may be communicated via our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p className="mt-2">
              If you have questions about our use of cookies, contact us at{' '}
              <a href="mailto:contact.lexatlas@gmail.com" className="underline underline-offset-4 hover:text-black">
                contact.lexatlas@gmail.com
              </a>. You can also review our{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-black">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-black">Terms of Service</Link>.
            </p>
          </section>

        </div>
      </section>
    </main>
  )
}
