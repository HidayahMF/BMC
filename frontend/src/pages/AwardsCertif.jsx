import React, { useState, useEffect } from "react";
import iso9001 from "../assets/iso9001.png";
import iso14001 from "../assets/iso14001.png";
import iso45001 from "../assets/iso45001.png";
import proper2025 from "../assets/proper2025.png";

/* ─── DATA SERTIFIKASI & PENGHARGAAN ── */
const CERTIFICATIONS = [
  {
    id: 1,
    name: "ISO 9001:2015",
    subtitle: "Quality Management System",
    image: iso9001,
    desc: "Sertifikasi standar internasional untuk sistem manajemen mutu, memastikan konsistensi kualitas produk dan proses produksi.",
    tag: "Quality",
  },
  {
    id: 2,
    name: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    image: iso14001,
    desc: "Sertifikasi standar internasional untuk sistem manajemen lingkungan, mendukung komitmen operasional yang ramah lingkungan.",
    tag: "Environment",
  },
  {
    id: 3,
    name: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    image: iso45001,
    desc: "Sertifikasi sistem manajemen keselamatan dan kesehatan kerja untuk melindungi seluruh karyawan di lingkungan produksi.",
    tag: "Safety",
  },
  {
    id: 4,
    name: "PROPER 2025",
    subtitle: "Penilaian Kinerja Perusahaan",
    image: proper2025,
    desc: "Penghargaan dari Kementerian Lingkungan Hidup atas kinerja pengelolaan lingkungan perusahaan yang taat dan berkelanjutan.",
    tag: "Award",
  },
];

const TAG_COLOR = {
  Quality:     { bg: "#EBF5FF", text: "#185FA5" },
  Environment: { bg: "#EEF9F1", text: "#3B6D11" },
  Safety:      { bg: "#FEECEC", text: "#A32D2D" },
  Award:       { bg: "#FFF8E7", text: "#92650A" },
};

/* ─── CERTIFICATE CARD ── */
function CertCard({ item, index, onClick }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const tc = TAG_COLOR[item.tag] || TAG_COLOR.Quality;

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 150 + index * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.55s ease, transform 0.55s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      className={[
        "relative rounded-2xl bg-white cursor-pointer font-condensed border-[1.5px] overflow-hidden group",
        hov ? "border-[#D4A843] shadow-[0_16px_40px_rgba(13,31,92,0.14)]" : "border-[#DDE1EF] shadow-[0_2px_10px_rgba(13,31,92,0.05)]",
      ].join(" ")}
    >
      {/* Gold top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4A843] origin-left transition-transform duration-300"
        style={{ transform: hov ? "scaleX(1)" : "scaleX(0)" }}
      />

      {/* Certificate image */}
      <div className="h-[210px] bg-[#F4F6FC] flex items-center justify-center p-6 border-b border-[#DDE1EF] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300"
          style={{
            transform: hov ? "scale(1.06)" : "scale(1)",
            filter: "drop-shadow(0 6px 14px rgba(13,31,92,0.12))",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <span
          className="inline-block text-[0.56rem] font-bold tracking-[0.12em] uppercase px-2.5 py-[3px] rounded-full mb-3"
          style={{ background: tc.bg, color: tc.text }}
        >
          {item.tag}
        </span>
        <h3 className="text-[1rem] font-bold text-[#0D1F5C] uppercase tracking-wide leading-tight mb-1">
          {item.name}
        </h3>
        <p className="text-[0.72rem] text-[#8B96C0] font-semibold uppercase tracking-wider mb-3">
          {item.subtitle}
        </p>
        <p className="text-[0.76rem] text-[#6B7A9E] leading-[1.6] line-clamp-3">
          {item.desc}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[0.68rem] font-bold text-[#0D1F5C] uppercase tracking-wide">
          Lihat Sertifikat
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200"
            style={{ transform: hov ? "translateX(3px)" : "translateX(0)" }}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── LIGHTBOX ── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!item) return null;
  const tc = TAG_COLOR[item.tag] || TAG_COLOR.Quality;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-bmc-fade"
      style={{ background: "rgba(9,22,72,0.8)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[18px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto font-condensed animate-bmc-slide"
      >
        <div className="bg-[#0D1F5C] px-[22px] py-[18px] flex items-start justify-between gap-3 rounded-t-[18px] sticky top-0 z-10">
          <div>
            <p className="text-[0.56rem] text-[#D4A843] font-bold tracking-[0.16em] uppercase mb-1">
              Sertifikasi & Penghargaan
            </p>
            <h3 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.03em] leading-[1.2]">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="shrink-0 mt-[2px] w-9 h-9 rounded-full bg-white/[0.12] border-none text-white text-base flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="bg-[#F4F6FC] border-b border-[#DDE1EF] flex items-center justify-center p-8 min-h-[320px]">
          <img
            src={item.image}
            alt={item.name}
            className="max-h-[420px] max-w-full object-contain rounded-md"
            style={{ filter: "drop-shadow(0 10px 24px rgba(13,31,92,0.16))" }}
          />
        </div>

        <div className="p-[22px_24px]">
          <span
            className="inline-block text-[0.6rem] font-bold px-3 py-[4px] rounded-full uppercase tracking-[0.08em] mb-3"
            style={{ background: tc.bg, color: tc.text }}
          >
            {item.tag}
          </span>
          <p className="text-[0.72rem] text-[#8B96C0] font-semibold uppercase tracking-wider mb-2">
            {item.subtitle}
          </p>
          <p className="text-[0.86rem] text-[#4A5568] leading-[1.75] mb-5">
            {item.desc}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-[9px] border-[1.5px] border-[#DDE1EF] bg-transparent text-[#6B7A9E] text-[0.75rem] font-bold tracking-[0.06em] uppercase font-condensed cursor-pointer hover:border-[#0D1F5C] hover:text-[#0D1F5C] transition-colors duration-150"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ── */
const AwardsCertif = () => {
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-[#F4F6FC] py-20 font-condensed">
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
            Komitmen Kualitas & Standar
          </p>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-[#0D1F5C] uppercase tracking-[0.03em] leading-[1.1] mb-4">
            Awards &amp; Certifications
          </h2>
          <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto mb-5 rounded-sm" />
          <p className="text-[0.86rem] text-[#6B7A9E] max-w-xl mx-auto">
            Diakui melalui sertifikasi sistem manajemen internasional dan penghargaan atas
            kinerja lingkungan, keselamatan, dan kualitas produksi.
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-14"
          style={{ opacity: entered ? 1 : 0, transition: "opacity 0.7s ease 0.15s" }}
        >
          {[
            { n: "4", l: "Sertifikasi & Penghargaan" },
            { n: "3", l: "Standar ISO Internasional" },
            { n: "100%", l: "Kepatuhan Regulasi" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-[1.8rem] font-bold text-[#0D1F5C] leading-none mb-1">{s.n}</p>
              <p className="text-[0.62rem] text-[#8B96C0] uppercase tracking-widest font-semibold">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Grid sertifikat */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            opacity: entered ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {CERTIFICATIONS.map((item, i) => (
            <CertCard key={item.id} item={item} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @keyframes bmc-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bmc-slide { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-bmc-fade { animation: bmc-fade 0.2s ease; }
        .animate-bmc-slide { animation: bmc-slide 0.25s ease; }
      `}</style>
    </section>
  );
};

export default AwardsCertif;