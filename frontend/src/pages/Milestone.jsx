import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import bmc2 from "../assets/bmc2.jpg";

/* ------------------------------------------------------------------ */
/*  DATA (UNCHANGED)                                                  */
/* ------------------------------------------------------------------ */
const milestones = [
  {
    period: "1986–1987",
    tag: "Founding",
    events: [
      "Establishment of PT BMC (1986)",
      "Start Commercial Production Brake Drum (1987)",
    ],
  },
  {
    period: "1989–1992",
    tag: "Early Growth",
    events: [
      "Installed Machineries for Fly Wheel (1989)",
      "Brake Drum Medium Truck (1992)",
    ],
  },
  {
    period: "2002–2009",
    tag: "Certification Era",
    events: [
      "Received ISO 9001 Certification (2002)",
      "Start Production Hino Part, Hook Frame (2008)",
      "Received ISO TS 16949 Certification (2009)",
    ],
  },
  {
    period: "2010–2012",
    tag: "Expansion",
    events: [
      "Expansion capacity for Light Truck Brake Drum and Front Hub",
      "Received ISO 14001 Certification",
      "Expansion Prod. Line Cat 3",
      "Expansion Land 7600 sqm",
    ],
  },
  {
    period: "2013",
    tag: "Quality",
    events: [
      "OHSAS 18001 Certified",
      "Project Knuckle Export to Mitsubishi Japan",
    ],
  },
  {
    period: "2014–2015",
    tag: "New Products",
    events: [
      "Expansion New Line Multi Purpose",
      "Commercial Production Knuckle Mitsubishi",
    ],
  },
  {
    period: "2016",
    tag: "Milestones",
    events: [
      "QCM Brake Assy",
      "Commercial Production TD Brake Change",
      "Dev FM/FN Models",
    ],
  },
  {
    period: "2017",
    tag: "Recognition",
    events: [
      "Achieved PROPER Biru from KLHK",
      "BMC Received PMDN Awards Government",
      "Development QX Models (Pajero)",
      "Global Market",
    ],
  },
  {
    period: "2018",
    tag: "Scale Up",
    events: [
      "Massprod RN Models",
      "Received IATF 16949 Certification & ISO 45001 (transition)",
      "Expansion Assembly Line",
      "Commercial Prod FM/FN Models",
    ],
  },
  {
    period: "2019",
    tag: "Localization",
    events: [
      "Dev Localization Part Fighter Models",
      "Dev FW, Exh Manifold & Gas Line (TD Euro4)",
      "Dev Part N-Series Models",
      "Dev Localization Part Ranger Models",
      "Trading Cylinder Liner",
    ],
  },
  {
    period: "2020–2021",
    tag: "Diversification",
    events: [
      "Dev IGCE Parts",
      "Dev Euro 4 Part for Mitsubishi, HMMI & Isuzu",
      "Trading Part Fuso Value Project",
    ],
  },
  {
    period: "2022–2023",
    tag: "Sustainability",
    events: [
      "Kick Off X-Force Development MMKI",
      "Massprod Product Euro-4 All Customer",
      "Installed Rooftop Solar PV 317.7 kWp (Dev. Renewable New Energy)",
    ],
  },
  {
    period: "2024–2025",
    tag: "Innovation",
    events: [
      "Dev SCTB Parts For Drum Brake",
      "Dev Sourcing Part (Front Grill)",
      "Dev Integrate Machine Robotic",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  COLOR TOKENS                                                      */
/*  (dipakai untuk gradient/stroke dinamis di JS & CSS hover-sync;    */
/*   untuk styling statis, warna ini sudah dipindah jadi Tailwind     */
/*   arbitrary value class, mis. bg-[#0D1F5C])                        */
/* ------------------------------------------------------------------ */
const PRIMARY = "#0D1F5C";
const ACCENT = "#D4A843";
const ROAD = "#BFC4CC";
const HIGHLIGHT = "#ECECEC";
const SHADOW_COLOR = "rgba(0,0,0,0.18)";

const SVG_WIDTH = 320;

/* ------------------------------------------------------------------ */
/*  Catmull-Rom -> Smooth 3D Bezier Path                              */
/* ------------------------------------------------------------------ */
function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 3.5;
    const c1y = p1.y + (p2.y - p0.y) / 3.5;
    const c2x = p2.x - (p3.x - p1.x) / 3.5;
    const c2y = p2.y - (p3.y - p1.y) / 3.5;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/* ------------------------------------------------------------------ */
/*  CARD CONTENT COMPONENT (FLOATING GLASS CARD)                      */
/* ------------------------------------------------------------------ */
function CardContent({ item, align }) {
  const isRight = align === "right";
  return (
    <div
      className={[
        "bmc-floating-card relative cursor-pointer rounded-[18px] border border-white/60",
        "bg-white/75 px-6 py-5 backdrop-blur-md",
        "shadow-[0_8px_32px_rgba(13,31,92,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]",
        "hover:-translate-y-2 hover:bg-white hover:border-[#D4A843]/30",
        "hover:shadow-[0_20px_38px_rgba(13,31,92,0.12),inset_0_1px_0_#ffffff]",
        isRight ? "text-right" : "text-left",
        "max-[820px]:text-left",
      ].join(" ")}
    >
      <div className="mb-2 inline-block rounded-[20px] border border-[#0D1F5C]/5 bg-[#ECECEC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D1F5C]">
        {item.tag}
      </div>

      <div className="mb-3 text-[clamp(24px,4vw,32px)] font-black leading-none tracking-[-0.02em] text-[#0D1F5C] [font-variant-numeric:tabular-nums]">
        {item.period}
      </div>

      <ul className="m-0 list-none p-0">
        {item.events.map((ev, i) => (
          <li
            key={i}
            className={[
              "flex items-start gap-2.5 text-sm font-normal leading-relaxed text-[#0D1F5C]/80",
              i < item.events.length - 1 ? "mb-2" : "",
              isRight ? "flex-row-reverse" : "flex-row",
              "max-[820px]:flex-row",
            ].join(" ")}
          >
            <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4A843]" />
            <span>{ev}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WINDING ROAD TIMELINE                                             */
/* ------------------------------------------------------------------ */
function WindingTimeline({ items, visibleItems, observerRef }) {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const [layout, setLayout] = useState({ height: 0, points: [] });

  useLayoutEffect(() => {
    let raf1, raf2;

    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const count = items.length;

      const pts = rowRefs.current.map((el, i) => {
        if (!el) return { x: SVG_WIDTH / 2, y: 0, isLeft: i % 2 === 0, factor: 1 };
        const r = el.getBoundingClientRect();
        const y = r.top - cRect.top + r.height / 2;

        // Perspektif ilusi 3D: jalan melebar semakin ke bawah
        const progress = i / (count - 1);
        const perspectiveFactor = 0.65 + progress * 0.45;

        const isLeft = i % 2 === 0;
        const baseOffset = isLeft ? 65 : SVG_WIDTH - 65;
        const center = SVG_WIDTH / 2;
        const x = center + (baseOffset - center) * perspectiveFactor;

        return { x, y, isLeft, factor: perspectiveFactor };
      });
      setLayout({ height: cRect.height, points: pts });
    }

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  const pathD = smoothPath(layout.points);

  return (
    <div ref={containerRef} className="relative">
      {/* --- Desktop Winding Road (SVG) --- */}
      {layout.height > 0 && (
        <svg
          className="bmc-road-svg pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 overflow-visible max-[820px]:hidden"
          width={SVG_WIDTH}
          height={layout.height}
          viewBox={`0 0 ${SVG_WIDTH} ${layout.height}`}
        >
          {/* Bayangan jalan 3D */}
          <path
            d={pathD}
            className="stroke-[rgba(0,0,0,0.18)]"
            strokeWidth={26}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(8, 12)"
            opacity="0.6"
          />

          {/* Bahu jalan */}
          <path
            d={pathD}
            className="stroke-[#ECECEC]"
            strokeWidth={22}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Aspal utama */}
          <path
            d={pathD}
            className="stroke-[#BFC4CC]"
            strokeWidth={18}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Marka jalan putus-putus */}
          <path
            d={pathD}
            className="stroke-white"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="8 10"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Glow saat hover */}
          <g className="bmc-glow-group opacity-0 transition-opacity duration-[400ms]">
            <path
              d={pathD}
              className="stroke-[#D4A843] blur-[6px]"
              strokeWidth={28}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
            />
          </g>
        </svg>
      )}

      {/* --- Rows / Grid Layout --- */}
      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isVisible = visibleItems.has(index);

        return (
          <div
            key={item.period}
            data-milestone-row
            data-index={index}
            className={`bmc-row bmc-row-idx-${index} relative z-[1] grid grid-cols-[1fr_320px_1fr] items-center py-12 max-[820px]:grid-cols-[32px_1fr] max-[820px]:py-6`}
            ref={(el) => {
              rowRefs.current[index] = el;
              if (el && observerRef.current) {
                el.dataset.index = index;
                observerRef.current.observe(el);
              }
            }}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.8s",
              transitionTimingFunction: "cubic-bezier(0.215, 0.610, 0.355, 1)",
              transitionDelay: `${index * 0.05}s`,
            }}
          >
            {/* Kolom Kiri */}
            <div className="pr-10 max-[820px]:hidden">
              {isLeft ? <CardContent item={item} align="right" /> : null}
            </div>

            {/* Kolom Tengah (marker mobile) */}
            <div className="relative hidden h-full flex-col items-center max-[820px]:col-start-1 max-[820px]:flex">
              <span className="mt-5 h-4 w-4 flex-shrink-0 rounded-full border-[3px] border-white bg-[#D4A843] shadow-[0_0_0_2px_#0D1F5C22]" />
              <span className="mt-1.5 w-[3px] flex-1 rounded-sm bg-[linear-gradient(180deg,#BFC4CC_0%,rgba(191,196,204,0.1)_100%)]" />
            </div>

            {/* Kolom Kanan */}
            <div className="pl-10 max-[820px]:col-start-2 max-[820px]:w-full max-[820px]:pl-4">
              {!isLeft ? <CardContent item={item} align="left" /> : null}
            </div>
          </div>
        );
      })}

      {/* --- 3D PIN STOPS AND STEM CONNECTIONS --- */}
      {layout.height > 0 &&
        layout.points.map((p, i) => {
          const isVisible = visibleItems.has(i);
          const stemHeight = 65 * p.factor;
          const pinDiameter = 26 + p.factor * 4;

          return (
            <div
              key={`stop-${i}`}
              className={`bmc-milestone-stop bmc-stop-target-${i} pointer-events-none absolute z-[2] max-[820px]:hidden`}
              style={{
                left: `calc(50% - ${SVG_WIDTH / 2}px + ${p.x}px)`,
                top: p.y,
              }}
            >
              {/* Bayangan oval di bawah pin */}
              <div
                className="absolute left-[-50%] top-[-4px] rounded-full bg-black/35 blur-[2px] transition-opacity duration-500"
                style={{
                  width: pinDiameter * 1.2,
                  height: 6,
                  transform: "translate(-18%, -50%)",
                  opacity: isVisible ? 1 : 0,
                }}
              />

              {/* Tiang mini 3D */}
              <div
                className="bmc-vertical-stem absolute bottom-0 left-[-50%] w-1 origin-bottom shadow-[2px_0_5px_rgba(0,0,0,0.15)] transition-[height,background] duration-[800ms]"
                style={{
                  height: isVisible ? stemHeight : 0,
                  background: `linear-gradient(180deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
                  transform: "translateX(-50%) scaleX(1)",
                  transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              />

              {/* Kepala pin */}
              <div
                className="bmc-pin-head absolute left-[-50%] flex items-center justify-center rounded-full border-[3px] border-[#0D1F5C] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-[transform,bottom,border-color,width,height] duration-500"
                style={{
                  bottom: isVisible ? stemHeight : 0,
                  width: pinDiameter,
                  height: pinDiameter,
                  transform: isVisible
                    ? "translate(-50%, 50%) scale(1)"
                    : "translate(-50%, 50%) scale(0.6)",
                  transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                <div className="h-[45%] w-[45%] rounded-full bg-[#D4A843] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
              </div>
            </div>
          );
        })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
const Milestone = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15 }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F5F9_50%,#EAEFF5_100%)]"
      style={{ fontFamily: "'Roboto Condensed', 'Roboto', sans-serif" }}
    >
      {/* Blur circles & noise pattern */}
      <div className="pointer-events-none absolute left-[-10%] top-[15%] z-0 h-[40vw] w-[40vw] rounded-full bg-[#D4A84308] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[20%] right-[-10%] z-0 h-[45vw] w-[45vw] rounded-full bg-[#0D1F5C05] blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Hover-sync CSS antara row, tiang & jalan (per-index, harus tetap style tag  */}
      {/* karena selector sibling dinamis tidak bisa diekspresikan lewat Tailwind statis) */}
      <style>{`
        ${milestones
          .map(
            (_, idx) => `
          .bmc-row-idx-${idx}:hover ~ .bmc-stop-target-${idx} .bmc-pin-head {
            transform: translate(-50%, 50%) scale(1.22) !important;
            border-color: ${ACCENT} !important;
            box-shadow: 0 8px 20px rgba(212, 168, 67, 0.4) !important;
          }
          .bmc-row-idx-${idx}:hover ~ .bmc-stop-target-${idx} .bmc-vertical-stem {
            background: ${ACCENT} !important;
          }
          .bmc-row-idx-${idx}:hover ~ .bmc-road-svg .bmc-glow-group {
            opacity: 1 !important;
          }
        `
          )
          .join("\n")}
      `}</style>

      {/* ============================= HERO ============================= */}
      <section className="relative flex h-[40vh] min-h-[380px] items-end overflow-hidden bg-[#0D1F5C]">
        <img
          src={bmc2}
          alt="BMC"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,31,92,.80)_0%,rgba(13,31,92,.40)_45%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,31,92,.70),transparent_45%)]" />

        <button
          onClick={() => window.location.assign("/")}
          className="absolute left-6 top-6 z-50 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 transition-colors duration-200 hover:text-[#D4A843] md:left-10 md:top-8"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M13 4l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </button>

        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="relative z-10 max-w-[720px] px-20 pb-14"
        >
          {/* Breadcrumb */}
          <p className="mb-4 flex items-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A843]">
            <a href="/" className="text-[#D4A843] no-underline">
              Home
            </a>
            <ChevronRight size={12} className="mx-1 text-[#D4A843]" />
            <a href="/companyprofile" className="text-[#D4A843] no-underline">
              About Us
            </a>
            <ChevronRight size={12} className="mx-1 text-[#D4A843]" />
            <span className="text-white">History &amp; Milestones</span>
          </p>

          {/* Subtitle */}
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A843]">
            PT Braja Mukti Cakra
          </p>

          {/* Title */}
          <h1 className="m-0 mb-4 text-[clamp(48px,6vw,64px)] font-bold leading-[1.05] text-white [text-shadow:0_4px_18px_rgba(0,0,0,.35)]">
            Our Journey
          </h1>

          {/* Description */}
          <p className="m-0 max-w-[560px] text-base leading-[1.7] text-white/70 [text-shadow:0_2px_10px_rgba(0,0,0,.25)]">
            Tracing the milestones that shaped PT Braja Mukti Cakra — from a
            single brake drum line to a multi-product automotive powerhouse.
          </p>
        </div>
      </section>

      {/* ============================= TIMELINE ============================= */}
      <div className="relative z-[1] mx-auto max-w-[1140px] px-6 py-20 pb-[120px]">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-block rounded-[20px] bg-[#0D1F5C] px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
            Since 1986
          </div>
          <h2 className="m-0 mb-4 text-[clamp(32px,5vw,42px)] font-black tracking-[-0.02em] text-[#0D1F5C]">
            Four Decades of Excellence
          </h2>
          <p className="mx-auto max-w-[520px] text-base leading-relaxed text-[#5a6375]">
            A chronicle of innovation, certification, and growth in
            automotive components manufacturing.
          </p>
        </div>

        <WindingTimeline
          items={milestones}
          visibleItems={visibleItems}
          observerRef={observerRef}
        />

        {/* Footer callout */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-[linear-gradient(135deg,#0D1F5C,#1a3a8a)] px-12 py-10">
          <div>
            <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[#D4A843]">
              The Journey Continues
            </div>
            <h3 className="m-0 text-2xl font-extrabold tracking-[-0.01em] text-white">
              PT Braja Mukti Cakra
            </h3>
            <p className="mt-2 text-sm text-white/50">
              Driving the future of Indonesian automotive manufacturing.
            </p>
          </div>
          <a
            href="/"
            className="whitespace-nowrap rounded-lg bg-[#D4A843] px-7 py-3 text-sm font-extrabold uppercase tracking-[0.05em] text-[#0D1F5C] no-underline"
          >
            About Us →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Milestone;