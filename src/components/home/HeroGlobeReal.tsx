"use client";

import HeroGlobeCanvasClient from "./HeroGlobeCanvasClient";

export default function HeroGlobeReal() {
  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container">
      {/* simple navy circle fallback while client loads */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(28% #1A2E4F, #223A63)' }} />
      <HeroGlobeCanvasClient />
    </div>
  );
}
