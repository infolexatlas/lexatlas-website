'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';

const NAVY = '#1A2E4F';
const NAVY_EDGE = '#223A63';
const GOLD = '#D4AF37';

// --- Premium pacing ---
const ARC_DRAW_MS   = 3000;
const ARC_HOLD_MS   = 1400;
const ARC_FADE_MS   = 800;
const ARC_TOTAL_MS  = ARC_DRAW_MS + ARC_HOLD_MS + ARC_FADE_MS;

const MAX_ARCS = 4;
const ARC_SPAWN_EVERY_MS = 1200;

type City = { name: string; lon: number; lat: number };

type Arc = {
  id: number;
  from: City;
  to: City;
  birthMs: number;
};

const CITIES: City[] = [
  // Europe
  { name: 'Paris', lon: 2.3522, lat: 48.8566 }, { name: 'London', lon: -0.1276, lat: 51.5072 },
  { name: 'Berlin', lon: 13.4050, lat: 52.5200 }, { name: 'Rome', lon: 12.4964, lat: 41.9028 },
  { name: 'Madrid', lon: -3.7038, lat: 40.4168 }, { name: 'Lisbon', lon: -9.1393, lat: 38.7223 },
  { name: 'Brussels', lon: 4.3517, lat: 50.8503 }, { name: 'Amsterdam', lon: 4.9041, lat: 52.3676 },
  { name: 'Zurich', lon: 8.5417, lat: 47.3769 }, { name: 'Stockholm', lon: 18.0632, lat: 59.3340 },
  { name: 'Athens', lon: 23.7275, lat: 37.9838 }, { name: 'Warsaw', lon: 21.0122, lat: 52.2297 },
  { name: 'Oslo', lon: 10.7522, lat: 59.9139 }, { name: 'Dublin', lon: -6.2603, lat: 53.3498 },
  { name: 'Vienna', lon: 16.3738, lat: 48.2082 }, { name: 'Prague', lon: 14.4378, lat: 50.0755 },
  { name: 'Budapest', lon: 19.0402, lat: 47.4979 }, { name: 'Reykjavik', lon: -21.9426, lat: 64.1466 },
  // Africa
  { name: 'Rabat', lon: -6.8498, lat: 34.0209 }, { name: 'Marrakech', lon: -7.9811, lat: 31.6295 },
  { name: 'Cairo', lon: 31.2357, lat: 30.0444 }, { name: 'Lagos', lon: 3.3792, lat: 6.5244 },
  { name: 'Nairobi', lon: 36.8219, lat: -1.2921 }, { name: 'Johannesburg', lon: 28.0473, lat: -26.2041 },
  { name: 'Tunis', lon: 10.1815, lat: 36.8065 },
  // North America
  { name: 'New York', lon: -74.0060, lat: 40.7128 }, { name: 'Washington DC', lon: -77.0369, lat: 38.9072 },
  { name: 'Toronto', lon: -79.3832, lat: 43.6532 }, { name: 'Mexico City', lon: -99.1332, lat: 19.4326 },
  // South America
  { name: 'Bogota', lon: -74.0721, lat: 4.7110 }, { name: 'Lima', lon: -77.0428, lat: -12.0464 },
  { name: 'Santiago', lon: -70.6693, lat: -33.4489 }, { name: 'Buenos Aires', lon: -58.3816, lat: -34.6037 },
  { name: 'Sao Paulo', lon: -46.6333, lat: -23.5505 }, { name: 'Rio de Janeiro', lon: -43.1729, lat: -22.9068 },
  // Asia
  { name: 'Tokyo', lon: 139.6917, lat: 35.6895 }, { name: 'Seoul', lon: 126.9780, lat: 37.5665 },
  { name: 'Beijing', lon: 116.4074, lat: 39.9042 }, { name: 'Shanghai', lon: 121.4737, lat: 31.2304 },
  { name: 'Hong Kong', lon: 114.1694, lat: 22.3193 }, { name: 'Singapore', lon: 103.8198, lat: 1.3521 },
  { name: 'Kuala Lumpur', lon: 101.6869, lat: 3.1390 }, { name: 'Bangkok', lon: 100.5018, lat: 13.7563 },
  { name: 'Jakarta', lon: 106.8456, lat: -6.2088 }, { name: 'Manila', lon: 120.9842, lat: 14.5995 },
  { name: 'New Delhi', lon: 77.2090, lat: 28.6139 }, { name: 'Mumbai', lon: 72.8777, lat: 19.0760 },
  { name: 'Dubai', lon: 55.2708, lat: 25.2048 },
  // Oceania
  { name: 'Sydney', lon: 151.2093, lat: -33.8688 }, { name: 'Melbourne', lon: 144.9631, lat: -37.8136 },
  { name: 'Auckland', lon: 174.7633, lat: -36.8485 },
];

