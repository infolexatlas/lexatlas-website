"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export default function HeroGlobeReal() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous renders

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 10;

    // Set up the SVG
    svg.attr("width", width).attr("height", height);

    // Create a group for the globe
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create a projection
    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([0, 0])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection);

    // Create a sphere for the globe
    g.append("path")
      .datum({ type: "Sphere" })
      .attr("d", path)
      .attr("fill", "#1A2E4F")
      .attr("stroke", "#223A63")
      .attr("stroke-width", 1);

    // Load world data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@3/countries-110m.json")
      .then((world: any) => {
        const countries = topojson.feature(world, world.objects.countries);
        
        // Add countries
        g.selectAll(".country")
          .data(countries.features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", "#2A4A6B")
          .attr("stroke", "#1A2E4F")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.8)
          .on("mouseover", function(event, d) {
            d3.select(this)
              .attr("fill", "#D4AF37")
              .attr("opacity", 1);
          })
          .on("mouseout", function(event, d) {
            d3.select(this)
              .attr("fill", "#2A4A6B")
              .attr("opacity", 0.8);
          });

        // Add graticule (grid lines)
        const graticule = d3.geoGraticule();
        g.append("path")
          .datum(graticule)
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "#223A63")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);

        // Add rotation animation
        let rotation = 0;
        const rotate = () => {
          rotation += 0.5;
          projection.rotate([rotation, 0, 0]);
          g.selectAll("path").attr("d", path);
          requestAnimationFrame(rotate);
        };
        rotate();

      })
      .catch((error) => {
        console.error("Error loading world data:", error);
        
        // Fallback: create a simple globe with basic shapes
        g.append("circle")
          .attr("r", radius)
          .attr("fill", "#1A2E4F")
          .attr("stroke", "#223A63")
          .attr("stroke-width", 2);

        // Add some continent-like shapes
        const continents = [
          { x: -80, y: -20, width: 60, height: 40, rx: 20, ry: 15 },
          { x: 20, y: -30, width: 50, height: 35, rx: 15, ry: 12 },
          { x: -40, y: 30, width: 40, height: 30, rx: 12, ry: 10 },
          { x: 30, y: 20, width: 35, height: 25, rx: 10, ry: 8 },
        ];

        continents.forEach((continent, i) => {
          g.append("ellipse")
            .attr("cx", continent.x)
            .attr("cy", continent.y)
            .attr("rx", continent.rx)
            .attr("ry", continent.ry)
            .attr("fill", "#2A4A6B")
            .attr("opacity", 0.8)
            .attr("stroke", "#1A2E4F")
            .attr("stroke-width", 0.5);
        });
      });

  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[560px] max-w-[85vw] overflow-hidden globe-container">
      {/* simple navy circle fallback while client loads */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(28% #1A2E4F, #223A63)' }} />
      <svg
        ref={svgRef}
        className="globe-svg"
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}