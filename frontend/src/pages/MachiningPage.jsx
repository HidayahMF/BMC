import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Info, CheckCircle2 } from "lucide-react";

import {
  FACILITIES,
  CATEGORIES,
  CAT_COLOR,
  MACHINE_INFO,
  sortFacilities,
} from "../data/MachiningData";

/* ══════════════════════════════════════════════════════════
   UTIL — Scroll reveal hook
══════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.1) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ══════════════════════════════════════════════════════════
   COMPONENT — Facility Card
══════════════════════════════════════════════════════════ */
function FacilityCard({ item, index, onClick }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const cc = CAT_COLOR[item.category] || CAT_COLOR["Machining Center"];

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
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${(index % 9) * 50}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
      className="relative overflow-hidden rounded-2xl bg-[#0D1F5C] group cursor-pointer aspect-[4/3]"
    >
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out"
        style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(180deg, rgba(13,31,92,0) 40%, rgba(13,31,92,0.92) 100%)",
          opacity: hov ? 1 : 0.85,
        }}
      />
      <div
        className="absolute top-3 left-3 text-[0.54rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
        style={{ background: cc.bg, color: cc.text }}
      >
        {item.category}
      </div>
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-[0.8rem] font-bold uppercase tracking-wide leading-tight">
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

/* ══════════════════════════════════════════════════════════
   COMPONENT — Lightbox
══════════════════════════════════════════════════════════ */
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;
  const cc = CAT_COLOR[item.category] || CAT_COLOR["Machining Center"];
  const info = MACHINE_INFO[item.name] || {};

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-bmc-fade"
      style={{ background: "rgba(6,14,48,0.92)", backdropFilter: "blur(8px)" }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
        aria-label="Sebelumnya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
        aria-label="Berikutnya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[18px] w-full max-w-[860px] max-h-[90vh] overflow-y-auto font-condensed animate-bmc-slide"
      >
        <div className="bg-[#0D1F5C] px-[22px] py-[18px] flex items-start justify-between gap-3 rounded-t-[18px] sticky top-0 z-10">
          <div>
            <p className="text-[0.56rem] text-[#D4A843] font-bold tracking-[0.16em] uppercase mb-1">
              {info.machineType || "Facilities & Equipment"}
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

        <div className="grid md:grid-cols-2">
          <div className="bg-[#F4F6FC] border-b md:border-b-0 md:border-r border-[#DDE1EF] flex items-center justify-center p-6 min-h-[260px]">
            <img
              src={item.image}
              alt={item.name}
              className="max-h-[320px] max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="p-6 md:p-7">
            <span
              className="inline-block text-[0.6rem] font-bold px-3 py-[4px] rounded-full uppercase tracking-[0.07em] mb-4"
              style={{ background: cc.bg, color: cc.text }}
            >
              {item.category}
            </span>

            {info.description && (
              <div className="mb-5">
                <p className="flex items-center gap-1.5 text-[0.6rem] font-bold text-[#8B96C0] uppercase tracking-widest mb-2">
                  <Info size={12} /> Deskripsi
                </p>
                <p className="text-[#4A5568] text-[0.8rem] leading-relaxed">{info.description}</p>
              </div>
            )}

            {info.applications?.length > 0 && (
              <div className="mb-5">
                <p className="text-[0.6rem] font-bold text-[#8B96C0] uppercase tracking-widest mb-2">
                  Aplikasi
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {info.applications.map((a) => (
                    <span
                      key={a}
                      className="text-[0.68rem] font-semibold text-[#0D1F5C] bg-[#F4F6FC] border border-[#E3E7F3] px-2.5 py-1 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {info.keyFeatures?.length > 0 && (
              <div>
                <p className="text-[0.6rem] font-bold text-[#8B96C0] uppercase tracking-widest mb-2">
                  Key Features
                </p>
                <ul className="space-y-1.5">
                  {info.keyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#4A5568] text-[0.78rem] leading-snug">
                      <CheckCircle2 size={14} className="text-[#3B6D11] mt-[2px] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="p-[18px_24px] border-t border-[#DDE1EF] flex justify-end">
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

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
const MachiningPage = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  // Filter dulu berdasarkan tab kategori aktif, lalu urutkan dengan prioritas:
  // Quality & Inspection Lab > Japan > Korea > Other
  const filtered = sortFacilities(
    FACILITIES.filter((f) => activeCat === "All" || f.category === activeCat)
  );

  const openAt = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const step = (dir) => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((f) => f.name === lightboxItem.name);
    const nextIdx = (idx + dir + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIdx]);
  };

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const [ovRef, ovVis] = useReveal(0.1);

  return (
    <div className="font-condensed">
      {/* ══════════════════════════════════════════════
          HERO + OVERVIEW (dark navy)
      ══════════════════════════════════════════════ */}
      <section className="bg-[#0A1642] pt-20 pb-16 relative overflow-hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-[999] pointer-events-auto inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </button>
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="text-center mb-14">
            <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
              State-of-the-Art Manufacturing
            </p>
            <h1 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-white uppercase tracking-[0.03em] leading-[1.1] mb-4">
              Facilities & Equipment
            </h1>
            <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto mb-5 rounded-sm" />
          </div>

          <div
            ref={ovRef}
            style={{
              opacity: ovVis ? 1 : 0,
              transform: ovVis ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-[#D4D8EE] text-[0.92rem] leading-[1.85]">
              PT Braja Mukti Cakra mengoperasikan fasilitas manufaktur terintegrasi yang
              menggabungkan lini produksi, mesin CNC multi-axis, serta laboratorium kontrol
              kualitas dalam satu rangkaian proses yang saling terhubung. Kemampuan machining
              kami mencakup proses precision turning, milling, honing, hingga balancing untuk
              berbagai komponen otomotif kritikal seperti brake drum, hub, disc brake, flywheel,
              knuckle, dan exhaust system. Didukung oleh mesin-mesin produksi kelas industri dari
              Doosan dan Makino, serta sistem inspeksi berbasis Coordinate Measuring Machine (CMM),
              kami berkomitmen menghasilkan komponen yang memenuhi standar presisi, konsistensi,
              dan keandalan sesuai kebutuhan pelanggan OEM dan OES di pasar domestik maupun ekspor.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FACILITY GALLERY
      ══════════════════════════════════════════════ */}
      <section className="bg-[#0A1642] py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="text-center mb-10">
            <p className="text-[0.62rem] font-bold text-[#D4A843] tracking-[0.22em] uppercase mb-3">
              Visual Documentation
            </p>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold text-white uppercase tracking-[0.03em] leading-[1.1] mb-4">
              Facility Gallery
            </h2>
            <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto rounded-sm" />
          </div>

          <div className="flex gap-2 flex-wrap justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const active = activeCat === cat;
              const count = cat === "All" ? FACILITIES.length : FACILITIES.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={[
                    "px-5 py-[9px] rounded-full border-[1.5px] text-[0.7rem] font-bold tracking-[0.06em] uppercase cursor-pointer font-condensed transition-all duration-200 inline-flex items-center gap-2",
                    active
                      ? "border-[#D4A843] bg-[#D4A843] text-[#0A1642]"
                      : "border-white/15 bg-white/5 text-[#AEB8DA] hover:border-white/30 hover:text-white",
                  ].join(" ")}
                >
                  {cat}
                  <span
                    className={[
                      "text-[0.6rem] font-bold px-[7px] py-[1px] rounded-full leading-[1.6]",
                      active ? "bg-[#0A1642]/15 text-[#0A1642]" : "bg-white/10 text-[#AEB8DA]",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {filtered.map((item, i) => (
              <FacilityCard key={item.name} item={item} index={i} onClick={openAt} />
            ))}
          </div>
        </div>

        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={closeLightbox}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </section>

      <style>{`
        @keyframes bmc-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bmc-slide { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-bmc-fade { animation: bmc-fade 0.2s ease; }
        .animate-bmc-slide { animation: bmc-slide 0.25s ease; }
      `}</style>
    </div>
  );
};

export default MachiningPage;