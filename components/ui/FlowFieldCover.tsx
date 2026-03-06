"use client";

import { useMemo } from "react";

/**
 * Deterministic seeded PRNG (mulberry32).
 * Produces consistent visuals for the same seed string.
 */
function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }
  return function () {
    h |= 0;
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FlowFieldCoverProps {
  seed: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Generates a deterministic fluid-dynamics-inspired SVG pattern.
 * Uses Perlin-like flow lines with the project title as seed.
 */
export default function FlowFieldCover({
  seed,
  width = 400,
  height = 224,
  className,
}: FlowFieldCoverProps) {
  const paths = useMemo(() => {
    const rand = seededRandom(seed);
    const lines: string[] = [];

    // Generate flow field vectors on a coarse grid
    const cols = 12;
    const rows = 8;
    const cellW = width / cols;
    const cellH = height / rows;

    // Create angle field
    const angles: number[][] = [];
    for (let r = 0; r <= rows; r++) {
      angles[r] = [];
      for (let c = 0; c <= cols; c++) {
        // Base angle with smooth variation
        const base = rand() * Math.PI * 2;
        // Add some swirl influence from two vortex centers
        const vx1 = rand() * width;
        const vy1 = rand() * height;
        const px = c * cellW;
        const py = r * cellH;
        const dx = px - vx1;
        const dy = py - vy1;
        const dist = Math.sqrt(dx * dx + dy * dy) + 1;
        const swirl = Math.atan2(dy, dx) + Math.PI / 2;
        angles[r][c] = base * 0.3 + swirl * (150 / dist);
      }
    }

    // Trace flow lines
    const numLines = 28 + Math.floor(rand() * 16);
    for (let i = 0; i < numLines; i++) {
      let x = rand() * width;
      let y = rand() * height;
      const points: [number, number][] = [[x, y]];
      const steps = 18 + Math.floor(rand() * 24);
      const stepLen = 4 + rand() * 6;

      for (let s = 0; s < steps; s++) {
        const col = Math.min(Math.floor(x / cellW), cols - 1);
        const row = Math.min(Math.floor(y / cellH), rows - 1);
        if (col < 0 || row < 0 || col >= cols || row >= rows) break;

        // Bilinear interpolation of angle
        const fx = (x - col * cellW) / cellW;
        const fy = (y - row * cellH) / cellH;
        const a00 = angles[row][col];
        const a10 = angles[row][col + 1];
        const a01 = angles[row + 1][col];
        const a11 = angles[row + 1][col + 1];
        const a0 = a00 + (a10 - a00) * fx;
        const a1 = a01 + (a11 - a01) * fx;
        const angle = a0 + (a1 - a0) * fy;

        x += Math.cos(angle) * stepLen;
        y += Math.sin(angle) * stepLen;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) break;
        points.push([x, y]);
      }

      if (points.length > 3) {
        const d = points
          .map((p, j) => `${j === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
          .join(" ");
        lines.push(d);
      }
    }

    return lines;
  }, [seed, width, height]);

  // Derive accent hue from seed for subtle color variation
  const rand = seededRandom(seed);
  const hue = Math.floor(rand() * 40) + 120; // 120-160 range (green spectrum, on-brand)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width={width} height={height} fill="#0a0a0a" />

      {/* Subtle grid */}
      {Array.from({ length: 5 }, (_, i) => {
        const y = ((i + 1) * height) / 6;
        return <line key={`h${i}`} x1="0" y1={y} x2={width} y2={y} stroke="#161616" strokeWidth="0.5" />;
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const x = ((i + 1) * width) / 8;
        return <line key={`v${i}`} x1={x} y1="0" x2={x} y2={height} stroke="#161616" strokeWidth="0.5" />;
      })}

      {/* Flow lines */}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={`hsla(${hue}, 80%, 65%, ${0.12 + (i / paths.length) * 0.2})`}
          strokeWidth={0.6 + (i % 3) * 0.4}
          strokeLinecap="round"
        />
      ))}

      {/* Glow overlay in center */}
      <radialGradient id={`glow-${seed.slice(0, 8)}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={`hsla(${hue}, 90%, 60%, 0.08)`} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <rect width={width} height={height} fill={`url(#glow-${seed.slice(0, 8)})`} />
    </svg>
  );
}
