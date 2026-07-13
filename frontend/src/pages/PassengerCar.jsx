import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import blackimage from "../assets/blackimage.jpg";
import passengerCarDiagram from "../assets/PassengerCarDiagram.png"; // TODO: ganti sesuai file diagram mobil kamu
import discBrake from "../assets/Disc Brake.png";
import drumBrake from "../assets/Drum Brake.png";
import axleassy from "../assets/axleassy.png";
import hubAssy from "../assets/Hub Assy.png";
import rotorBrake from "../assets/Rotor Brake.png";
import knuckleSteering from "../assets/Knuckle Steering.png";
import caseBearing from "../assets/Case Bearing.png";
import bracketEngine from "../assets/Bracket Engine.png";
import bmc2 from "../assets/bmc2.jpg";


/* ─── CATEGORY COLORS ── */
const CAT_COLOR = {
  Brake:     { bg: "#FEECEC", text: "#A32D2D", dot: "#EF4444" },
  Axle:      { bg: "#FFF3E0", text: "#8B4513", dot: "#F97316" },
  Wheel:     { bg: "#E8F4FD", text: "#0D6B8A", dot: "#0EA5E9" },
  Steering:  { bg: "#F0EEFF", text: "#534AB7", dot: "#8B5CF6" },
  Bearing:   { bg: "#F4F4F4", text: "#444444", dot: "#6B7280" },
  Engine:    { bg: "#FFF8E7", text: "#92650A", dot: "#F59E0B" },
};


const HOTSPOTS = [
  // Baris 1
  { id: 1, name: "Disc Brake",       category: "Brake",    image: discBrake,       x: 20, y: 30 },
  { id: 2, name: "Drum Brake",       category: "Brake",    image: drumBrake,       x: 40, y: 30 },
  { id: 3, name: "Rotor Brake",      category: "Brake",    image: rotorBrake,      x: 60, y: 30 },
  { id: 4, name: "Axle Assy",        category: "Axle",     image: axleassy,        x: 80, y: 30 },

  // Baris 2
  { id: 5, name: "Hub Assy",         category: "Wheel",    image: hubAssy,         x: 20, y: 65 },
  { id: 6, name: "Knuckle Steering", category: "Steering", image: knuckleSteering, x: 40, y: 65 },
  { id: 7, name: "Case Bearing",     category: "Bearing",  image: caseBearing,     x: 60, y: 65 },
  { id: 8, name: "Bracket Engine",   category: "Engine",   image: bracketEngine,   x: 80, y: 65 },
];
/* ─── LEGEND ── */
const LEGEND = [
  { label: "Brake System", dot: "#EF4444" },
  { label: "Axle",         dot: "#F97316" },
  { label: "Wheel / Hub",  dot: "#0EA5E9" },
  { label: "Steering",     dot: "#8B5CF6" },
  { label: "Bearing",      dot: "#6B7280" },
  { label: "Engine",       dot: "#F59E0B" },
];

/* ─── PULSE DOT ── */
function PulseDot({ color, active }) {
  return (
    <span className="relative flex items-center justify-center w-5 h-5">
      <span
        className="absolute inline-flex rounded-full opacity-60 animate-ping"
        style={{ width: 20, height: 20, background: color }}
      />
      <span
        className="relative inline-flex rounded-full border-2 border-white transition-transform duration-200"
        style={{
          width: active ? 14 : 10,
          height: active ? 14 : 10,
          background: color,
          boxShadow: active ? `0 0 0 3px ${color}55` : "none",
        }}
      />
    </span>
  );
}

