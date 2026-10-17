"use client";

import { useEffect, useRef } from "react";
import { useIsActive, usePrefersReducedMotion } from "@/lib/use-motion";

// Figure-eight through the centre (260,150): the left lobe is "Dev", the right
// lobe "Ops". Traversal: centre → top-left → left end → bottom-left → centre →
// top-right → right end → bottom-right → centre.
const LOOP =
  "M260,150 C215,60 40,50 40,150 C40,250 215,240 260,150 C305,60 480,50 480,150 C480,250 305,240 260,150";

const DURATION = 12; // seconds per full loop
const PACKETS = 2; // evenly spaced, so a stage lights every DURATION / PACKETS

// Positions sampled along LOOP by arc length (fraction of the full path), so
// each stage pulses exactly when a packet passes it.
const STAGES = [
  { name: "Plan", f: 0.07, x: 202.9, y: 96.1, top: true },
  { name: "Code", f: 0.18, x: 81.5, y: 87.8, top: true },
  { name: "Build", f: 0.3, x: 62.3, y: 200.4, top: false },
  { name: "Test", f: 0.42, x: 192.8, y: 208.5, top: false },
  { name: "Release", f: 0.58, x: 327.4, y: 91.4, top: true },
  { name: "Deploy", f: 0.7, x: 457.8, y: 99.7, top: true },
  { name: "Operate", f: 0.82, x: 438.4, y: 212.3, top: false },
  { name: "Monitor", f: 0.93, x: 316.9, y: 203.9, top: false },
];

const PULSE = DURATION / PACKETS;
// Negative begin times start every animation "already running", so nothing
// sits at its unanimated position on first paint.
const pulseBegin = (f: number) => `${(((f * DURATION) % PULSE) - PULSE).toFixed(2)}s`;
const packetBegin = (packet: number, lag = 0) => `${(-(packet * PULSE + DURATION - lag)).toFixed(2)}s`;

/**
 * The hero illustration: an endless DevOps loop with build packets travelling
 * through eight stages. SMIL drives the motion (works in every engine); it is
 * paused while off screen, in background tabs, and for reduced motion.
 */
export function DevOpsLoop() {
  const wrapper = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const active = useIsActive(wrapper);

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    if (reduced) {
      element.pauseAnimations();
      element.setCurrentTime(DURATION * 0.66);
    } else if (active) {
      element.unpauseAnimations();
    } else {
      element.pauseAnimations();
    }
  }, [active, reduced]);

  return (
    <div ref={wrapper} className="relative mx-auto w-full max-w-[540px]">
      <svg
        ref={svg}
        viewBox="0 0 520 300"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="devops-loop-title"
      >
        <title id="devops-loop-title">
          The DevOps loop: plan, code, build, test, release, deploy, operate, monitor, and back to plan.
        </title>
        <defs>
          <linearGradient id="loop-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#84bc9c" stopOpacity="0.25" />
            <stop offset="0.5" stopColor="#a8f0c8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#84bc9c" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="packet-glow">
            <stop offset="0" stopColor="#a8f0c8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#a8f0c8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lobe-glow">
            <stop offset="0" stopColor="#84bc9c" stopOpacity="0.14" />
            <stop offset="1" stopColor="#84bc9c" stopOpacity="0" />
          </radialGradient>
          <path id="devops-loop-path" d={LOOP} />
        </defs>

        <ellipse cx="150" cy="150" rx="120" ry="95" fill="url(#lobe-glow)" />
        <ellipse cx="370" cy="150" rx="120" ry="95" fill="url(#lobe-glow)" />

        {/* Track: faint rail, then a flowing dashed line on top. */}
        <use href="#devops-loop-path" fill="none" stroke="#2a3337" strokeWidth="10" strokeLinecap="round" />
        <use href="#devops-loop-path" fill="none" stroke="url(#loop-gradient)" strokeWidth="1.5" />
        <use
          href="#devops-loop-path"
          fill="none"
          stroke="#84bc9c"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          className="loop-flow"
        />

        <text x="150" y="156" textAnchor="middle" className="loop-lobe-label">
          DEV
        </text>
        <text x="370" y="156" textAnchor="middle" className="loop-lobe-label">
          OPS
        </text>

        {STAGES.map((stage) => (
          <g key={stage.name}>
            <circle cx={stage.x} cy={stage.y} r="5" fill="none" stroke="#a8f0c8" strokeOpacity="0">
              <animate attributeName="r" values="5;16;16" keyTimes="0;0.25;1" dur={`${PULSE}s`} begin={pulseBegin(stage.f)} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.8;0;0" keyTimes="0;0.25;1" dur={`${PULSE}s`} begin={pulseBegin(stage.f)} repeatCount="indefinite" />
            </circle>
            <circle cx={stage.x} cy={stage.y} r="5" fill="#0b0e10" stroke="#84bc9c" strokeWidth="1.5">
              <animate attributeName="fill" values="#a8f0c8;#0b0e10;#0b0e10" keyTimes="0;0.2;1" dur={`${PULSE}s`} begin={pulseBegin(stage.f)} repeatCount="indefinite" />
            </circle>
            <text
              x={stage.x}
              y={stage.top ? stage.y - 15 : stage.y + 24}
              textAnchor="middle"
              className="loop-stage-label"
            >
              {stage.name.toUpperCase()}
              <animate attributeName="fill" values="#a8f0c8;#828988;#828988" keyTimes="0;0.3;1" dur={`${PULSE}s`} begin={pulseBegin(stage.f)} repeatCount="indefinite" />
            </text>
          </g>
        ))}

        {Array.from({ length: PACKETS }, (_, packet) => {
          const begin = packetBegin(packet);
          return (
            <g key={packet}>
              {[0.24, 0.16, 0.08].map((lag, index) => (
                <circle key={lag} r={2.6 - index * 0.6} fill="#a8f0c8" opacity={0.25 + index * 0.15}>
                  <animateMotion dur={`${DURATION}s`} begin={packetBegin(packet, lag)} repeatCount="indefinite" rotate="auto">
                    <mpath href="#devops-loop-path" />
                  </animateMotion>
                </circle>
              ))}
              <circle r="14" fill="url(#packet-glow)">
                <animateMotion dur={`${DURATION}s`} begin={begin} repeatCount="indefinite">
                  <mpath href="#devops-loop-path" />
                </animateMotion>
              </circle>
              <circle r="4" fill="#e9fff2">
                <animateMotion dur={`${DURATION}s`} begin={begin} repeatCount="indefinite">
                  <mpath href="#devops-loop-path" />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
