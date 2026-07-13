import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, X, ArrowRight, ShieldCheck } from "lucide-react";
import blackimage from "../assets/blackimage.jpg";
import iso9001 from "../assets/iso9001.png";
import iso14001 from "../assets/iso14001.png";
import iso45001 from "../assets/iso45001.png";
import proper2025 from "../assets/proper2025.png";
import iatf16949 from "../assets/iatf16949.png";
import gooddelivery from "../assets/gooddelivery.jpg";
import excelentoemdelivery from "../assets/excelentoemdelivery.jpg";
import excelentoesdelivery from "../assets/excelentoesdelivery.png";
import excelentquality from "../assets/excelentquality.jpg";
import lingkunganhidup from "../assets/lingkunganhidup.jpg";
import pajakkontribusi from "../assets/pajakkontribusi.jpg";
import appreciation from "../assets/appreciation.jpg"
import bmc2 from "../assets/bmc2.jpg"

/* ------------------------------------------------------------------ */
/*  ONE CONSISTENT COLOR SYSTEM — no rainbow tags, high contrast only  */
/* ------------------------------------------------------------------ */

const NAVY = "#0D1F5C";
const INK = "#050B2B"; // deeper near-black navy for max contrast text
const BRASS = "#D4A843";
const PAPER = "#F4F6FC";
const SLATE = "#5A6785"; // muted body text, still readable (>4.5:1 on white)
const BRASS_DARK = "#8A6413"; // darker brass variant for readable text-on-light use

/* ─── DATA SERTIFIKASI & PENGHARGAAN ── */
const CERTIFICATIONS = [
  {
    id: 1,
    name: "IATF 16949:2016",
    subtitle: "Automotive Quality Management System",
    image: iatf16949,
    desc: "Sistem Manajemen Mutu Otomotif untuk pembuatan pemesinan (machining) dan perakitan komponen (assembling parts) yang digunakan pada mesin (engine), poros penggerak (drive axle), dan sistem rem (brake system). Berlaku 25 Mei 2023 – 24 Mei 2026, diterbitkan oleh BSI (British Standards Institution).",
    tag: "Quality",
  },
  {
    id: 2,
    name: "ISO 9001:2015",
    subtitle: "Quality Management System",
    image: iso9001,
    desc: "Sertifikasi standar internasional untuk sistem manajemen mutu, memastikan konsistensi kualitas produk dan proses produksi pada sektor mesin, poros penggerak, dan sistem rem.",
    tag: "Quality",
  },
  {
    id: 3,
    name: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    image: iso14001,
    desc: "Sertifikasi standar internasional untuk sistem manajemen lingkungan, mendukung komitmen operasional yang ramah lingkungan dalam proses manufaktur.",
    tag: "Environment",
  },
  {
    id: 4,
    name: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    image: iso45001,
    desc: "Sertifikasi sistem manajemen keselamatan dan kesehatan kerja (K3) untuk melindungi seluruh karyawan di lingkungan produksi presisi.",
    tag: "Safety",
  },
  {
    id: 5,
    name: "PROPER – Peringkat Biru",
    subtitle: "Penilaian Kinerja Perusahaan (2023–2024)",
    image: proper2025,
    desc: "Penghargaan Program Penilaian Peringkat Kinerja Perusahaan dalam Pengelolaan Lingkungan Hidup (PROPER) dengan predikat Peringkat Biru, menunjukkan kepatuhan penuh perusahaan terhadap regulasi lingkungan yang berlaku.",
    tag: "Environment",
  },
  {
    id: 6,
    name: "Fuso Good Delivery Supplier",
    subtitle: "Annual Supplier Meeting 2026 · CY2025",
    image: gooddelivery,
    desc: "Penghargaan Good Delivery Supplier dari PT Krama Yudha Tiga Berlian Motors, PT Mitsubishi Krama Yudha Motors and Manufacturing, & PT Krama Yudha Ratu Motor, atas komitmen menghadirkan layanan tepat waktu, andal, dan berkualitas dalam produksi kendaraan Fuso di Indonesia.",
    tag: "Award",
  },
  {
    id: 7,
    name: "Isuzu Excellent OES Delivery Performance",
    subtitle: "Isuzu Supplier Conference 2025 · Tahun 2024",
    image: excelentoesdelivery,
    desc: "Certificate of Appreciation dari PT Isuzu Astra Motor Indonesia (IAMI) atas kinerja pengiriman Original Equipment Service (OES) terbaik sepanjang tahun 2024, diberikan pada 24 Februari 2025.",
    tag: "Award",
  },
  {
    id: 8,
    name: "Isuzu Excellent OEM Delivery Performance",
    subtitle: "Isuzu Supplier Conference 2025 · Tahun 2024",
    image: excelentoemdelivery,
    desc: "Certificate of Appreciation dari PT Isuzu Astra Motor Indonesia (IAMI) atas kinerja pengiriman Original Equipment Manufacturer (OEM) terbaik sepanjang tahun 2024, diberikan pada 24 Februari 2025.",
    tag: "Award",
  },
  {
    id: 9,
    name: "Isuzu Excellent Quality Performance",
    subtitle: "Isuzu Supplier Conference 2025 · Tahun 2024",
    image: excelentquality,
    desc: "Certificate of Appreciation dari PT Isuzu Astra Motor Indonesia (IAMI) atas pencapaian kinerja kualitas (Quality Performance) terbaik dan presisi produk sepanjang tahun 2024, diberikan pada 24 Februari 2025.",
    tag: "Award",
  },
  {
    id: 10,
    name: "Wajib Pajak Kontribusi Besar",
    subtitle: "Tahun Pajak 2024",
    image: pajakkontribusi,
    desc: "Piagam Penghargaan (No: Sert-62/KPP.3312/2025) dari Kepala KPP Madya Kota Bekasi atas peran serta aktif dan kontribusi besar terhadap pendapatan negara melalui kepatuhan wajib pajak tahun 2024, diberikan 18 Februari 2025.",
    tag: "Award",
  },
  {
    id: 11,
    name: "Penghijauan Kota Bekasi",
    subtitle: "Dinas Lingkungan Hidup · 28 Februari 2025",
    image: lingkunganhidup,
    desc: "Sertifikat Apresiasi dari Kepala Dinas Lingkungan Hidup (DLH) Kota Bekasi atas partisipasi aktif perusahaan dalam penyediaan pohon sebagai wujud nyata dukungan program penghijauan wilayah Kota Bekasi.",
    tag: "Environment",
  },
  {
    id: 12,
    name: "Best Delivery Achievement",
    subtitle: "PT Hino Motors Manufacturing Indonesia · 30 Maret 2022",
    image: appreciation, 
    desc: "Penghargaan dari PT Hino Motors Manufacturing Indonesia atas pengakuan terhadap kinerja luar biasa dan dukungan penuh (outstanding performance and support) sepanjang tahun 2021.",
    tag: "Award",
  },
];

