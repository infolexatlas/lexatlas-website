"use client"
import dynamic from "next/dynamic";

const HeroGlobeCanvasClient = dynamic(() => import("./HeroGlobeCanvasClient"), { ssr: false });

export default function HeroGlobeReal() {
  return (
    <div className="relative mx-auto aspect-square w-[320px] sm:w-[380px] md:w-[480px] lg:w-[560px]">
      {/* simple navy circle fallback while client loads */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(28% #1A2E4F, #223A63)' }} />
      <HeroGlobeCanvasClient />
    </div>
  );
}
