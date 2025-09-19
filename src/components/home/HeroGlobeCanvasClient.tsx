"use client";

import React from "react";
import GlobeCountries from "@/components/GlobeCountries";

export default function HeroGlobeCanvasClient() {
  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container flex items-center justify-center">
      <GlobeCountries />
    </div>
  );
}