function rad(deg: number) { return (deg * Math.PI) / 180; }
function deg(rad: number) { return (rad * 180) / Math.PI; }

function angularDistance(lon1: number, lat1: number, lon2: number, lat2: number) {
  // Haversine on unit sphere
  const φ1 = rad(lat1), φ2 = rad(lat2);
  const Δφ = rad(lat2 - lat1);
  const Δλ = rad(lon2 - lon1);
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Great-circle sampling in GEO space → project each frame
function createPathForArc(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  from: { lon: number; lat: number },
  to: { lon: number; lat: number },
  samples: number = 64
): { path: Path2D; lengthPx: number; startXY: {x:number,y:number}; endXY: {x:number,y:number} } {
  const interp = d3.geoInterpolate([from.lon, from.lat], [to.lon, to.lat]);
  const p = new Path2D();
  let prev: [number, number] | null = null;
  let lengthPx = 0;

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const [lon, lat] = interp(t);
    const proj = projection([lon, lat]);
    if (!proj) continue;
    const [x, y] = proj;
    if (i === 0) p.moveTo(x, y); else {
      p.lineTo(x, y);
      if (prev) {
        const dx = x - prev[0];
        const dy = y - prev[1];
        lengthPx += Math.hypot(dx, dy);
      }
    }
    prev = [x, y];
  }

  // start/end screen-space points (for gradient direction)
  const startProj = projection([from.lon, from.lat])!;
  const endProj   = projection([to.lon, to.lat])!;
  return { path: p, lengthPx, startXY: {x:startProj[0], y:startProj[1]}, endXY: {x:endProj[0], y:endProj[1]} };
}

function isPointVisible(projection: d3.GeoProjection, lon: number, lat: number): boolean {
  // Front-hemisphere culling via angular distance to current center (from rotate())
  const rot = projection.rotate() as [number, number, number];
  const centerLon = -rot[0] * (Math.PI/180);
  const centerLat = -rot[1] * (Math.PI/180);
  const λ = lon * (Math.PI/180);
  const φ = lat * (Math.PI/180);
  const cosΔ = Math.sin(centerLat)*Math.sin(φ) + Math.cos(centerLat)*Math.cos(φ)*Math.cos(λ - centerLon);
  // cosΔ > 0 → front hemisphere
  return cosΔ > 0.0005;
}

function isArcVisible(projection: d3.GeoProjection, a: Arc): boolean {
  // Check endpoints and a midpoint
  const midLon = (a.from.lon + a.to.lon) / 2;
  const midLat = (a.from.lat + a.to.lat) / 2;
  return (
    isPointVisible(projection, a.from.lon, a.from.lat) &&
    isPointVisible(projection, a.to.lon, a.to.lat) &&
    isPointVisible(projection, midLon, midLat)
  );
}

