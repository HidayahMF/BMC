import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import blackimage from "../assets/blackimage.jpg";

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
/*  COLOR PALETTE SYSTEM                                              */
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
function CardContent({ item, align, index }) {
  const isRight = align === "right";
  return (
    <div
      className={`bmc-floating-card bmc-card-index-${index}`}
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "18px",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        padding: "20px 24px",
        boxShadow: "0 8px 32px rgba(13, 31, 92, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        textAlign: align,
        position: "relative",
        transition: "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), boxShadow 0.4s ease, background-color 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: PRIMARY,
          background: `${HIGHLIGHT}`,
          borderRadius: "20px",
          padding: "4px 12px",
          marginBottom: 8,
          border: "1px solid rgba(13,31,92,0.05)",
        }}
      >
        {item.tag}
      </div>

      <div
        style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 900,
          color: PRIMARY,
          lineHeight: 1,
          marginBottom: 12,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
        }}
      >
        {item.period}
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {item.events.map((ev, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14,
              color: "rgba(13,31,92,0.8)",
              lineHeight: 1.6,
              marginBottom: i < item.events.length - 1 ? 8 : 0,
              flexDirection: isRight ? "row-reverse" : "row",
              fontWeight: 400,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: ACCENT,
                flexShrink: 0,
                marginTop: 9,
              }}
            />
            <span>{ev}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WINDING ROAD TIMELINE (REDESIGNED 3D PERSPECTIVE & ANIMATION)     */
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

        // ILLUSION PERSPECTIVE FOR 3D EFFECT: Semakin ke bawah jalan semakin melebar/membesar sedikit
        // Elemen teratas berjarak sempit di tengah, elemen terbawah berayun lebar (S-Curve perspektif)
        const progress = i / (count - 1); // 0 -> 1
        const perspectiveFactor = 0.65 + progress * 0.45; // Mengembang dari 0.65 ke 1.1

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
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* --- Desktop Winding Road (SVG) --- */}
      {layout.height > 0 && (
        <svg
          className="bmc-road-svg"
          width={SVG_WIDTH}
          height={layout.height}
          viewBox={`0 0 ${SVG_WIDTH} ${layout.height}`}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            zIndex: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {/* Efek Bayangan Jalan 3D Drop Shadow */}
          <path
            d={pathD}
            stroke={SHADOW_COLOR}
            strokeWidth={26}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(8, 12)"
            opacity="0.6"
          />

          {/* Sisi Luar Border Jalan / Bahu Jalan */}
          <path
            d={pathD}
            stroke={HIGHLIGHT}
            strokeWidth={22}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lintasan Utama Jalan Aspal Otomotif */}
          <path
            d={pathD}
            stroke={ROAD}
            strokeWidth={18}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Garis Tengah Putih Putus-putus Markah Jalan */}
          <path
            d={pathD}
            stroke="#ffffff"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="8 10"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* GLOw EFFECTS FILTER FOR HOVER ACTIONS */}
          <g className="bmc-glow-group" opacity="0" style={{ transition: "opacity 0.4s" }}>
            <path
              d={pathD}
              stroke={ACCENT}
              strokeWidth={28}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
              style={{ filter: "blur(6px)" }}
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
            className={`bmc-row bmc-row-idx-${index} ${isVisible ? "is-visible" : ""}`}
            ref={(el) => {
              rowRefs.current[index] = el;
              if (el && observerRef.current) {
                el.dataset.index = index;
                observerRef.current.observe(el);
              }
            }}
            style={{
              display: "grid",
              gridTemplateColumns: `1fr ${SVG_WIDTH}px 1fr`,
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              padding: "48px 0",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1) ${index * 0.05}s, transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1) ${index * 0.05}s`,
            }}
          >
            {/* Kolom Kiri */}
            <div className="bmc-left-col" style={{ padding: "0 40px 0 0", gridColumn: "1" }}>
              {isLeft ? <CardContent item={item} align="right" index={index} /> : null}
            </div>

            {/* Kolom Tengah Space Untuk Jalan */}
            <div className="bmc-mobile-marker" style={{ gridColumn: "2", position: "relative", height: "100%" }}>
              <span className="bmc-mobile-dot" />
              <span className="bmc-mobile-line" />
            </div>

            {/* Kolom Kanan */}
            <div className="bmc-right-col" style={{ padding: "0 0 0 40px", gridColumn: "3" }}>
              {!isLeft ? <CardContent item={item} align="left" index={index} /> : null}
            </div>
          </div>
        );
      })}

      {/* --- 3D PIN STOPS AND STEM CONNECTIONS GENERATOR --- */}
      {layout.height > 0 &&
        layout.points.map((p, i) => {
          const isVisible = visibleItems.has(i);
          const stemHeight = 65 * p.factor; // Tinggi tiang konektor menyesuaikan ilusi perspektif
          const pinDiameter = (26 + p.factor * 4); // Diameter mengecil/membesar halus sesuai kedalaman bidang

          return (
            <div
              key={`stop-${i}`}
              className={`bmc-milestone-stop bmc-stop-target-${i} ${isVisible ? "animated" : ""}`}
              style={{
                position: "absolute",
                left: `calc(50% - ${SVG_WIDTH / 2}px + ${p.x}px)`,
                top: p.y,
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              {/* 1. Bayangan Oval Kecil Di Bawah Pin di Atas Jalan */}
              <div
                style={{
                  position: "absolute",
                  left: "-50%",
                  top: "-4px",
                  width: pinDiameter * 1.2,
                  height: 6,
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: "50%",
                  filter: "blur(2px)",
                  transform: "translate(-18%, -50%)",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />

              {/* 2. Vertical Stem (Tiang Mini 3D Bergradient & Berbayangan) */}
              <div
                className="bmc-vertical-stem"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "-50%",
                  width: "4px",
                  height: isVisible ? stemHeight : 0,
                  background: `linear-gradient(180deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
                  transform: "translateX(-50%) scaleX(1)",
                  transformOrigin: "bottom center",
                  boxShadow: "2px 0 5px rgba(0,0,0,0.15)",
                  transition: "height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s",
                }}
              />

              {/* 3. Milestone Pin Body */}
              <div
                className="bmc-pin-head"
                style={{
                  position: "absolute",
                  bottom: isVisible ? stemHeight : 0,
                  left: "-50%",
                  width: pinDiameter,
                  height: pinDiameter,
                  borderRadius: "50%",
                  background: "white",
                  border: `3px solid ${PRIMARY}`,
                  boxShadow: `0 6px 14px ${SHADOW_COLOR}`,
                  transform: isVisible ? "translate(-50%, 50%) scale(1)" : "translate(-50%, 50%) scale(0.6)",
                  transformOrigin: "center center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), bottom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s, width 0.3s, height 0.3s",
                }}
              >
                {/* Inner Circle Accent */}
                <div
                  style={{
                    width: "45%",
                    height: "45%",
                    borderRadius: "50%",
                    background: ACCENT,
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                  }}
                />
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
      style={{
        background: `linear-gradient(180deg, #FFFFFF 0%, #F3F5F9 50%, #EAEFF5 100%)`,
        fontFamily: "'Roboto Condensed', 'Roboto', sans-serif",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKROUND BLURRED GLASS CIRCLES & DIGITAL NOISE PATTERN EFFECT */}
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", background: `${ACCENT}08`, filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "20%", right: "-10%", width: "45vw", height: "45vw", borderRadius: "50%", background: `${PRIMARY}05`, filter: "blur(120px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.015, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />

      {/* DYNAMIC HOVER STYLING INJECTIONS */}
      <style>{`
        .bmc-mobile-marker { display: none; }
        
        /* HOVER INTERACTIONS MECHANISM */
        ${milestones.map((_, idx) => `
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
        `).join("\n")}

        .bmc-floating-card:hover {
          transform: translateY(-8px);
          background-color: #ffffff !important;
          box-shadow: 0 20px 38px rgba(13, 31, 92, 0.12), inset 0 1px 0 rgba(255,255,255,1) !important;
          border-color: ${ACCENT}55 !important;
        }

        /* RESPONSIVE RENDERING STRUCTURE */
        @media (max-width: 820px) {
          .bmc-road-svg, .bmc-road-dot, .bmc-milestone-stop { display: none !important; }
          .bmc-row { grid-template-columns: 32px 1fr !important; padding: 24px 0 !important; }
          .bmc-left-col { display: none !important; }
          .bmc-right-col { padding: 0 0 0 16px !important; grid-column: 2 !important; width: 100% !important; }
          
          .bmc-mobile-marker {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            grid-column: 1 !important;
          }
          .bmc-mobile-dot {
            width: 16px; height: 16px; border-radius: 50%;
            background: ${ACCENT}; border: 3px solid white;
            box-shadow: 0 0 0 2px ${PRIMARY}22; flex-shrink: 0; margin-top: 20px;
          }
          .bmc-mobile-line {
            width: 3px; flex: 1; margin-top: 6px;
            background: linear-gradient(180deg, ${ROAD} 0%, rgba(191,196,204,0.1) 100%);
            border-radius: 2px;
          }
          .bmc-floating-card { text-align: left !important; }
          .bmc-floating-card li { flex-direction: row !important; }
        }
      `}</style>

      {/* ============================= HERO (ORIGINAL, UNCHANGED) ============================= */}
      <section
        style={{
          position: "relative",
          height: "40vh",
          minHeight: 380,
          display: "flex",
          alignItems: "flex-end",
          background: "#0D1F5C",
          overflow: "hidden",
        }}
      >
        <img
          src={blackimage}
          alt="BMC"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, #0D1F5C 40%, #0D1F5C80 70%, transparent)",
          }}
        />
        <button
          onClick={() => window.location.assign("/")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-999 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
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
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 80px 56px",
            maxWidth: 700,
          }}
        >
          <p
            style={{
              color: "#D4A843",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <a href="/" style={{ color: "#D4A843", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 6px" }}>&rsaquo;</span>
            <a href="/companyprofile" style={{ color: "#D4A843", textDecoration: "none" }}>About Us</a>
            <span style={{ margin: "0 6px" }}>&rsaquo;</span>
            <span style={{ color: "white" }}>History & Milestones</span>
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.05,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Our Journey
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
            Tracing the milestones that shaped PT Braja Mukti Cakra — from a single brake drum line to a multi-product automotive powerhouse.
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "flex",
            gap: 1,
          }}
        >
          {[["38+", "Years"], ["13", "Eras"], ["40+", "Milestones"]].map(
            ([num, label]) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  padding: "16px 28px",
                  textAlign: "center",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#D4A843",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ============================= TIMELINE REDESIGN AREA ============================= */}
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "80px 24px 120px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            style={{
              display: "inline-block",
              background: "#0D1F5C",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "6px 20px",
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            Since 1986
          </div>
          <h2
            style={{
              fontSize: clamp(32, '5vw', 42),
              fontWeight: 900,
              color: "#0D1F5C",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Four Decades of Excellence
          </h2>
          <p style={{ color: "#5a6375", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            A chronicle of innovation, certification, and growth in automotive components manufacturing.
          </p>
        </div>

        <WindingTimeline items={milestones} visibleItems={visibleItems} observerRef={observerRef} />

        {/* Footer callout (ORIGINAL, UNCHANGED) */}
        <div
          style={{
            marginTop: 96,
            background: "linear-gradient(135deg, #0D1F5C, #1a3a8a)",
            borderRadius: 16,
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                color: "#D4A843",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              The Journey Continues
            </div>
            <h3
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              PT Braja Mukti Cakra
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "8px 0 0" }}>
              Driving the future of Indonesian automotive manufacturing.
            </p>
          </div>
          <a
            href="/companyprofile"
            style={{
              background: "#D4A843",
              color: "#0D1F5C",
              padding: "12px 28px",
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            About Us →
          </a>
        </div>
      </div>
    </div>
  );
};

// Helper utility function for CSS clamp fluid type natively inside inline-styles
function clamp(min, val, max) {
  return `clamp(${min}px, ${val}, ${max}px)`;
}

export default Milestone;