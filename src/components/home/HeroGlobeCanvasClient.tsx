"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate,
  type GeoProjection,
} from "d3-geo";
import { feature } from "topojson-client";

// Animation pacing
const ARC_DRAW_MS  = 3200;           // unchanged
const ARC_HOLD_MS  = 2600;           // +1.6s hold (stays longer on map)
const ARC_FADE_MS  = 900;            // slightly longer fade
const ARC_TOTAL_MS = ARC_DRAW_MS + ARC_HOLD_MS + ARC_FADE_MS;
const ARC_SPAWN_EVERY_MS = 1200;
const MAX_ARCS = 4;

// Visuals (DPR-scaled later)
const LINE_W   = 2.0;
const SHADOW_W = 3.2;
const SHADOW_BLUR = 8;
const GLOW_BLUR   = 4;
const DPR = 1; // Will be updated per-frame

// Visuals
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
  birthMs: number;               // when arc started
  // runtime only (not stored): headT, seg samples computed each frame
};

// Helper functions (module scope - NO React hooks)
function degToRad(d: number) { return (d * Math.PI) / 180; }

function haversineRad(lon1:number, lat1:number, lon2:number, lat2:number) {
  const φ1 = degToRad(lat1), φ2 = degToRad(lat2);
  const Δφ = φ2 - φ1, Δλ = degToRad(lon2 - lon1);
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
  return 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}

// --- visibility helpers -----------------------------------------------
const EPS = 0.06;  // small hysteresis so arcs don't flicker at the rim
function visWeight(dot:number){ // smooth alpha near the horizon
  // dot > 0 is front hemisphere. Blend from -EPS..+EPS
  const t = Math.max(0, Math.min(1, (dot + EPS) / (2*EPS)));
  return t; // 0..1
}

function isPointVisible(projection: any, lon: number, lat: number, eps = 0.06) {
  // Use current projection.rotate() as truth
  const rot = projection.rotate() as [number, number, number];
  const lon0 = -rot[0], lat0 = -rot[1];
  const ang = haversineRad(lon, lat, lon0, lat0);
  return ang <= (Math.PI / 2 + eps);
}

function isArcVisible(projection: any, fromLon: number, fromLat: number, toLon: number, toLat: number, headLon: number, headLat: number) {
  // Check endpoints and head position for visibility
  return isPointVisible(projection, fromLon, fromLat) && 
         isPointVisible(projection, toLon, toLat) && 
         isPointVisible(projection, headLon, headLat);
}