// Premium gold gradient
function createGoldGradient(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0.00, 'rgba(212,175,55,0.90)');
  g.addColorStop(0.50, 'rgba(255,240,180,1.00)');
  g.addColorStop(1.00, 'rgba(212,175,55,0.92)');
  return g;
}

// Arc drawing constants
const ARC_WIDTH_MAIN   = 2.0;
const ARC_WIDTH_SHADOW = ARC_WIDTH_MAIN + 1.2;
const ARC_SHADOW_BLUR  = 8;
const ARC_GLOW_BLUR    = 4;
const GOLD_GLOW_RGBA   = 'rgba(212,175,55,0.60)';
const SHADOW_RGBA      = 'rgba(0,0,0,0.45)';

function drawArcPremiumFrame(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  a: Arc,
  nowMs: number,
  dpr: number
) {
  const tMs = nowMs - a.birthMs;
  if (tMs > ARC_TOTAL_MS) return; // expired

  // Visibility before work
  if (!isArcVisible(projection, a)) return;

  // Rebuild path in SCREEN space for current projection rotation
  const { path, lengthPx, startXY, endXY } = createPathForArc(ctx, projection, a.from, a.to);

  // Phase
  const drawEnd = ARC_DRAW_MS;
  const holdEnd = ARC_DRAW_MS + ARC_HOLD_MS;
  const fadeEnd = ARC_TOTAL_MS;

  let visibleLen = 0;
  let alpha = 1;

  if (tMs <= drawEnd) {
    const p = Math.max(0, Math.min(1, tMs / ARC_DRAW_MS));
    visibleLen = lengthPx * p;
  } else if (tMs <= holdEnd) {
    visibleLen = lengthPx;
  } else if (tMs <= fadeEnd) {
    visibleLen = lengthPx;
    const pf = (tMs - holdEnd) / ARC_FADE_MS;
    alpha = Math.max(0, 1 - pf);
  } else {
    return;
  }

  // Progressive reveal via dash
  ctx.setLineDash([lengthPx, lengthPx]);
  ctx.lineDashOffset = lengthPx - visibleLen;

  // Pass 1: shadow under-stroke (depth)
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = SHADOW_RGBA;
  ctx.lineWidth = ARC_WIDTH_SHADOW * dpr;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = SHADOW_RGBA;
  ctx.shadowBlur = ARC_SHADOW_BLUR * dpr;
  ctx.stroke(path);
  ctx.restore();

  // Pass 2: gold gradient with soft glow
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineWidth = ARC_WIDTH_MAIN * dpr;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = GOLD_GLOW_RGBA;
  ctx.shadowBlur = ARC_GLOW_BLUR * dpr;
  ctx.strokeStyle = createGoldGradient(ctx, startXY.x, startXY.y, endXY.x, endXY.y);
  ctx.stroke(path);
  ctx.restore();

  // cleanup
  ctx.setLineDash([]);
  ctx.lineDashOffset = 0;
}

// Helper to pick two distinct visible cities
function pickTwoVisibleCities(visibleCities: City[]): { a: City; b: City } | null {
  if (visibleCities.length < 2) return null;
  
  // Pick first city
  const a = visibleCities[Math.floor(Math.random() * visibleCities.length)];
  
  // Pick second city (different from first)
  const others = visibleCities.filter(c => c.name !== a.name);
  if (others.length === 0) return null;
  
  const b = others[Math.floor(Math.random() * others.length)];
  
  // Avoid too-short routes (minimum angular distance)
  const distance = angularDistance(a.lon, a.lat, b.lon, b.lat);
  if (distance < 0.3) return null; // too close
  
  return { a, b };
}

