"use client";

import React from "react";
import ResponsiveGlobe from "@/components/ui/ResponsiveGlobe";

export default function HeroGlobeCanvasClient() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-visible">
      <ResponsiveGlobe />
    </div>
  );
}