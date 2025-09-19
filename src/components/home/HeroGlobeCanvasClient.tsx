"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SimpleGlobe from "@/components/SimpleGlobe";

// Try to load react-globe.gl, fallback to SimpleGlobe if it fails
const GlobeCountries = dynamic(() => import("@/components/GlobeCountries"), {
  ssr: false,
  loading: () => <SimpleGlobe />,
});

export default function HeroGlobeCanvasClient() {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Check if we should use fallback after a delay
    const timer = setTimeout(() => {
      setUseFallback(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container flex items-center justify-center">
      {useFallback ? <SimpleGlobe /> : <GlobeCountries />}
    </div>
  );
}