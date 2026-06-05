import React, { useState, useEffect, useRef } from "react";
import { Truck, Car, HardHat, Wheat, Settings, Globe, ArrowRight, Play, ChevronRight } from "lucide-react";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";
import bmcvideo from "../assets/bmcvideo.mp4";

/* ─── DATA ─────────────────────────────────── */
const slides = [
  { type: "video", src: bmcvideo, tag: "PRECISION MANUFACTURING", title: ["Engineered", "for Excellence"], sub: "Supplying mission-critical components to Mitsubishi, Hino, Isuzu & more", cta: "Explore Products" },
  { type: "image", src: home1, tag: "AUTOMOTIVE OEM & REM", title: ["Built for", "Every Drive"], sub: "High-precision parts for commercial cars and passenger vehicles", cta: "View Products" },
  { type: "image", src: home2, tag: "HEAVY EQUIPMENT", title: ["Power the", "Industry"], sub: "Durable components trusted across heavy equipment & agribusiness sectors", cta: "Learn More" },
  { type: "image", src: home3, tag: "GLOBAL EXPORTS", title: ["Made in", "Indonesia"], sub: "Exporting to Japan, Malaysia, Philippines, Thailand, Italy and beyond", cta: "Our Markets" },
  { type: "image", src: home4, tag: "ISO CERTIFIED", title: ["Quality You", "Can Trust"], sub: "Rigorous quality control at every step of the manufacturing process", cta: "About BMC" },
];

const stats = [
  { value: "1986", label: "Est. Year", sub: "Decades of precision" },
  { value: "200+", label: "Employees", sub: "Skilled professionals" },
  { value: "5+", label: "Export Countries", sub: "Global footprint" },
  { value: "OEM/REM", label: "Market Segments", sub: "Dual market capability" },
];

const markets = [
  { Icon: Truck, title: "Commercial Vehicle", desc: "Engine, transmission & chassis components for trucks and commercial vehicles" },
  { Icon: Car, title: "Passenger Car", desc: "Precision machined parts for sedans, MPVs and compact cars" },
  { Icon: HardHat, title: "Heavy Equipment", desc: "High-strength components for construction and industrial machinery" },
  { Icon: Wheat, title: "Agribusiness", desc: "Reliable parts engineered for tractors and agricultural equipment" },
  { Icon: Settings, title: "General Machining", desc: "Custom machined components for various industrial applications" },
  { Icon: Globe, title: "Export Markets", desc: "Trusted supplier across Japan, Malaysia, Philippines, Thailand & Italy" },
];

const clients = ["Mitsubishi", "Hino", "Isuzu", "Yanmar", "Daihatsu", "Toyota", "Nissan", "Proton"];
const gallery = [
  { src: home2, label: "Machining Floor" },
  { src: home3, label: "Quality Lab" },
  { src: home4, label: "Assembly Line" },
];

