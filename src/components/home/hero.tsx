import Link from "next/link";
import HeroGlobeReal from "@/components/home/HeroGlobeReal";

export default function Hero() {
  return (
    <section className="relative bg-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: copy + CTAs */}
          <div className="animate-reveal">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 bg-brand-gold rounded-full mr-3"></div>
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
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-xl2 bg-brand-navy px-6 py-3 text-white shadow-soft hover:scale-105 hover:shadow-premium hover:border hover:border-brand-gold transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                View Pricing →
              </Link>
              <Link
                href="/kits"
                className="inline-flex items-center rounded-xl2 border border-brand-navy px-6 py-3 text-brand-navy bg-white shadow-soft hover:scale-105 hover:shadow-premium hover:border-brand-gold transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                Browse Kits
              </Link>
            </div>
          </div>

          {/* RIGHT: premium globe */}
          <div className="relative mx-auto aspect-square w-[320px] sm:w-[380px] md:w-[480px] lg:w-[560px] animate-reveal">
            <HeroGlobeReal />
          </div>
        </div>
      </div>
    </section>
  );
}


