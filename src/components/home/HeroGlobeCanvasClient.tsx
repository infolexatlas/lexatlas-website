"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate,
} from "d3-geo";
import { feature } from "topojson-client";

// Animation settings
const ARC_DRAW_MS = 3200;
const ARC_HOLD_MS = 2600;
const ARC_FADE_MS = 900;
const ARC_TOTAL_MS = ARC_DRAW_MS + ARC_HOLD_MS + ARC_FADE_MS;
const ARC_SPAWN_EVERY_MS = 1200;
const MAX_ARCS = 4;

// Colors
const NAVY_CENTER = "#1A2E4F";
const NAVY_EDGE = "#223A63";
const GOLD = "#D4AF37";

// Cities for arcs
const CITIES = [
  { name: "Paris", lon: 2.3522, lat: 48.8566 },
  { name: "New York", lon: -74.0060, lat: 40.7128 },
  { name: "London", lon: -0.1276, lat: 51.5074 },
  { name: "Tokyo", lon: 139.6917, lat: 35.6895 },
  { name: "Sydney", lon: 151.2093, lat: -33.8688 },
  { name: "São Paulo", lon: -46.6333, lat: -23.5505 },
];

// Types
type City = { name: string; lon: number; lat: number; };
type Arc = {
  id: number;
  from: { lon: number; lat: number };
  to: { lon: number; lat: number };
  birthMs: number;
};

// Helper functions
function degToRad(d: number) { return (d * Math.PI) / 180; }

function sampleArc(arc: Arc, t: number): { lon: number; lat: number } {
  const interp = geoInterpolate([arc.from.lon, arc.from.lat], [arc.to.lon, arc.to.lat]);
  const [lon, lat] = interp(t) as [number, number];
  return { lon, lat };
}

// Load world data function
async function loadWorldData(): Promise<any> {
  try {
    console.log('[Globe] Loading world data...');
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', {
      cache: 'force-cache',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const topo = await res.json();
    const land = (topo.objects && (topo.objects.land || topo.objects.countries)) || null;
    
    if (!land) {
      throw new Error("TopoJSON missing `objects.land` or `objects.countries`");
    }
    
    const geo = feature(topo as any, land);
    console.log('[Globe] World data loaded successfully');
    return geo;
  } catch (e) {
    console.error('[Globe] Failed to load world data:', e);
    throw e;
  }
}

export default function HeroGlobeCanvasClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [landGeo, setLandGeo] = useState<any>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Animation refs
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const arcsRef = useRef<Arc[]>([]);
  const lastSpawnRef = useRef(0);
  const nextArcIdRef = useRef(1);
  const lambdaRef = useRef(10); // rotation

  // Load world data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const geo = await loadWorldData();
        setLandGeo(geo);
        setIsDataLoaded(true);
        console.log('[Globe] Data loaded, starting animation');
      } catch (e) {
        console.error('[Globe] Failed to load world data:', e);
        setLandGeo(null);
        setIsDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDataLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2 - 20;

    // Create projection
    const projection = geoOrthographic()
      .scale(r)
      .translate([cx, cy])
      .clipAngle(90);

    const path = geoPath().projection(projection);
    const graticule = geoGraticule10();

    function spawnArc() {
      if (arcsRef.current.length >= MAX_ARCS) return;
      
      const from = CITIES[Math.floor(Math.random() * CITIES.length)];
      let to: City;
      do {
        to = CITIES[Math.floor(Math.random() * CITIES.length)];
      } while (to === from);

      arcsRef.current.push({
        id: nextArcIdRef.current++,
        from,
        to,
        birthMs: performance.now(),
      });
    }

    function animate(now: number) {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Update rotation
      lambdaRef.current += 0.5; // degrees per frame
      projection.rotate([lambdaRef.current, 0, 0]);

      // Draw background gradient
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, NAVY_CENTER);
      gradient.addColorStop(1, NAVY_EDGE);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw continents
      if (landGeo) {
        try {
          // Fill continents
          ctx.globalAlpha = 1;
          ctx.fillStyle = "rgba(255,255,255,0.2)";
          path(landGeo);
          ctx.fill();
          
          // Stroke continents
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "rgba(255,255,255,0.4)";
          ctx.lineWidth = 1;
          path(landGeo);
          ctx.stroke();
        } catch (e) {
          console.warn('[Globe] Error rendering continents:', e);
        }
      } else {
        // Fallback circle
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw graticule
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 0.5;
      path(graticule);
      ctx.stroke();

      // Spawn new arcs
      if (now - lastSpawnRef.current > ARC_SPAWN_EVERY_MS) {
        spawnArc();
        lastSpawnRef.current = now;
      }

      // Draw arcs
      arcsRef.current = arcsRef.current.filter(arc => {
        const age = now - arc.birthMs;
        if (age > ARC_TOTAL_MS) return false;

        const t = Math.min(age / ARC_DRAW_MS, 1);
        const head = sampleArc(arc, t);
        const headPx = projection([head.lon, head.lat]);
        if (!headPx) return true;

        // Draw arc head
        ctx.globalAlpha = Math.min(1, (ARC_TOTAL_MS - age) / ARC_FADE_MS);
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(headPx[0], headPx[1]);
        ctx.lineTo(headPx[0] + 2, headPx[1] + 2);
        ctx.stroke();

        return true;
      });

      // Draw city dots
      ctx.globalAlpha = 1;
      for (const city of CITIES) {
        const pt = projection([city.lon, city.lat]);
        if (!pt) continue;

        ctx.beginPath();
        ctx.fillStyle = GOLD;
        ctx.shadowColor = "rgba(212,175,55,0.6)";
        ctx.shadowBlur = 4;
        ctx.arc(pt[0], pt[1], 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isDataLoaded, landGeo]);

  if (isLoading) {
    return (
      <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container">
        <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{background:'radial-gradient(28% #1A2E4F, #223A63)'}}>
          <div className="text-white/60 text-sm">Loading globe...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container">
      <canvas
        ref={canvasRef}
        style={{ display:'block', width:'100%', height:'100%', willChange:'transform' }}
      />
    </div>
  );
}