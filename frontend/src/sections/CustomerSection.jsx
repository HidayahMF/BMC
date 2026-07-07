import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ktb from "../assets/ktb.png";
import fuso from "../assets/fuso.png";
import mitsubishi from "../assets/mitsubishi.png";
import hino from "../assets/hino.png";
import isuzu from "../assets/isuzu.png";
import yanmar from "../assets/yanmar.png";
import komatsu from "../assets/komatsu.png";
import exedy from "../assets/exedy.png";

/* ─── PREVIEW LOGOS (8 mitra utama) ── */
const PREVIEW_PARTNERS = [
  { name: "Hino", logo: hino },
  { name: "Mitsubishi Fuso", logo: fuso },
  { name: "Isuzu", logo: isuzu },
  { name: "Mitsubishi", logo: mitsubishi },
  { name: "KTB", logo: ktb },
  { name: "Yanmar", logo: yanmar },
  { name: "Komatsu", logo: komatsu },
  { name: "Exedy", logo: exedy },
];

/* ─── LOGO CARD ── */
function PartnerLogo({ item, index }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

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
      style={{
        transitionDelay: `${(index % 8) * 60}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="group relative rounded-2xl bg-white border-[1.5px] border-[#E3E7F3] flex items-center justify-center h-[110px] px-6 overflow-hidden hover:border-[#D4A843] hover:shadow-[0_12px_30px_rgba(13,31,92,0.10)] transition-all duration-300"
    >
      <img
        src={item.logo}
        alt={item.name}
        className="max-h-[52px] max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-125"
      />
    </div>
  );
}

/* ─── MAIN COMPONENT ── */
const Mitra = () => {
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white py-20 font-condensed">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Heading */}
        <div
          className="text-center mb-14"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
            Trusted By Global Manufacturers
          </p>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-[#0D1F5C] uppercase tracking-[0.03em] leading-[1.1] mb-4">
            Mitra &amp; Pelanggan
          </h2>
          <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto mb-5 rounded-sm" />
          <p className="text-[0.86rem] text-[#6B7A9E] max-w-xl mx-auto">
            Dipercaya oleh produsen otomotif dan alat berat kelas dunia sebagai mitra
            manufaktur komponen presisi.
          </p>
        </div>

        {/* Logo grid preview */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
        >
          {PREVIEW_PARTNERS.map((item, i) => (
            <PartnerLogo key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12"
          style={{ opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}
        >
          <button
            onClick={() => navigate("/customer")}
            className="px-10 py-[14px] bg-[#0D1F5C] text-white border-none rounded-[9px] text-[0.78rem] font-bold tracking-[0.1em] uppercase font-condensed cursor-pointer hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Lihat Semua Mitra →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mitra;