function pickTwoVisibleCities(projection: any, cities: City[]): [City, City] | null {
  const visible = cities.filter(c => isPointVisible(projection, c.lon, c.lat));
  if (visible.length < 2) return null;

  // avoid too-short routes (~> 600km)
  const minAngular = 0.095; // ~ 600km
  let tries = 12;
  while (tries--) {
    const i = Math.floor(Math.random() * visible.length);
    let j = Math.floor(Math.random() * visible.length);
    if (j === i) j = (j + 1) % visible.length;

    const A = visible[i], B = visible[j];
    const λ1 = A.lon * degToRad(1), φ1 = A.lat * degToRad(1);
    const λ2 = B.lon * degToRad(1), φ2 = B.lat * degToRad(1);
    const cosΔ =
      Math.sin(φ1) * Math.sin(φ2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    const clamped = Math.max(-1, Math.min(1, cosΔ));
    const ang = Math.acos(clamped);
    if (ang > minAngular) return [A, B];
  }
  return null;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Sample a great-circle path (already computed per-frame) from 0..t,
 *  and stroke it as a polyline (no dash trick, keeps drawn portion). */
function strokeArcSegment(
  ctx: CanvasRenderingContext2D,
  samples: [number, number][],
  t01: number
) {
  const n = samples.length;
  const k = Math.max(1, Math.min(n - 1, Math.floor(t01 * (n - 1))));
  ctx.beginPath();
  ctx.moveTo(samples[0][0], samples[0][1]);
  for (let i = 1; i <= k; i++) {
    ctx.lineTo(samples[i][0], samples[i][1]);
  }
  ctx.stroke();
}

// Vector math helpers for visibility
function lonLatToVec(lon: number, lat: number) {
  const λ = degToRad(lon), φ = degToRad(lat);
  return {
    x: Math.cos(φ) * Math.cos(λ),
    y: Math.cos(φ) * Math.sin(λ),
    z: Math.sin(φ)
  };
}

function getFrontVector(projection: any) {
  const rot = projection.rotate() as [number, number, number];
  const λ = degToRad(-rot[0]), φ = degToRad(-rot[1]);
  return {
    x: Math.cos(φ) * Math.cos(λ),
    y: Math.cos(φ) * Math.sin(λ),
    z: Math.sin(φ)
  };
}

// Curated capitals across all continents
const CITIES: City[] = [
  // Europe
  { name: "Paris", lon: 2.3522, lat: 48.8566 },
  { name: "London", lon: -0.1276, lat: 51.5074 },
  { name: "Berlin", lon: 13.405, lat: 52.52 },
  { name: "Rome", lon: 12.4964, lat: 41.9028 },
  { name: "Madrid", lon: -3.7038, lat: 40.4168 },
  { name: "Lisbon", lon: -9.1393, lat: 38.7223 },
  { name: "Brussels", lon: 4.3517, lat: 50.8503 },
  { name: "Amsterdam", lon: 4.9041, lat: 52.3676 },
  { name: "Zurich", lon: 8.5417, lat: 47.3769 },
  { name: "Stockholm", lon: 18.0686, lat: 59.3293 },
  { name: "Athens", lon: 23.7275, lat: 37.9838 },
  { name: "Warsaw", lon: 21.0122, lat: 52.2297 },
  { name: "Oslo", lon: 10.7522, lat: 59.9139 },
  { name: "Dublin", lon: -6.2603, lat: 53.3498 },
  { name: "Vienna", lon: 16.3738, lat: 48.2082 },
  { name: "Prague", lon: 14.4378, lat: 50.0755 },
  { name: "Budapest", lon: 19.0402, lat: 47.4979 },
  { name: "Reykjavik", lon: -21.827, lat: 64.1265 },
  // Africa
  { name: "Rabat", lon: -6.8498, lat: 34.0209 },
  { name: "Marrakech", lon: -7.9811, lat: 31.6295 },
  { name: "Cairo", lon: 31.2357, lat: 30.0444 },
  { name: "Lagos", lon: 3.3792, lat: 6.5244 },
  { name: "Nairobi", lon: 36.8219, lat: -1.2921 },
  { name: "Johannesburg", lon: 28.0473, lat: -26.2041 },
  { name: "Tunis", lon: 10.1815, lat: 36.8065 },
  // North America
  { name: "New York", lon: -74.006, lat: 40.7128 },
  { name: "Washington DC", lon: -77.0369, lat: 38.9072 },
  { name: "Toronto", lon: -79.3832, lat: 43.6532 },
  { name: "Mexico City", lon: -99.1332, lat: 19.4326 },
  // South America
  { name: "Bogotá", lon: -74.0721, lat: 4.711 },
  { name: "Lima", lon: -77.0428, lat: -12.0464 },
  { name: "Santiago", lon: -70.6693, lat: -33.4489 },
  { name: "Buenos Aires", lon: -58.3816, lat: -34.6037 },
  { name: "São Paulo", lon: -46.6333, lat: -23.55 },
  { name: "Rio de Janeiro", lon: -43.1729, lat: -22.9068 },
  // Asia
  { name: "Tokyo", lon: 139.6917, lat: 35.6895 },
  { name: "Seoul", lon: 126.978, lat: 37.5665 },
  { name: "Beijing", lon: 116.4074, lat: 39.9042 },
  { name: "Shanghai", lon: 121.4737, lat: 31.2304 },
  { name: "Hong Kong", lon: 114.1095, lat: 22.3964 },
  { name: "Singapore", lon: 103.8198, lat: 1.3521 },
  { name: "Kuala Lumpur", lon: 101.6869, lat: 3.139 },
  { name: "Bangkok", lon: 100.5018, lat: 13.7563 },
  { name: "Jakarta", lon: 106.8456, lat: -6.2088 },
  { name: "Manila", lon: 120.9842, lat: 14.5995 },
  { name: "New Delhi", lon: 77.1025, lat: 28.7041 },
  { name: "Mumbai", lon: 72.8777, lat: 19.076 },
  { name: "Dubai", lon: 55.2708, lat: 25.2048 },
  // Oceania
  { name: "Sydney", lon: 151.2093, lat: -33.8688 },
  { name: "Melbourne", lon: 144.9631, lat: -37.8136 },
  { name: "Auckland", lon: 174.7633, lat: -36.8485 },
];

// Land data (vendored from /public/vendor)
let landGeo: any = null;

// Load world topojson
(async () => {
  try {
    const res = await fetch('/vendor/world-110m.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error(`Failed to load world topo: ${res.status}`);
    const topo = await res.json();
    const land = (topo.objects && (topo.objects.land || topo.objects.countries)) || null;
    if (!land) throw new Error("TopoJSON missing `objects.land` or `objects.countries`");
    landGeo = feature(topo as any, land);
  } catch (e) {
    console.error('[Globe] Failed to load world topojson:', e);
    landGeo = null;
  }
})();

// --- PREMIUM ARC RENDERER (draw only visible segments) -----------------
function drawArcPremiumFrame(ctx:CanvasRenderingContext2D, arc:Arc, now:number, projection: any){
  const age = now - arc.birthMs;
  if (age < 0) return;
  const life = ARC_DRAW_MS + ARC_HOLD_MS + ARC_FADE_MS;
  const tDraw = Math.max(0, Math.min(1, age / ARC_DRAW_MS));          // 0→1 grow
  const tFade = age > (ARC_DRAW_MS + ARC_HOLD_MS)
      ? Math.min(1, (age - ARC_DRAW_MS - ARC_HOLD_MS) / ARC_FADE_MS)
      : 0;

  // Sample the great-circle with current projection (sticks to globe)
  const SAMPLES = 140;
  const pts: {x:number,y:number,alpha:number}[] = [];
  for (let i=0;i<=SAMPLES;i++){
    const u = i / SAMPLES;
    const h = Math.min(u, tDraw);                   // head position while growing
    if (u > h) break;                               // don't exceed growth head
    const p = interpolateGreatCircle(arc.from, arc.to, u); // lon/lat
    const projected = projection([p.lon, p.lat]);
    if (!projected) continue;
    const dot = dotFront(lonLatToVec(p.lon, p.lat), projection); // visibility
    pts.push({ x: projected[0], y: projected[1], alpha: visWeight(dot) * (1 - tFade) });
  }
  if (pts.length < 2) return;

  // Two-pass render (shadow then gold), but split into visible segments
  function strokePass(stroke:(ctx:CanvasRenderingContext2D, a:number)=>void){
    let open = false;
    ctx.beginPath();
    for (let i=0;i<pts.length;i++){
      const a = pts[i].alpha;
      if (a <= 0){
        if (open){ ctx.stroke(); ctx.beginPath(); open=false; }
        continue;
      }
      if (!open){ ctx.moveTo(pts[i].x, pts[i].y); open=true; }
      else       { ctx.lineTo(pts[i].x, pts[i].y); }
      // draw in short runs to apply alpha per segment
      if (i%10===0 || i===pts.length-1){ stroke(ctx, a); ctx.beginPath(); open=false; }
    }
  }
  // shadow
  strokePass((c,a)=>{
    c.save();
    c.strokeStyle = `rgba(0,0,0,${0.45*a})`;
    c.lineWidth = LINE_W*1.6*DPR;
    c.shadowBlur = SHADOW_BLUR*DPR;
    c.shadowColor = "rgba(0,0,0,0.35)";
    c.stroke();
    c.restore();
  });
  // gold gradient
  strokePass((c,a)=>{
    c.save();
    const g = c.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length-1].x, pts[pts.length-1].y);
    g.addColorStop(0, "rgba(255,240,180,"+ (0.85*a) +")");
    g.addColorStop(0.5, "rgba(212,175,55,"+ (0.95*a) +")");
    g.addColorStop(1, "rgba(212,175,55,"+ (0.85*a) +")");
    c.strokeStyle = g;
    c.lineWidth = LINE_W*DPR;
    c.shadowBlur = GLOW_BLUR*DPR;
    c.shadowColor = "rgba(212,175,55,"+ (0.35*a) +")";
    c.stroke();
    c.restore();
  });
}

// --- small utilities used above ---------------------------------------
function dotFront(v:{x:number,y:number,z:number}, projection: any){ 
  const f = getFrontVector(projection); 
  return v.x*f.x + v.y*f.y + v.z*f.z; 
}
function interpolateGreatCircle(a:{lon:number,lat:number}, b:{lon:number,lat:number}, u:number){
  const interp = geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
  const [lon, lat] = interp(u) as [number, number];
  return { lon, lat };
}

export default function HeroGlobeCanvasClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // animation/state refs (NO hooks anywhere else)
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // sizing & DPR state
  const sizeRef = useRef(560);     // CSS square size in px (wrapper controls width)
  const dprRef  = useRef(1);

  // globe rotation
  const lambdaRef = useRef(10);    // longitudinal spin
  const phiRef    = useRef(0);     // fixed latitude = 0

  // arc system (refs, not state)
  const arcsRef = useRef<Arc[]>([]);
  const lastSpawnRef = useRef(0);
  let   nextArcId = 1; // file-local counter is fine inside the component

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1) Sizing & DPR (ResizeObserver)
    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      const cssW = entry.contentRect.width;
      const cssH = entry.contentRect.height;
      const size = Math.max(1, Math.min(cssW, cssH));
      sizeRef.current = size;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      dprRef.current = dpr;

      canvas.width  = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width  = `${size}px`;
      canvas.style.height = `${size}px`;
    });
    ro.observe(canvas);

    // 2) Animation loop (NO hooks in here; refs only)
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - (lastTsRef.current as number);
      lastTsRef.current = ts;

      // sizing
      const size = sizeRef.current;
      const dpr  = dprRef.current;
      const cx = Math.floor((size * dpr) / 2);
      const cy = cx;
      const r  = Math.floor((size * dpr) / 2);

      // clear
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // navy disc (background) + clip
      const grad = ctx.createRadialGradient(cx, cy, r*0.4, cx, cy, r);
      grad.addColorStop(0, "#0F1D35");   // deep navy core
      grad.addColorStop(1, "#1A2E4F");   // brand navy edge
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.clip();

      // rotation (λ horizontal spin only) - Speed = ~5°/s
      const SPEED_LON_DEG_PER_SEC = 5;
      lambdaRef.current = (lambdaRef.current + (SPEED_LON_DEG_PER_SEC * dt) / 1000) % 360;

      // rebuild projection AFTER rotation, BEFORE drawing
      const projection = geoOrthographic()
        .translate([cx, cy])
        .scale(r)
        .rotate([lambdaRef.current, phiRef.current, 0])
        .clipAngle(90);

      const path = geoPath(projection, ctx);

      // continents + graticule (use your existing landGeo & GRAT_10 FeatureCollection)
      if (landGeo) {
        // Solid but subtle continents - no washed-out effect
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        path(landGeo);
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1 * dpr;
        path(landGeo);
        ctx.stroke();
      }
      
      // graticule
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.8 * dpr;
      path(GRAT_10);
      ctx.stroke();

      // arcs (progressive + 3D): rebuild per-frame for glue effect
      // --- arc life-cycle: prune ONLY by time (never by visibility) ----------
      arcsRef.current = arcsRef.current.filter(a => ts - a.birthMs < ARC_TOTAL_MS);

      // spawn new arcs
      if (ts - lastSpawnRef.current > ARC_SPAWN_EVERY_MS && arcsRef.current.length < MAX_ARCS) {
        const pair = pickTwoVisibleCities(projection, CITIES);
        if (pair) {
          arcsRef.current.push({ 
            id: nextArcId++, 
            from: { lon: pair[0].lon, lat: pair[0].lat }, 
            to: { lon: pair[1].lon, lat: pair[1].lat }, 
            birthMs: ts 
          });
          lastSpawnRef.current = ts;
        }
      }

      // draw each arc
      for (const arc of arcsRef.current) {
        // Call drawArcPremiumFrame with the new signature
        drawArcPremiumFrame(ctx, arc, ts, projection);
      }

      // city dots (use your existing CITIES array; cull each with isPointVisible(projection,...))
      ctx.globalAlpha = 1;
      for (const c of CITIES) {
        if (!isPointVisible(projection, c.lon, c.lat)) continue;
        const pt = projection([c.lon, c.lat]) as [number, number] | null;
        if (!pt) continue;
        
        // Gold city dots with subtle glow
        ctx.beginPath();
        ctx.fillStyle = GOLD;
        ctx.shadowColor = "rgba(212,175,55,0.6)";
        ctx.shadowBlur = 4 * dpr;
        ctx.arc(pt[0], pt[1], 3 * dpr, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // end clip
      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    // prime & start
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display:'block', width:'100%', height:'100%', willChange:'transform' }}
    />
  );
}
