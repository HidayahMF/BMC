import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/Products";

/* ─── CATEGORY COLOR MAP ── */
const CAT_COLOR = {
  Engine:            { bg: "#FFF8E7", text: "#92650A" },
  Brake:             { bg: "#FEECEC", text: "#A32D2D" },
  Transmission:      { bg: "#EBF5FF", text: "#185FA5" },
  Suspension:        { bg: "#EEF9F1", text: "#3B6D11" },
  Steering:          { bg: "#F0EEFF", text: "#534AB7" },
  Axle:              { bg: "#FFF3E0", text: "#8B4513" },
  Bracket:           { bg: "#E8F4FD", text: "#0D6B8A" },
  Body:              { bg: "#F3F0FF", text: "#5C3D9E" },
  Cabin:             { bg: "#FFF0F5", text: "#993556" },
  Clutch:            { bg: "#FFF8E7", text: "#92650A" },
  Seal:              { bg: "#E8FFF1", text: "#1B7A45" },
  "Heavy Equipment": { bg: "#F4F4F4", text: "#444444" },
};

/* jumlah produk yang ditampilkan di Home */
const PREVIEW_COUNT = 8;

/* ─── PRODUCT CARD ─────────────────────────────────────── */
function ProductCard({ product, index, onClick }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const cc  = CAT_COLOR[product.category] || { bg: "#EEF1FB", text: "#0D1F5C" };

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
      onClick={() => onClick(product)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${(index % 8) * 60}ms`,
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: "450ms, 450ms, 200ms, 200ms",
        transitionTimingFunction: "ease",
      }}
      className={[
        "relative overflow-hidden rounded-2xl bg-white cursor-pointer font-condensed border-[1.5px]",
        hov
          ? "border-gold shadow-[0_16px_40px_rgba(13,31,92,0.13)]"
          : "border-bdr  shadow-[0_2px_10px_rgba(13,31,92,0.05)]",
        vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7",
      ].join(" ")}
    >
      <div
        className={[
          "absolute top-0 left-0 right-0 h-[3px] bg-gold z-[2]",
          "origin-left transition-transform duration-[220ms] ease-in-out",
          hov ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
      />

      <div
        className="absolute top-[10px] left-[10px] z-[3] text-[0.58rem] font-bold tracking-[0.07em] uppercase px-2 py-[3px] rounded-full"
        style={{ background: cc.bg, color: cc.text }}
      >
        {product.category}
      </div>

      <div className="h-[172px] bg-card flex items-center justify-center overflow-hidden border-b border-bdr">
        <img
          src={product.image}
          alt={product.name}
          className={[
            "w-full h-full object-contain px-5 py-[14px]",
            "transition-transform duration-300 ease-in-out",
            hov ? "scale-[1.08]" : "scale-100",
          ].join(" ")}
        />
      </div>

      <div className="px-4 pt-[14px] pb-[46px]">
        <p className="text-[0.84rem] font-bold text-navy uppercase tracking-[0.02em] leading-[1.3] mb-[6px]">
          {product.name}
        </p>
        <p className="text-[0.72rem] text-muted leading-[1.5] line-clamp-2">
          {product.description}
        </p>
      </div>

      <div
        className={[
          "absolute bottom-0 left-0 right-0 bg-navy text-gold",
          "text-[0.65rem] font-bold tracking-[0.12em] uppercase text-center py-[10px]",
          "transition-transform duration-[220ms] ease-in-out",
          hov ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        Lihat Detail →
      </div>
    </div>
  );
}

/* ─── MODAL (preview cepat di Home) ── */
function Modal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!product) return null;
  const cc = CAT_COLOR[product.category] || { bg: "#EEF1FB", text: "#0D1F5C" };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-bmc-fade"
      style={{ background: "rgba(9,22,72,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[18px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto font-condensed animate-bmc-slide"
      >
        <div className="bg-navy px-[22px] py-[18px] flex items-start justify-between gap-3 rounded-t-[18px] sticky top-0 z-10">
          <div>
            <p className="text-[0.58rem] text-gold font-bold tracking-[0.16em] uppercase mb-1">
              Preview Produk
            </p>
            <h3 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.03em] leading-[1.2]">
              {product.name}
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

        <div className="bg-card border-b border-bdr flex items-center justify-center px-8 py-6 min-h-[200px]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[180px] max-w-full object-contain"
          />
        </div>

        <div className="p-[22px_24px]">
          <span
            className="inline-block text-[0.62rem] font-bold px-3 py-[4px] rounded-full uppercase tracking-[0.07em] mb-4"
            style={{ background: cc.bg, color: cc.text }}
          >
            {product.category}
          </span>

          <p className="text-[0.86rem] text-[#4A5568] leading-[1.7] mb-6">
            {product.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/parts?id=${product.id}`}
              className="px-5 py-3 rounded-[9px] bg-navy text-gold text-[0.75rem] font-bold tracking-[0.06em] uppercase font-condensed hover:opacity-90 transition-opacity inline-block"
            >
              Lihat Detail Lengkap →
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-[9px] border-[1.5px] border-bdr bg-transparent text-muted text-[0.75rem] font-bold tracking-[0.06em] uppercase font-condensed cursor-pointer hover:border-navy hover:text-navy transition-colors duration-150"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT (Home Preview) ────────────────────── */
export default function ProductSection() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const preview = products.slice(0, PREVIEW_COUNT);

  return (
    <section id="products" className="bg-site py-[80px_0_60px] font-condensed">
      <div className="max-w-[1280px] mx-auto px-6 pt-8">

        {/* Heading */}
        <div className="text-center mt-10 mb-10">
          <p className="text-[0.62rem] font-bold text-gold tracking-[0.2em] uppercase mb-3">
            Precision Manufacturing Since 1986
          </p>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-navy uppercase tracking-[0.03em] leading-[1.1] mb-[14px]">
            Produk Unggulan
          </h2>
          <div className="w-[52px] h-[3px] bg-gold mx-auto mb-[18px] rounded-sm" />
          <p className="text-[0.86rem] text-muted max-w-lg mx-auto">
            Sebagian dari ribuan spare part yang kami produksi. Lihat katalog lengkap untuk pencarian dan filter kategori.
          </p>
        </div>

        {/* Preview grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))" }}
        >
          {preview.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onClick={setSelected} />
          ))}
        </div>

        {/* CTA ke halaman lengkap */}
        <div className="text-center mt-12 pb-10">
          <button
            onClick={() => navigate("/parts")}
            className="px-10 py-[14px] bg-navy text-gold border-none rounded-[9px] text-[0.78rem] font-bold tracking-[0.1em] uppercase font-condensed cursor-pointer hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Lihat Semua Produk ({products.length}) →
          </button>
        </div>
      </div>

      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}