/* ─── MAIN COMPONENT ── */
const PassengerCar = () => {
  const [active, setActive]   = useState(null);
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const activeSpot = HOTSPOTS.find((h) => h.id === active);
  const cc = activeSpot ? (CAT_COLOR[activeSpot.category] || CAT_COLOR.Engine) : null;

  return (
    <div className="bg-white font-condensed">
      {/* ── HERO ── */}
    <section
  id="parts-hero"
  className="relative h-[40vh] min-h-80 flex items-end bg-[#0D1F5C] overflow-hidden"
>
  <img
    src={bmc2}
    alt="BMC Passenger Car Parts"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
  />

  {/* Left Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F5C]/80 via-[#0D1F5C]/40 to-transparent" />

  {/* Bottom Gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F5C]/70 via-transparent to-transparent" />

  {/* Back Button */}
  <button
    onClick={() => navigate("/")}
    className="absolute top-6 left-6 md:top-8 md:left-10 z-50 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
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
    className="relative z-10 px-6 md:px-20 pb-14 max-w-3xl"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    {/* Breadcrumb */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4 flex items-center">
      <a href="/" className="hover:text-white/90">
        Home
      </a>

      <ChevronRight size={12} className="mx-1" />

      <a href="/parts" className="hover:text-white/90">
        Parts
      </a>

      <ChevronRight size={12} className="mx-1" />

      <span className="text-white">Passenger Car</span>
    </p>

    {/* Subtitle */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
      PT Braja Mukti Cakra
    </p>

    {/* Title */}
    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4 drop-shadow-lg">
      Passenger Car Parts
    </h1>

    {/* Description */}
    <p className="text-white/70 text-[16px] leading-relaxed max-w-lg drop-shadow-md">
      Precision Engineering for Everyday Driving Comfort
    </p>
  </div>
</section>

      <section className="bg-[#F4F6FC] py-16 font-condensed">
        <div className="max-w-[1280px] mx-auto px-6">

          {/* ── HEADING ── */}
          <div
            className="text-center mb-10"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
              Passenger Car Parts
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#0D1F5C] uppercase tracking-[0.03em] leading-none mb-3">
              Diagram Spare Part
            </h2>
            <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto mb-4 rounded-sm" />
            <p className="text-[0.82rem] text-[#6B7A9E] max-w-lg mx-auto">
              Klik titik pada diagram untuk melihat detail komponen dan posisinya pada kendaraan
            </p>
          </div>

          {/* ── LEGEND ── */}
          <div
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8"
            style={{ opacity: entered ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}
          >
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.dot }} />
                <span className="text-[0.68rem] text-[#6B7A9E] font-semibold uppercase tracking-wider">
                  {l.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── MAIN DIAGRAM + PANEL ── */}
          <div
            className="flex flex-col xl:flex-row gap-6 items-start"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            {/* ── DIAGRAM AREA ── */}
            <div
              className="relative w-full xl:flex-1 rounded-2xl overflow-hidden border border-[#DDE1EF] bg-white"
              style={{ boxShadow: "0 4px 24px rgba(13,31,92,0.08)" }}
            >
              <div className="absolute top-3 left-3 z-10 text-[0.58rem] font-bold tracking-widest uppercase text-[#0D1F5C] bg-[#D4A843]/90 px-2 py-1 rounded-md">
                Passenger Car
              </div>

              {/* Car image */}
              <div className="relative w-full select-none" style={{ paddingTop: "52%" }}>
                <img
                  src={passengerCarDiagram}
                  alt="Passenger Car Diagram"
                  className="absolute left-0 top-0 h-full w-full object-contain p-4"
                  draggable={false}
                />

                {/* ── HOTSPOTS ── */}
                {HOTSPOTS.map((spot, i) => {
                  const isActive = active === spot.id;
                  const dotColor = (CAT_COLOR[spot.category] || CAT_COLOR.Engine).dot;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActive(isActive ? null : spot.id)}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
                      style={{
                        left: `${spot.x}%`,
                        top:  `${spot.y}%`,
                        animationDelay: `${i * 80}ms`,
                      }}
                      aria-label={spot.name}
                    >
                      <PulseDot color={dotColor} active={isActive} />

                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md text-[0.6rem] font-bold uppercase tracking-wide text-white bg-[#0D1F5C] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                      >
                        {spot.name}
                        <span
                          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                          style={{ borderTopColor: "#0D1F5C" }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {!active && (
                <div className="flex items-center justify-center gap-2 py-3 border-t border-[#DDE1EF]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7A9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                  </svg>
                  <p className="text-[0.68rem] text-[#6B7A9E] font-semibold uppercase tracking-wider">
                    Klik titik warna untuk melihat detail komponen
                  </p>
                </div>
              )}
            </div>

            {/* ── DETAIL PANEL ── */}
            <div
              className="w-full xl:w-[320px] shrink-0"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(16px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: active ? "auto" : "none",
              }}
            >
              {activeSpot && (
                <div
                  className="rounded-2xl overflow-hidden border border-[#DDE1EF]"
                  style={{ boxShadow: "0 8px 32px rgba(13,31,92,0.10)" }}
                >
                  <div className="bg-[#0D1F5C] px-5 py-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.56rem] text-[#D4A843] font-bold tracking-[0.18em] uppercase mb-1">
                        Detail Komponen
                      </p>
                      <h3 className="text-[1rem] font-bold text-white uppercase tracking-wide leading-tight">
                        {activeSpot.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="shrink-0 w-8 h-8 rounded-full bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Tutup"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-[#F8F9FD] border-b border-[#DDE1EF] flex items-center justify-center p-6 min-h-[180px]">
                    <img
                      src={activeSpot.image}
                      alt={activeSpot.name}
                      className="max-h-[160px] max-w-full object-contain"
                      style={{
                        filter: "drop-shadow(0 4px 12px rgba(13,31,92,0.12))",
                        animation: "partSlideIn 0.35s ease",
                      }}
                    />
                  </div>

                  <div className="bg-white p-5">
                    <span
                      className="inline-block text-[0.58rem] font-bold tracking-widest uppercase px-3 py-[3px] rounded-full mb-4"
                      style={{ background: cc.bg, color: cc.text }}
                    >
                      {activeSpot.category}
                    </span>

                    <div className="rounded-xl overflow-hidden border border-[#DDE1EF] mb-4">
                      {[
                        { label: "Nama",     val: activeSpot.name },
                        { label: "Kategori", val: activeSpot.category },
                        { label: "Standar",  val: "ISO 9001:2015" },
                      ].map((row, i, arr) => (
                        <div
                          key={i}
                          className={`flex ${i < arr.length - 1 ? "border-b border-[#DDE1EF]" : ""}`}
                        >
                          <div className="w-[40%] shrink-0 px-3 py-2.5 text-[0.65rem] font-bold text-[#6B7A9E] uppercase tracking-widest bg-[#F4F6FC]">
                            {row.label}
                          </div>
                          <div className="flex-1 px-3 py-2.5 text-[0.75rem] text-[#0D1F5C] font-semibold">
                            {row.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F4F6FC] border border-[#DDE1EF]">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cc.dot }} />
                      <p className="text-[0.68rem] text-[#6B7A9E] font-semibold">
                        Kategori:&nbsp;
                        <strong className="text-[#0D1F5C]">{activeSpot.category}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── PARTS QUICK GRID ── */}
          <div className="mt-10" style={{ opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
            <h3 className="text-[0.65rem] font-bold text-[#6B7A9E] tracking-[0.18em] uppercase mb-4">
              Semua Komponen ({HOTSPOTS.length})
            </h3>
            <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}>
              {HOTSPOTS.map((spot, i) => {
                const isActive = active === spot.id;
                const dotColor = (CAT_COLOR[spot.category] || CAT_COLOR.Engine).dot;
                const bgColor  = (CAT_COLOR[spot.category] || CAT_COLOR.Engine).bg;
                const txColor  = (CAT_COLOR[spot.category] || CAT_COLOR.Engine).text;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActive(isActive ? null : spot.id)}
                    className="text-left rounded-xl px-3 py-2.5 border-[1.5px] transition-all duration-200 cursor-pointer font-condensed"
                    style={{
                      background: isActive ? "#0D1F5C" : "white",
                      borderColor: isActive ? "#0D1F5C" : "#DDE1EF",
                      boxShadow: isActive
                        ? "0 4px 16px rgba(13,31,92,0.18)"
                        : "0 1px 4px rgba(13,31,92,0.04)",
                      animationDelay: `${i * 30}ms`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: isActive ? "#D4A843" : dotColor }}
                      />
                      <span
                        className="text-[0.68rem] font-bold uppercase tracking-wide leading-tight"
                        style={{ color: isActive ? "white" : "#0D1F5C" }}
                      >
                        {spot.name}
                      </span>
                    </div>
                    <span
                      className="mt-1.5 inline-block text-[0.55rem] font-bold tracking-widest uppercase px-2 py-[2px] rounded-full"
                      style={
                        isActive
                          ? { background: "rgba(255,255,255,0.12)", color: "#D4A843" }
                          : { background: bgColor, color: txColor }
                      }
                    >
                      {spot.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes partSlideIn {
            from { opacity: 0; transform: scale(0.88) translateY(10px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);    }
          }
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          .animate-ping { animation: ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
        `}</style>
      </section>
    </div>
  );
};

export default PassengerCar;