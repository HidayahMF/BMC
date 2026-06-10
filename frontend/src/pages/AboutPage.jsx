import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackimage from "../assets/blackimage.jpg";
import iso9001 from "../assets/iso9001.png"
import iso14001 from "../assets/iso14001.png"
import iso45001 from "../assets/iso45001.png"
import iatf16949 from "../assets/iatf16949.png"
import { ChevronRight } from "lucide-react";
const sections = [
  {
    id: "overview",
    tag: "Who We Are",
    title: "Precision Engineering for Global Industries",
    short: `PT Braja Mukti Cakra (BMC) adalah perusahaan manufaktur komponen presisi yang telah menjadi mitra terpercaya berbagai industri selama hampir empat dekade.`,
    full: `PT Braja Mukti Cakra (BMC) adalah perusahaan manufaktur komponen presisi yang telah menjadi mitra terpercaya berbagai industri selama hampir empat dekade. Berdiri sejak tahun 1986, BMC berfokus pada produksi komponen berkualitas tinggi untuk OEM dan REM di sektor otomotif, alat berat, agribisnis, serta industri permesinan umum.

Didukung teknologi manufaktur modern, sistem manajemen mutu berstandar internasional, serta sumber daya manusia yang berpengalaman, BMC terus menghadirkan solusi komponen presisi yang memenuhi standar global.`,
    img: blackimage,
  },
  {
    id: "journey",
    tag: "Our Journey",
    title: "Building Precision Since 1986",
    short: `PT Braja Mukti Cakra didirikan pada 24 Januari 1986 melalui kolaborasi antara PT Krama Yudha Tiga Berlian Motors (KTB) dan PT Bakrie Autoparts.`,
    full: `PT Braja Mukti Cakra didirikan pada 24 Januari 1986 melalui kolaborasi antara PT Krama Yudha Tiga Berlian Motors (KTB), pemegang merek Mitsubishi di Indonesia, dan PT Bakrie Autoparts, salah satu pelopor industri pengecoran logam di Indonesia.

Berbekal transfer teknologi dan sistem produksi Jepang, BMC mengembangkan kapabilitas manufaktur untuk industri otomotif nasional dan internasional. Saat ini produk BMC diekspor ke Jepang, Malaysia, Taiwan, Filipina, dan Australia.`,
    img: blackimage,
  },
  {
    id: "quality",
    tag: "Commitment to Quality",
    title: "Excellence in Every Component",
    short: `Kualitas merupakan fondasi utama seluruh aktivitas operasional BMC — dari proses produksi hingga pengiriman akhir ke pelanggan.`,
    full: `Kualitas merupakan fondasi utama seluruh aktivitas operasional BMC. Setiap proses produksi dirancang untuk memastikan presisi, konsistensi, dan keandalan produk sesuai kebutuhan pelanggan OEM maupun aftermarket.

BMC menerapkan sistem manajemen mutu yang memenuhi standar internasional ISO 9001:2015, ISO 14001:2015, dan ISO 45001:2018, diwujudkan melalui budaya continuous improvement dan penguatan kapabilitas engineering.`,
    img: blackimage,
  },
];

const certs = [
  {
    code: "ISO 9001:2015",
    label: "Quality Management",
    img: iso9001,
  },
  {
    code: "ISO 14001:2015",
    label: "Environmental Management",
    img: iso14001,
  },
  {
    code: "ISO 45001:2018",
    label: "Occupational Safety",
    img: iso45001,
  },
  {
    code: "IATF 16949:2016",
    label: "Quality Management System",
    img: iatf16949,
  },
];

const AccordionSection = ({ section, index }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = section.full.split("\n\n");
  const isEven = index % 2 === 0;

  // arah AOS: index 0 → dari kanan, index 1 → dari kiri, index 2 → dari kanan
  const imgAos = isEven ? "fade-left" : "fade-right";
  const txtAos = isEven ? "fade-right" : "fade-left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">
      {/* Gambar */}
      <div
        className={`relative overflow-hidden min-h-[280px] md:min-h-[380px]
          ${isEven ? "md:order-last" : "md:order-first"}
        `}
        style={{
          borderRadius: "24px",
        }}
        data-aos={imgAos}
        data-aos-duration="900"
        data-aos-once="true"
      >
        <img
          src={section.img}
          alt={section.title}
          className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#0D1F5C]/20" />
      </div>

      {/* Teks */}
      <div
        className={`py-16 flex flex-col justify-center
          ${isEven ? "md:pr-20 md:pl-4 md:order-first" : "md:pl-20 md:pr-4 md:order-last"}
        `}
        data-aos={txtAos}
        data-aos-duration="900"
        data-aos-delay="100"
        data-aos-once="true"
      >
        <span className="text-[11px] font-bold font-['Roboto_Condensed',sans-serif]  tracking-[0.16em] uppercase text-[#D4A843] mb-4 block">
          {section.tag}
        </span>
        <h2 className="text-[28px] md:text-[32px] font-bold font-['Roboto_Condensed',sans-serif] text-[#0D1F5C] leading-tight mb-5">
          {section.title}
        </h2>
        <div className="w-10 h-0.5 bg-[#D4A843] mb-6" />

        {!expanded ? (
          <p className="text-[15px] leading-relaxed text-gray-500">
            {section.short}
          </p>
        ) : (
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-gray-500">
                {p}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 self-start inline-flex items-center gap-2 text-[#0D1F5C] text-sm font-medium hover:text-[#D4A843] transition-colors duration-200"
        >
          {expanded ? "Show Less" : "Read More"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              d="M5 7l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const navigate = useNavigate();

  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white font-['Roboto_Condensed',sans-serif]">
      {/* ── HERO ── */}
      <section
        id="about-hero"
        className="relative h-[40vh] min-h-80 flex items-end bg-[#0D1F5C] overflow-hidden"
      >
        <img
          src={blackimage}
          alt="BMC"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F5C] via-[#0D1F5C]/80 to-transparent" />

        {/* Tombol Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-20 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
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
          <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4 flex items-center">
            <a href="/" className="hover:text-white/90">
              Home
            </a>

            <ChevronRight size={12} className="mx-1" />

            <a href="/aboutus" className="hover:text-white/90">
              About Us
            </a>

            <ChevronRight size={12} className="mx-1" />

            <span className="text-white">About BMC</span>
          </p>
          <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
            PT Braja Mukti Cakra
          </p>
          <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4">
            About Us
          </h1>
          <p className="text-white/50 text-[16px] leading-relaxed max-w-lg">
            Precision Engineering for Global Industries
          </p>
        </div>
      </section>

      {/* ── SECTIONS ZIG-ZAG ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-20">
        {sections.map((s, index) => (
          <AccordionSection key={s.id} section={s} index={index} />
        ))}
      </section>

     
    </div>
  );
};

export default AboutPage;