/* ─── CERTIFICATE CARD ── */
function CertCard({ item, index, onClick }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);

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
        borderColor: hov ? NAVY : "#DDE1EF",
        boxShadow: hov
          ? `0 18px 40px ${NAVY}26`
          : "0 2px 10px rgba(13,31,92,0.05)",
      }}
      className="relative rounded-2xl bg-white cursor-pointer font-condensed border-[1.5px] overflow-hidden group h-full flex flex-col"
    >
      {/* top accent — single color, always same */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-300"
        style={{ background: BRASS, transform: hov ? "scaleX(1)" : "scaleX(0)" }}
      />

      {/* Certificate image */}
      <div
        className="h-[210px] shrink-0 flex items-center justify-center p-6 border-b overflow-hidden"
        style={{ background: PAPER, borderColor: "#DDE1EF" }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300"
          style={{
            transform: hov ? "scale(1.06)" : "scale(1)",
            filter: "drop-shadow(0 6px 14px rgba(13,31,92,0.15))",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-flex items-center gap-1.5 text-[0.56rem] font-bold tracking-[0.14em] uppercase px-2.5 py-[4px] rounded-full mb-3 self-start"
          style={{ background: INK, color: BRASS }}
        >
          <ShieldCheck size={11} strokeWidth={2.5} />
          {item.tag}
        </span>
        <h3 className="text-[1rem] font-bold uppercase tracking-wide leading-tight mb-1" style={{ color: INK }}>
          {item.name}
        </h3>
        <p className="text-[0.72rem] font-semibold uppercase tracking-wider mb-3" style={{ color: SLATE }}>
          {item.subtitle}
        </p>
        <p className="text-[0.78rem] leading-[1.6] line-clamp-3" style={{ color: SLATE }}>
          {item.desc}
        </p>

        <div
          className="mt-auto pt-4 flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wide"
          style={{ color: NAVY }}
        >
          Lihat Sertifikat
          <ArrowRight
            size={13}
            strokeWidth={2.5}
            className="transition-transform duration-200"
            style={{ transform: hov ? "translateX(3px)" : "translateX(0)" }}
          />
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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-bmc-fade"
      style={{ background: "rgba(5,11,43,0.82)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[18px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto font-condensed animate-bmc-slide"
      >
        <div
          className="px-[22px] py-[18px] flex items-start justify-between gap-3 rounded-t-[18px] sticky top-0 z-10"
          style={{ background: INK }}
        >
          <div>
            <p className="text-[0.56rem] font-bold tracking-[0.16em] uppercase mb-1" style={{ color: BRASS }}>
              Sertifikasi & Penghargaan
            </p>
            <h3 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.03em] leading-[1.2]">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="shrink-0 mt-[2px] w-9 h-9 rounded-full bg-white/[0.12] border-none text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div
          className="border-b flex items-center justify-center p-8 min-h-[320px]"
          style={{ background: PAPER, borderColor: "#DDE1EF" }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="max-h-[420px] max-w-full object-contain rounded-md"
            style={{ filter: "drop-shadow(0 10px 24px rgba(13,31,92,0.18))" }}
          />
        </div>

        <div className="p-[22px_24px]">
          <span
            className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold px-3 py-[5px] rounded-full uppercase tracking-[0.1em] mb-3"
            style={{ background: INK, color: BRASS }}
          >
            <ShieldCheck size={12} strokeWidth={2.5} />
            {item.tag}
          </span>
          <p className="text-[0.72rem] font-semibold uppercase tracking-wider mb-2" style={{ color: SLATE }}>
            {item.subtitle}
          </p>
          <p className="text-[0.86rem] leading-[1.75] mb-5" style={{ color: "#334063" }}>
            {item.desc}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-[9px] border-[1.5px] bg-transparent text-[0.75rem] font-bold tracking-[0.06em] uppercase font-condensed cursor-pointer transition-colors duration-150"
            style={{ borderColor: "#DDE1EF", color: SLATE }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.color = NAVY; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDE1EF"; e.currentTarget.style.color = SLATE; }}
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
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-condensed">
      {/* ── HERO ── */}
     <section
  id="awards-hero"
  className="relative h-[40vh] min-h-80 flex items-end bg-[#0D1F5C] overflow-hidden"
>
  <img
    src={bmc2}
    alt="BMC"
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

  <div className="relative z-10 px-6 md:px-20 pb-14 max-w-3xl">
    {/* Breadcrumb */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4 flex items-center">
      <a href="/" className="hover:text-white/90">
        Home
      </a>

      <ChevronRight size={12} className="mx-1" />

      <a href="/companyprofile" className="hover:text-white/90">
        About Us
      </a>

      <ChevronRight size={12} className="mx-1" />

      <span className="text-white">Awards &amp; Certifications</span>
    </p>

    {/* Subtitle */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
      PT Braja Mukti Cakra
    </p>

    {/* Title */}
    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4 drop-shadow-lg">
      Awards &amp; Certifications
    </h1>

    {/* Description */}
    <p className="text-white/70 text-[16px] leading-relaxed max-w-lg drop-shadow-md">
      Diakui Melalui Standar Kualitas dan Kinerja Terbaik
    </p>
  </div>
</section>
      {/* ── CERTIFICATIONS ── */}
      <section className="py-20 font-condensed" style={{ background: PAPER }}>
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
            <p className="text-[0.62rem] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: BRASS_DARK }}>
              Komitmen Kualitas & Standar
            </p>
            <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold uppercase tracking-[0.03em] leading-[1.1] mb-4" style={{ color: NAVY }}>
              Awards &amp; Certifications
            </h2>
            <div className="w-[52px] h-[3px] mx-auto mb-5 rounded-sm" style={{ background: BRASS }} />
            <p className="text-[0.86rem] max-w-xl mx-auto" style={{ color: SLATE }}>
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
              { n: "12", l: "Sertifikasi & Penghargaan" },
              { n: "4", l: "Standar Manajemen Internasional" },
              { n: "100%", l: "Kepatuhan Regulasi" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-[1.8rem] font-bold leading-none mb-1" style={{ color: NAVY }}>{s.n}</p>
                <p className="text-[0.62rem] uppercase tracking-widest font-semibold" style={{ color: SLATE }}>{s.l}</p>
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
    </div>
  );
};

export default AwardsCertif;