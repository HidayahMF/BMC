import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import blackimage from "../assets/blackimage.jpg";

import ktb from "../assets/ktb.png";
import fuso from "../assets/fuso.png";
import mkm from "../assets/mkm.png";
import mitsubishi from "../assets/mitsubishi.png";
import hino from "../assets/hino.png";
import isuzu from "../assets/isuzu.png";
import exedy from "../assets/exedy.png";
import marugo from "../assets/marugo.png";
import bina from "../assets/bina.png";
import yanmar from "../assets/yanmar.png";
import komatsu from "../assets/komatsu.png";
import bakrie from "../assets/bakrie.png";
import igc from "../assets/IGC.png";

/* ─── DATA MITRA — dikelompokkan per kategori ── */
const PARTNERS = [
  { name: "Hino",             logo: hino,       category: "Automotive OEM" },
  { name: "Mitsubishi Fuso",  logo: fuso,       category: "Automotive OEM" },
  { name: "Isuzu",            logo: isuzu,      category: "Automotive OEM" },
  { name: "Mitsubishi",       logo: mitsubishi, category: "Automotive OEM" },
  { name: "KTB",              logo: ktb,        category: "Automotive OEM" },
  { name: "MKM",              logo: mkm,        category: "Automotive OEM" },
  { name: "Yanmar",           logo: yanmar,     category: "Heavy Equipment" },
  { name: "Komatsu",          logo: komatsu,    category: "Heavy Equipment" },
  { name: "Exedy",            logo: exedy,      category: "Component Partner" },
  { name: "Marugo",           logo: marugo,     category: "Component Partner" },
  { name: "Bina Usaha Mandiri Mizusawa", logo: bina,   category: "Group & Affiliate" },
  { name: "Bakrie Autoparts", logo: bakrie,     category: "Group & Affiliate" },
  { name: "IGC",              logo: igc,        category: "Group & Affiliate" },
];

const CATEGORIES = ["All", "Automotive OEM", "Heavy Equipment", "Component Partner", "Group & Affiliate"];

const CAT_COLOR = {
  "Automotive OEM":     { bg: "#FEECEC", text: "#A32D2D" },
  "Heavy Equipment":    { bg: "#FFF3E0", text: "#8B4513" },
  "Component Partner":  { bg: "#EBF5FF", text: "#185FA5" },
  "Group & Affiliate":  { bg: "#F3F0FF", text: "#5C3D9E" },
};

/* ─── PARTNER LOGO CARD ── */
function PartnerCard({ item, index }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const cc = CAT_COLOR[item.category] || CAT_COLOR["Automotive OEM"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
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
        transitionDelay: `${(index % 10) * 45}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      className={[
        "relative rounded-2xl bg-white border-[1.5px] flex flex-col items-center justify-center h-[150px] px-6 pt-6 pb-4 overflow-hidden",
        hov ? "border-[#D4A843] shadow-[0_14px_32px_rgba(13,31,92,0.10)]" : "border-[#E3E7F3] shadow-[0_2px_10px_rgba(13,31,92,0.04)]",
      ].join(" ")}
    >
      <img
        src={item.logo}
        alt={item.name}
        className="max-h-[60px] max-w-full object-contain transition-transform duration-300 ease-out"
        style={{
          transform: hov ? "scale(1.15)" : "scale(1)",
        }}
      />
      <p
        className="mt-3 text-[0.62rem] font-bold uppercase tracking-widest transition-colors duration-200 text-center leading-tight"
        style={{ color: hov ? "#0D1F5C" : "#8B96C0" }}
      >
        {item.name}
      </p>
    </div>
  );
}

/* ─── MAIN PAGE ── */
const MitraPage = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("All");

  const filtered = PARTNERS.filter(
    (p) => activeCat === "All" || p.category === activeCat
  );

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="font-condensed">
      {/* ── HERO ── */}
      <section
        id="mitra-hero"
        className="relative h-[40vh] min-h-80 flex items-end bg-[#0D1F5C] overflow-hidden"
      >
        <img
          src={blackimage}
          alt="BMC"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F5C] via-[#0D1F5C]/80 to-transparent" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-999 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </button>

        <div className="relative z-10 px-6 md:px-20 pb-14 max-w-3xl">
          <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4 flex items-center">
            <a href="/" className="hover:text-white/90">Home</a>
            <ChevronRight size={12} className="mx-1" />
            <a href="/companyprofile" className="hover:text-white/90">About Us</a>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-white">Mitra & Pelanggan</span>
          </p>
          <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
            PT Braja Mukti Cakra
          </p>
          <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4">
            Mitra &amp; Pelanggan
          </h1>
          <p className="text-white/50 text-[16px] leading-relaxed max-w-lg">
            Dipercaya oleh Produsen Otomotif dan Alat Berat Kelas Dunia
          </p>
        </div>
      </section>

      {/* ── PARTNERS GRID ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
              Strategic Partnerships
            </p>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold text-[#0D1F5C] uppercase tracking-[0.03em] leading-[1.1] mb-4">
              Our Partners &amp; Customers
            </h2>
            <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto rounded-sm" />
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12">
            {[
              { n: `${PARTNERS.length}+`, l: "Mitra & Pelanggan" },
              { n: "4", l: "Kategori Kerja Sama" },
              { n: "OEM & REM", l: "Cakupan Pasar" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-[1.8rem] font-bold text-[#0D1F5C] leading-none mb-1">{s.n}</p>
                <p className="text-[0.62rem] text-[#8B96C0] uppercase tracking-widest font-semibold">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const active = activeCat === cat;
              const count = cat === "All" ? PARTNERS.length : PARTNERS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={[
                    "px-5 py-[9px] rounded-full border-[1.5px] text-[0.7rem] font-bold tracking-[0.06em] uppercase cursor-pointer font-condensed transition-all duration-200 inline-flex items-center gap-2",
                    active
                      ? "border-[#0D1F5C] bg-[#0D1F5C] text-white"
                      : "border-[#E3E7F3] bg-white text-[#6B7A9E] hover:border-[#0D1F5C] hover:text-[#0D1F5C]",
                  ].join(" ")}
                >
                  {cat}
                  <span
                    className={[
                      "text-[0.6rem] font-bold px-[7px] py-[1px] rounded-full leading-[1.6]",
                      active ? "bg-[#D4A843] text-[#0D1F5C]" : "bg-[#F4F6FC] text-[#8B96C0]",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {filtered.map((item, i) => (
              <PartnerCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="bg-[#0A1642] py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-[720px] mx-auto px-6 text-center relative">
          <p className="text-[#D4A843] text-[0.62rem] font-bold tracking-[0.22em] uppercase mb-3">
            Bergabung Bersama Kami
          </p>
          <h3 className="text-white text-[1.6rem] md:text-[2rem] font-bold uppercase tracking-wide leading-tight mb-4">
            Menjadi Mitra Manufaktur Presisi Anda
          </h3>
          <p className="text-[#AEB8DA] text-[0.86rem] leading-relaxed mb-8">
            Kami terbuka untuk kerja sama jangka panjang dengan prinsip mutu, layanan, dan nilai terbaik.
          </p>
          <button
            onClick={() => navigate("/contactus")}
            className="px-10 py-[14px] bg-[#D4A843] text-[#0A1642] border-none rounded-[9px] text-[0.78rem] font-bold tracking-[0.1em] uppercase font-condensed cursor-pointer hover:opacity-90 transition-opacity"
          >
            Hubungi Kami →
          </button>
        </div>
      </section>
    </div>
  );
};

export default MitraPage;     