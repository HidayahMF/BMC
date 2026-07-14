import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FACILITIES, CAT_COLOR, sortFacilities } from "../data/MachiningData";

/* ─── PREVIEW SELECTION ──────────────────────────────────
   1 dari Machining Center (Robot Disc Brake)
   7 dari Quality & Inspection Lab (semua item lab QC)
────────────────────────────────────────────────────────── */
const PREVIEW_NAMES = [
  "Robot Disc Brake",           // Machining Center
  "Photomicroscope",            // Quality & Inspection Lab
  "Hardness Vickers/Rockwell",  // Quality & Inspection Lab
  "Hardness Brinell",           // Quality & Inspection Lab
  "Surfcom",                    // Quality & Inspection Lab
  "CMM Accura",                 // Quality & Inspection Lab
  "CMM Accretech",              // Quality & Inspection Lab
  "CMM Hexagon",                // Quality & Inspection Lab
];

function FacilityCard({ item, index }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const cc = CAT_COLOR[item.category] || CAT_COLOR["Machining Center"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${(index % 8) * 70}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="relative overflow-hidden rounded-2xl bg-[#0D1F5C] group cursor-pointer aspect-[4/3]"
    >
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out"
        style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
      />
      {/* gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(180deg, rgba(13,31,92,0) 40%, rgba(13,31,92,0.92) 100%)",
          opacity: hov ? 1 : 0.85,
        }}
      />
      {/* category badge */}
      <div
        className="absolute top-3 left-3 text-[0.56rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
        style={{ background: cc.bg, color: cc.text }}
      >
        {item.category}
      </div>
      {/* title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-[0.82rem] font-bold uppercase tracking-wide leading-tight">
          {item.name}
        </p>
        <div
          className="h-[2px] bg-[#D4A843] mt-2 origin-left transition-transform duration-300"
          style={{ transform: hov ? "scaleX(1)" : "scaleX(0.25)" }}
        />
      </div>
    </div>
  );
}

const MachiningSection = () => {
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Ambil item preview berdasarkan PREVIEW_NAMES, lalu urutkan
  // dengan prioritas Quality > Japan > Korea > Other (dari MachiningData.js)
  const preview = sortFacilities(
    FACILITIES.filter((f) => PREVIEW_NAMES.includes(f.name))
  );

  return (
    <section className="bg-[#0A1642] py-20 font-condensed relative overflow-hidden">
      {/* decorative bg grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative">
        {/* Heading */}
        <div
          className="text-center mb-12"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
            State-of-the-Art Manufacturing
          </p>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-white uppercase tracking-[0.03em] leading-[1.1] mb-4">
            Machining Facilities
          </h2>
          <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto mb-5 rounded-sm" />
          <p className="text-[0.86rem] text-[#AEB8DA] max-w-xl mx-auto">
            Dilengkapi lini produksi, mesin CNC presisi tinggi, dan laboratorium kontrol kualitas berstandar internasional.
          </p>
        </div>

        {/* Preview grid */}
        <div
          className="grid gap-5 mb-12"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {preview.map((item, i) => (
            <FacilityCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center"
          style={{
            opacity: entered ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          <button
            onClick={() => navigate("/machiningfacilities")}
            className="px-10 py-[14px] bg-[#D4A843] text-[#0A1642] border-none rounded-[9px] text-[0.78rem] font-bold tracking-[0.1em] uppercase font-condensed cursor-pointer hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Lihat Semua Fasilitas ({FACILITIES.length}) →
          </button>
        </div>
      </div>
    </section>
  );
};

export default MachiningSection;