export default function HeroGlobeClient() {
  // juste avant le return (ou là où tu définis la taille)
  const SIZE = 560;               // taille logique du viewBox
  const r = SIZE / 2;             // rayon = 280
  
  // AFTER (animate LONGITUDE λ, keep latitude fixed)
  const BASE_LAMBDA = 10;          // keep centered near Europe/Africa
  const BASE_PHI    = 0;           // no up/down tilt
  const BASE_GAMMA  = 0;           // no roll
  const SPEED_LON_DEG_PER_SEC = 5;   // au lieu de 3 → rotation un peu plus rapide, plus fluide

  const [arcs, setArcs] = useState<Arc[]>([]);
  const idRef   = useRef(1);
  const lambdaRef = useRef(BASE_LAMBDA);       // animated LONGITUDE (λ)
  const lastTs  = useRef<number | null>(null);
  const lastSpawn = useRef<number>(0);

  // NEW: hold land + graticule path strings (so continents render every frame)
  const [landPath, setLandPath]       = useState<string>('');
  const [graticulePath, setGraticulePath] = useState<string>('');
  const landRef = useRef<d3.GeoPermissibleObjects | null>(null);
  const graticule = d3.geoGraticule10();

  const projection = useMemo(() => d3.geoOrthographic().translate([r, r]).scale(r), [r]);

  // Load Natural Earth land once on the client (keep SSR safe)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // Load vendored topojson from /public/vendor
        const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', { cache: 'force-cache' });
        if (!res.ok) throw new Error(`Failed to load world topo: ${res.status}`);
        const topo = await res.json();
        // land object is usually at topo.objects.land for 110m
        const land = (topo.objects && (topo.objects.land || topo.objects.countries)) || null;
        if (!land) throw new Error("TopoJSON missing `objects.land` or `objects.countries`");
        const landFeature = feature(topo as any, land);
        if (!alive) return;
        landRef.current = landFeature as d3.GeoPermissibleObjects;
      } catch (e) {
        console.error('[HeroGlobe] Failed to load world topojson:', e);
        landRef.current = null; // fail gracefully (dots/arcs still render)
      }
    })();
    return () => { alive = false; };
  }, []);

  // Motion loop
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      // reduced motion: freeze rotation but still render once
      projection.rotate([BASE_LAMBDA, BASE_PHI, BASE_GAMMA]);
      const path = d3.geoPath(projection as any);
      if (landRef.current) setLandPath(path(landRef.current) ?? '');
      setGraticulePath(path(graticule) ?? '');
      return;
    }

    const tick = (now: number) => {
      // 1) update rotation (longitude spin)
      const dt = lastTs.current !== null ? now - lastTs.current : 0;
      lastTs.current = now;
      const lambda = (lambdaRef.current + (SPEED_LON_DEG_PER_SEC * dt) / 1000) % 360;
      lambdaRef.current = lambda;
      projection.rotate([lambda, BASE_PHI, BASE_GAMMA]);

      // 2) clear + re-create geoPath with updated projection
      try {
        const path = d3.geoPath(projection as any);
        if (landRef.current)    setLandPath(path(landRef.current) ?? '');
        setGraticulePath(path(graticule) ?? '');
      } catch { /* keep UI alive */ }

      // 3) maintain arcs
      // prune expired
      setArcs(prev => prev.filter(a => (now - a.birthMs) <= ARC_TOTAL_MS));

      // spawn
      if (now - lastSpawn.current >= ARC_SPAWN_EVERY_MS) {
        setArcs(prev => {
          if (prev.length < MAX_ARCS) {
            // Get visible cities for current rotation
            const visibleCities = CITIES.filter(c => isPointVisible(c.lon, c.lat));
            const picks = pickTwoVisibleCities(visibleCities);
            if (picks) {
              lastSpawn.current = now;
              return [...prev, { id: idRef.current++, from: picks.a, to: picks.b, birthMs: now }];
            }
          }
          return prev;
        });
      }

      requestAnimationFrame(tick);
    };

    const r = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helpers
  const projectPoint = (lon: number, lat: number) => projection([lon, lat]) as [number, number];
  
  // Ensure FRONT-HEMISPHERE culling reads CURRENT rotate() (no refs!)
  function isPointVisible(lon: number, lat: number) {
    const rot = projection.rotate() as [number, number, number];
    const centerLon = -rot[0], centerLat = -rot[1];
    // angular distance; visible if within ~90° of center
    const toRad = (d: number) => (d * Math.PI) / 180;
    const φ1 = toRad(centerLat), λ1 = toRad(centerLon);
    const φ2 = toRad(lat),       λ2 = toRad(lon);
    const cosΔσ = Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
    return cosΔσ > Math.cos(Math.PI/2 - 0.01); // small tolerance
  }

  // Helper functions for SVG arc rendering (keeping for compatibility)
  const buildGreatCircle = (a: City, b: City) => {
    const interp = d3.geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
    const pts: [number, number][] = [];
    const steps = 48;
    for (let i = 0; i <= steps; i++) pts.push(interp(i/steps));
    return pts.map(p => projection(p) as [number, number]).filter(Boolean);
  };
  
  const arcPathD = (pts: [number, number][]) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1]}`;
    return d;
  };

  // If you memoize visibleCities, do NOT depend on φ/λ refs. Re-run on arcs (which update every frame):
  const visibleCities = useMemo(
    () => CITIES.filter(c => isPointVisible(c.lon, c.lat)),
    [arcs]
  );

  return (
    <div className="relative flex items-center justify-center" data-testid="hero-globe-client">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        width="100%"
        height="100%"
        style={{ willChange: 'transform' }}
      >
        {/* fond : sphère navy edge-to-edge */}
        <defs>
          <radialGradient id="laSphere" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#1A2E4F" />
            <stop offset="100%" stopColor="#223A63" />
          </radialGradient>
        </defs>
        <circle cx={r} cy={r} r={r} fill="url(#laSphere)" />

        {/* graticule */}
        {graticulePath && (
          <path d={graticulePath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        )}

        {/* continents */}
        {landPath && (
          <path d={landPath} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />
        )}

        {/* Cities (front only) */}
        {visibleCities.map((c) => {
          const p = projectPoint(c.lon, c.lat);
          if (!p) return null;
          return (
            <g key={c.name}>
              <circle cx={p[0]} cy={p[1]} r={2.8} fill={GOLD} />
              <circle cx={p[0]} cy={p[1]} r={1.2} fill="#fff8" />
            </g>
          );
        })}

        {/* Animated arcs (front endpoints only) */}
        {arcs.map((a) => {
          // hide arc if endpoints not visible
          if (!isPointVisible(a.from.lon, a.from.lat)) return null;
          if (!isPointVisible(a.to.lon, a.to.lat)) return null;

          const pts = buildGreatCircle(a.from, a.to);
          if (!pts.length) return null;
          const d = arcPathD(pts);

          const life = performance.now() - a.birthMs; // ms
          const drawT = ARC_DRAW_MS, holdT = ARC_HOLD_MS, fadeT = ARC_FADE_MS;
          const total = ARC_TOTAL_MS;
          const clamped = Math.max(0, Math.min(life, total));

          // stroke-dasharray for draw effect
          const pathLen = 1000; // fake large length works fine for SVG path
          let dash = pathLen;
          let offset = pathLen;
          let opacity = 0;

          if (clamped <= drawT) {
            const k = clamped / drawT;
            dash = pathLen;
            offset = pathLen * (1 - k);
            opacity = 0.85 * k;
          } else if (clamped <= drawT + holdT) {
            dash = pathLen;
            offset = 0;
            opacity = 0.85;
          } else {
            const k = (clamped - drawT - holdT) / fadeT;
            dash = pathLen;
            offset = 0;
            opacity = 0.85 * (1 - k);
          }

          return (
            <g key={a.id}>
              <path d={d} stroke={GOLD} strokeWidth={2} fill="none"
                    strokeDasharray={pathLen} strokeDashoffset={offset}
                    opacity={opacity}/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
