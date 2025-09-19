"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate,
  type GeoProjection,
} from "d3-geo";
import { feature } from "topojson-client";

// Animation pacing
const ARC_DRAW_MS  = 3200;
const ARC_HOLD_MS  = 2600;
const ARC_FADE_MS  = 900;
const ARC_TOTAL_MS = ARC_DRAW_MS + ARC_HOLD_MS + ARC_FADE_MS;
const ARC_SPAWN_EVERY_MS = 1200;
const MAX_ARCS = 4;

// Visuals
const LINE_W   = 2.0;
const SHADOW_W = 3.2;
const SHADOW_BLUR = 8;
const GLOW_BLUR   = 4;

// Colors
const NAVY_CENTER = "#1A2E4F";
const NAVY_EDGE = "#223A63";
const GOLD = "#D4AF37";

// Fixed 10° meridians/parallels
const GRAT_10 = geoGraticule10();

// Types
export type City = { name: string; lon: number; lat: number; };
export type Arc = {
  id: number;
  from: { lon:number; lat:number };
  to:   { lon:number; lat:number };
  birthMs: number;
};

// Helper functions
function degToRad(d: number) { return (d * Math.PI) / 180; }

function haversineRad(lon1:number, lat1:number, lon2:number, lat2:number) {
  const φ1 = degToRad(lat1), φ2 = degToRad(lat2);
  const Δφ = φ2 - φ1, Δλ = degToRad(lon2 - lon1);
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  return 2 * Math.asin(Math.sqrt(a));
}

function sampleArc(arc: Arc, t: number): { lon: number; lat: number } {
  const interp = geoInterpolate([arc.from.lon, arc.from.lat], [arc.to.lon, arc.to.lat]);
  const [lon, lat] = interp(t) as [number, number];
  return { lon, lat };
}

// Function to load world data
async function loadWorldData(retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`[Globe] Loading world data, attempt ${i + 1}/${retries}`);
      const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', { 
        cache: 'force-cache',
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      
      const topo = await res.json();
      const land = (topo.objects && (topo.objects.land || topo.objects.countries)) || null;
      if (!land) throw new Error("TopoJSON missing `objects.land` or `objects.countries`");
      
      const geo = feature(topo as any, land);
      console.log('[Globe] Successfully loaded world data');
      return geo;
    } catch (e) {
      console.warn(`[Globe] Attempt ${i + 1} failed:`, e);
      if (i === retries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

export default function HeroGlobeCanvasClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [landGeo, setLandGeo] = useState<any>(null);

  // Load world data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('[Globe] Starting to load world data...');
        const geo = await loadWorldData();
        setLandGeo(geo);
        setIsDataLoaded(true);
        console.log('[Globe] World data loaded successfully');
      } catch (e) {
        console.error('[Globe] Failed to load world data:', e);
        setLandGeo(null);
        setIsDataLoaded(true);
      }
    };

    loadData();
  }, []);

  // Animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDataLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
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

    // Cities for arcs
    const cities: City[] = [
      { name: "Paris", lon: 2.3522, lat: 48.8566 },
      { name: "New York", lon: -74.0060, lat: 40.7128 },
      { name: "London", lon: -0.1276, lat: 51.5074 },
      { name: "Tokyo", lon: 139.6917, lat: 35.6895 },
      { name: "Sydney", lon: 151.2093, lat: -33.8688 },
      { name: "São Paulo", lon: -46.6333, lat: -23.5505 },
    ];

    let arcs: Arc[] = [];
    let nextArcId = 0;
    let lastSpawnMs = 0;

    function spawnArc() {
      if (arcs.length >= MAX_ARCS) return;
      
      const from = cities[Math.floor(Math.random() * cities.length)];
      let to: City;
      do {
        to = cities[Math.floor(Math.random() * cities.length)];
      } while (to === from);

      arcs.push({
        id: nextArcId++,
        from,
        to,
        birthMs: performance.now(),
      });
    }

    function animate(now: number) {
      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Draw background gradient
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, NAVY_CENTER);
      gradient.addColorStop(1, NAVY_EDGE);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw continents
      if (landGeo) {
        try {
          ctx.globalAlpha = 1;
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          path(landGeo);
          ctx.fill();
          
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "rgba(255,255,255,0.25)";
          ctx.lineWidth = 1 * dpr;
          path(landGeo);
          ctx.stroke();
        } catch (e) {
          console.warn('[Globe] Error rendering continents:', e);
        }
      } else {
        // Fallback: draw a simple circle
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.95, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      }

      // Draw graticule
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 0.5 * dpr;
      path(GRAT_10);
      ctx.stroke();

      // Spawn new arcs
      if (now - lastSpawnMs > ARC_SPAWN_EVERY_MS) {
        spawnArc();
        lastSpawnMs = now;
      }

      // Draw arcs
      arcs = arcs.filter(arc => {
        const age = now - arc.birthMs;
        if (age > ARC_TOTAL_MS) return false;

        const t = Math.min(age / ARC_DRAW_MS, 1);
        const head = sampleArc(arc, t);
        const headPx = projection([head.lon, head.lat]);
        if (!headPx) return true;

        // Draw arc
        ctx.globalAlpha = Math.min(1, (ARC_TOTAL_MS - age) / ARC_FADE_MS);
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = LINE_W * dpr;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(headPx[0], headPx[1]);
        ctx.lineTo(headPx[0] + 2, headPx[1] + 2);
        ctx.stroke();

        return true;
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      // Cleanup if needed
    };
  }, [isDataLoaded, landGeo]);

  if (!isDataLoaded) {
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