/* ─── HERO SLIDER ───────────────────────────── */
function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const [txtIn, setTxtIn] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const progRef = useRef(null);
  const DURATION = 6000;

  const goTo = (next) => {
    if (fading) return;
    setFading(true); setTxtIn(false); setProgress(0);
    clearTimeout(timerRef.current); clearInterval(progRef.current);
    setTimeout(() => {
      setCur(typeof next === "function" ? next : next);
      setFading(false);
      setTimeout(() => setTxtIn(true), 60);
    }, 480);
  };

  useEffect(() => {
    clearInterval(progRef.current);
    let p = 0; setProgress(0);
    progRef.current = setInterval(() => {
      p += 100 / (DURATION / 50);
      if (p >= 100) { clearInterval(progRef.current); p = 100; }
      setProgress(p);
    }, 50);
    timerRef.current = setTimeout(() => goTo((cur + 1) % slides.length), DURATION);
    return () => { clearTimeout(timerRef.current); clearInterval(progRef.current); };
  }, [cur]);

  useEffect(() => {
    if (slides[cur].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  }, [cur]);

  const slide = slides[cur];

  return (
    <div className="relative w-full overflow-hidden bg-[#0D1F5C]" style={{ height: "78vh", minHeight: "520px", maxHeight: "860px" }}>

      {/* media */}
      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: fading ? 0 : 1 }}>
        {slide.type === "video"
          ? <video ref={videoRef} src={slide.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          : <img src={slide.src} alt="" className="w-full h-full object-cover" />}
      </div>

      {/* overlays */}
      <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(110deg, rgba(13,31,92,0.9) 30%, rgba(13,31,92,0.5) 58%, rgba(13,31,92,0.15) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[50%] z-[2]" style={{ background: "linear-gradient(to top, rgba(13,31,92,0.8), transparent)" }} />


      {/* content */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: "clamp(2rem, 6vw, 7rem)", top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "clamp(280px, 38vw, 500px)",
          opacity: txtIn ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          willChange: "opacity, transform",
        }}
      >
        <span className="text-[#D4A843] font-[600] uppercase tracking-[0.12em] mb-3 font-['Roboto Condensed',sans-serif]" style={{ fontSize: "0.62rem" }}>

          {slide.tag}
        </span>
        <h1 className="flex flex-col font-[500] uppercase text-white leading-[1.02] mb-4 font-['Roboto Condensed',sans-serif]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", letterSpacing: "0em" }}>


          {slide.title.map((l, i) => <span key={i}>{l}</span>)}
        </h1>
        <p className="text-[rgba(200,214,240,0.82)] leading-relaxed mb-6 font-['Roboto Condensed',sans-serif]" style={{ fontWeight: 400, fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)" }}>

          {slide.sub}
        </p>
        <button className="group inline-flex items-center gap-2.5 self-start bg-[#D4A843] text-[#0D1F5C] font-[600] uppercase tracking-[0.08em] px-5 py-2.5 rounded-sm text-xs hover:bg-white transition-all duration-200 hover:-translate-y-0.5 font-['Roboto Condensed',sans-serif]">

          {slide.cta}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* counter top-right */}
      <div className="absolute top-8 right-8 z-10 flex flex-col items-end">

        <span className="text-[#D4A843] font-[black] leading-none" style={{ fontSize: "2.8rem" }}>{String(cur + 1).padStart(2, "0")}</span>
        <span className="text-white/30 text-xs tracking-widest">/ {String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* arrows */}
      {[{ side: "left", fn: () => goTo((cur - 1 + slides.length) % slides.length) }, { side: "right", fn: () => goTo((cur + 1) % slides.length) }].map(({ side, fn }) => (
        <button key={side} onClick={fn}
          className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white cursor-pointer backdrop-blur-sm hover:bg-[#D4A843] hover:border-[#D4A843] hover:text-[#0D1F5C] transition-all duration-200 ${side === "left" ? "left-4" : "right-4"}`}
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            {side === "left"
              ? <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </button>
      ))}

      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 pb-5">
        <div className="flex gap-2 items-end">
          {slides.map((s, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`relative overflow-hidden flex-shrink-0 p-0 cursor-pointer rounded-sm border-[1.5px] transition-all duration-200 ${i === cur ? "border-[#D4A843] -translate-y-1" : "border-white/20 hover:-translate-y-0.5"}`}
              style={{ width: 64, height: 42, background: "#162B7A" }}
            >
              {s.type === "video"
                ? <span className="flex items-center justify-center w-full h-full text-[#D4A843]"><Play size={14} fill="currentColor" /></span>
                : <img src={s.src} alt="" className={`w-full h-full object-cover transition-opacity duration-200 ${i === cur ? "opacity-100" : "opacity-60"}`} />}
              {i === cur && <div className="absolute bottom-0 left-0 h-[3px] bg-[#D4A843] rounded-r-sm" style={{ width: `${progress}%`, transition: "width 0.05s linear" }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─────────────────────────────── */
function StatCard({ value, label, sub, index }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {

    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8 relative"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${index * 100}ms, transform 1s ease ${index * 200}ms` }}>
      <span className="font-bold text-white font-['Roboto_Condensed'] leading-none mb-1" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)" }}>{value}</span>


      <span className="text-[#D4A843] font-bold font-['Roboto_Condensed'] uppercase tracking-[0.08em] mb-1.5" style={{ fontSize: "0.68rem" }}>{label}</span>

      <span className="text-white/40 text-xs font-['Roboto_Condensed']">{sub}</span>
    </div>
  );
}

/* ─── MARKET CARD ───────────────────────────── */
function MarketCard({ Icon, title, desc, index }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative bg-white border border-[#eef0f8] cursor-pointer overflow-hidden"
      style={{
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.25s`,
        boxShadow: hov ? "0 16px 40px rgba(13,31,92,0.12)" : "0 2px 12px rgba(13,31,92,0.05)",
      }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4A843]"
        style={{ transform: hov ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.25s ease", transformOrigin: "left" }} />

      <div className="p-7 font-['Roboto Condensed',sans-serif]">
        {/* icon */}

        <div className="w-11 h-11 flex items-center justify-center mb-5 rounded-sm"
          style={{ background: hov ? "#0D1F5C" : "#f0f3fb", transition: "background 0.25s" }}>
          <Icon size={20} style={{ color: hov ? "#D4A843" : "#0D1F5C", transition: "color 0.25s" }} />
        </div>
        <h3 className="font-bold uppercase text-[#0D1F5C] mb-2.5 tracking-[0.01em]" style={{ fontSize: "1rem" }}>{title}</h3>

        <p className="text-[#6b7a9e] leading-relaxed mb-5" style={{ fontWeight: 400, fontSize: "0.83rem", fontFamily: "'Roboto Condensed',sans-serif" }}>{desc}</p>

        <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-widest"
          style={{ color: hov ? "#D4A843" : "#aab4d0", transition: "color 0.2s" }}>
          Learn More <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}



/* ─── HOME ──────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-[#F4F6FC]">
      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-track { animation: marquee 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ══ HERO SLIDER ══ */}

      <HeroSlider />

      {/* ══ STATS — dark navy, clean numbers ══ */}
      <section className="bg-[#0D1F5C]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 font-[600] font-['Roboto Condensed',sans-serif]">
            {stats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
          </div>

        </div>
      </section>
    </div>
  );
}

