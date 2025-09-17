import Link from "next/link";
import HeroGlobeReal from "@/components/home/HeroGlobeReal";
import { ScrollAnimation, HoverAnimation } from "@/components/ui/animations";

export default function Hero() {
  return (
    <section className="relative bg-transparent py-20 lg:py-28 w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: copy + CTAs */}
          <ScrollAnimation>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-brand-gold rounded-full mr-3 animate-pulse"></div>
                <span className="text-brand-textMuted text-sm font-medium">Premium International Solutions</span>
              </div>
              
              <h1 className="font-serif text-4xl/tight sm:text-5xl/tight md:text-6xl/tight text-brand-navy max-w-2xl font-bold tracking-tight">
                Cross-Border
                <br />
                Marriage Kits, <span className="md:whitespace-nowrap text-brand-gold">Done Right.</span>
              </h1>
              <p className="mt-6 max-w-xl text-brand-textMuted text-lg leading-relaxed">
                Save time and avoid costly mistakes. Expertly curated checklists, forms & templates.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <HoverAnimation>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center rounded-xl2 bg-brand-navy px-6 py-3 text-white shadow-soft hover:shadow-premium hover:border hover:border-brand-gold transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  >
                    View Pricing →
                  </Link>
                </HoverAnimation>
                <HoverAnimation>
                  <Link
                    href="/kits"
                    className="inline-flex items-center rounded-xl2 border border-brand-navy px-6 py-3 text-brand-navy bg-white shadow-soft hover:shadow-premium hover:border-brand-gold transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  >
                    Browse Kits
                  </Link>
                </HoverAnimation>
              </div>
            </div>
          </ScrollAnimation>

          {/* RIGHT: premium globe */}
          <ScrollAnimation variant={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } } }}>
            <section id="hero-globe" data-testid="hero-globe-client" className="relative mx-auto flex justify-center items-center">
              <HeroGlobeReal />
            </section>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}


