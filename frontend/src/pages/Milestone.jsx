import React, { useEffect, useRef, useState } from "react";
import blackimage from "../assets/blackimage.jpg";

const milestones = [
  {
    period: "1986–1987",
    color: "#1a5cad",
    tag: "Founding",
    events: [
      "Establishment of PT BMC (1986)",
      "Start Commercial Production Brake Drum (1987)",
    ],
  },
  {
    period: "1989–1992",
    color: "#2a7a3c",
    tag: "Early Growth",
    events: [
      "Installed Machineries for Fly Wheel (1989)",
      "Brake Drum Medium Truck (1992)",
    ],
  },
  {
    period: "2002–2009",
    color: "#5a3ea0",
    tag: "Certification Era",
    events: [
      "Received ISO 9001 Certification (2002)",
      "Start Production Hino Part, Hook Frame (2008)",
      "Received ISO TS 16949 Certification (2009)",
    ],
  },
  {
    period: "2010–2012",
    color: "#c0392b",
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
    color: "#2471a3",
    tag: "Quality",
    events: [
      "OHSAS 18001 Certified",
      "Project Knuckle Export to Mitsubishi Japan",
    ],
  },
  {
    period: "2014–2015",
    color: "#e67e22",
    tag: "New Products",
    events: [
      "Expansion New Line Multi Purpose",
      "Commercial Production Knuckle Mitsubishi",
    ],
  },
  {
    period: "2016",
    color: "#27ae60",
    tag: "Milestones",
    events: [
      "QCM Brake Assy",
      "Commercial Production TD Brake Change",
      "Dev FM/FN Models",
    ],
  },
  {
    period: "2017",
    color: "#d4a017",
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
    color: "#16a085",
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
    color: "#1f3a93",
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
    color: "#6c3483",
    tag: "Diversification",
    events: [
      "Dev IGCE Parts",
      "Dev Euro 4 Part for Mitsubishi, HMMI & Isuzu",
      "Trading Part Fuso Value Project",
    ],
  },
  {
    period: "2022–2023",
    color: "#0e6655",
    tag: "Sustainability",
    events: [
      "Kick Off X-Force Development MMKI",
      "Massprod Product Euro-4 All Customer",
      "Installed Rooftop Solar PV 317.7 kWp (Dev. Renewable New Energy)",
    ],
  },
  {
    period: "2024–2025",
    color: "#7d3c98",
    tag: "Innovation",
    events: [
      "Dev SCTB Parts For Drum Brake",
      "Dev Sourcing Part (Front Grill)",
      "Dev Integrate Machine Robotic",
    ],
  },
];

function MilestoneCard({ item, index, isVisible }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className="milestone-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        alignItems: "start",
        marginBottom: "0",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(32px)`,
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
      }}
    >
      {/* Left content */}
      <div style={{ padding: "0 24px 0 0", textAlign: "right" }}>
        {isLeft ? (
          <CardContent item={item} align="right" />
        ) : null}
      </div>

      {/* Center spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: item.color,
            border: "3px solid white",
            boxShadow: `0 0 0 3px ${item.color}40`,
            zIndex: 2,
            marginTop: 16,
            flexShrink: 0,
          }}
        />
        {/* Line segment */}
        <div
          style={{
            width: 2,
            flex: 1,
            minHeight: 48,
            background: `linear-gradient(180deg, ${item.color}80, ${item.color}20)`,
            marginTop: 4,
          }}
        />
      </div>

      {/* Right content */}
      <div style={{ padding: "0 0 0 24px" }}>
        {!isLeft ? (
          <CardContent item={item} align="left" />
        ) : null}
      </div>
    </div>
  );
}

function CardContent({ item, align }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        border: `1px solid ${item.color}25`,
        borderLeft: align === "left" ? `4px solid ${item.color}` : undefined,
        borderRight: align === "right" ? `4px solid ${item.color}` : undefined,
        padding: "14px 18px",
        marginTop: 6,
        boxShadow: `0 2px 12px ${item.color}12`,
        textAlign: align,
      }}
    >
      {/* Tag pill */}
      <div
        style={{
          display: "inline-block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: item.color,
          background: `${item.color}14`,
          borderRadius: 20,
          padding: "3px 10px",
          marginBottom: 6,
        }}
      >
        {item.tag}
      </div>

      {/* Period */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: item.color,
          lineHeight: 1,
          marginBottom: 10,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.period}
      </div>

      {/* Events */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {item.events.map((ev, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 7,
              fontSize: 13,
              color: "#3a3a4a",
              lineHeight: 1.5,
              marginBottom: i < item.events.length - 1 ? 5 : 0,
              flexDirection: align === "right" ? "row-reverse" : "row",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
                marginTop: 7,
              }}
            />
            <span>{ev}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
            const idx = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const rows = document.querySelectorAll("[data-milestone-row]");
    rows.forEach((row) => observerRef.current.observe(row));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#f6f7fa",
        fontFamily: "'Roboto Condensed', 'Roboto', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
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
            <a href="/aboutus" style={{ color: "#D4A843", textDecoration: "none" }}>About Us</a>
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

        {/* Stats bar */}
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

      {/* TIMELINE */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
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
              fontSize: 36,
              fontWeight: 800,
              color: "#0D1F5C",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Four Decades of Excellence
          </h2>
          <p style={{ color: "#7a7a8a", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            A chronicle of innovation, certification, and growth in automotive components manufacturing.
          </p>
        </div>

        {/* Timeline container */}
        <div style={{ position: "relative" }}>
          {/* Central spine line */}
          <div
            style={{
              position: "absolute",
              left: "calc(50% - 1px)",
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(180deg, #0D1F5C20, #0D1F5C40 20%, #0D1F5C40 80%, #0D1F5C10)",
              zIndex: 0,
            }}
          />

          {milestones.map((item, index) => (
            <div
              key={item.period}
              data-milestone-row
              data-index={index}
              ref={(el) => {
                if (el && observerRef.current) {
                  el.dataset.index = index;
                  observerRef.current.observe(el);
                }
              }}
            >
              <MilestoneCard
                item={item}
                index={index}
                isVisible={visibleItems.has(index)}
              />
            </div>
          ))}
        </div>

        {/* Footer callout */}
        <div
          style={{
            marginTop: 72,
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
            href="/aboutus"
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

export default Milestone;