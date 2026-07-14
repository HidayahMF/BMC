  import React, { useState, useEffect, useRef } from "react";
  import { useSearchParams, useNavigate } from "react-router-dom";
  import { ChevronRight } from "lucide-react";
  import { products, categories } from "../data/ProductsData";
  import blackimage from "../assets/blackimage.jpg";
  import bmc2 from "../assets/bmc2.jpg";


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

  /* ─── MODAL ─────────────────────────────────────────────── */
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

    const specRows = [
      { label: "Nama Produk", val: product.name },
      { label: "Kategori",    val: product.category },
      { label: "Aplikasi",    val: product.applications?.join(" · ") || "—" },
      { label: "Standar",     val: "ISO 9001:2015 & IATF 16949:2016 Certified" },
      { label: "Pasar",       val: "OEM & REM — Export Ready" },
    ];

    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-bmc-fade"
        style={{ background: "rgba(9,22,72,0.75)", backdropFilter: "blur(6px)" }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[18px] w-full max-w-[660px] max-h-[90vh] overflow-y-auto font-condensed animate-bmc-slide"
        >
          <div className="bg-navy px-[22px] py-[18px] flex items-start justify-between gap-3 rounded-t-[18px] sticky top-0 z-10">
            <div>
              <p className="text-[0.58rem] text-gold font-bold tracking-[0.16em] uppercase mb-1">
                Detail Produk · PT Baja Mukti Cakra
              </p>
              <h3 className="text-[1.15rem] font-bold text-white uppercase tracking-[0.03em] leading-[1.2]">
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

          <div className="bg-card border-b border-bdr flex items-center justify-center px-10 py-8 min-h-[240px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[220px] max-w-full object-contain"
            />
          </div>

          <div className="p-[22px_24px]">
            <div className="flex gap-2 flex-wrap mb-[18px]">
              <span
                className="text-[0.62rem] font-bold px-3 py-[4px] rounded-full uppercase tracking-[0.07em]"
                style={{ background: cc.bg, color: cc.text }}
              >
                {product.category}
              </span>
              <span className="text-[0.62rem] font-bold px-3 py-[4px] rounded-full uppercase tracking-[0.07em] bg-[#EEF1FB] text-navy">
                ISO 9001:2015
              </span>
            </div>

            <p className="text-[0.88rem] text-[#4A5568] leading-[1.75] mb-[22px]">
              {product.description}
            </p>

            <div className="border border-bdr rounded-[10px] overflow-hidden mb-[22px]">
              {specRows.map((row, i) => (
                <div
                  key={i}
                  className={[
                    "flex",
                    i < specRows.length - 1 ? "border-b border-bdr" : "",
                  ].join(" ")}
                >
                  <div className="w-[38%] shrink-0 px-[14px] py-[10px] text-[0.72rem] font-bold text-muted uppercase tracking-[0.06em] bg-site">
                    {row.label}
                  </div>
                  <div className="flex-1 px-[14px] py-[10px] text-[0.82rem] text-navy font-medium">
                    {row.val}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-[9px] border-[1.5px] border-bdr bg-transparent text-muted text-[0.75rem] font-bold tracking-[0.06em] uppercase font-condensed cursor-pointer hover:border-navy hover:text-navy transition-colors duration-150"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── MAIN COMPONENT: Halaman Parts (Katalog Lengkap) ──── */
  const Parts = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeCat, setActiveCat] = useState("All");
    const [search,    setSearch]    = useState("");
    const [selected,  setSelected]  = useState(null);
    const [showCount, setShowCount] = useState(12);

    /* Buka modal otomatis kalau datang dari link ?id=xxx (mis. dari Home) */
    useEffect(() => {
      const id = searchParams.get("id");
      if (id) {
        const found = products.find((p) => String(p.id) === String(id));
        if (found) setSelected(found);
      }
      window.scrollTo({ top: 0 });
    }, [searchParams]);

    const filtered = products.filter((p) => {
      const matchCat = activeCat === "All" || p.category === activeCat;
      const q = search.toLowerCase().trim();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.applications || []).some((a) => a.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    const visible = filtered.slice(0, showCount);
    const hasMore = showCount < filtered.length;

    const resetAndFilter = (cat) => { setActiveCat(cat); setShowCount(12); };
    const handleSearch   = (e)   => { setSearch(e.target.value); setShowCount(12); };

    return (
      <div className="font-condensed">
        {/* ── HERO ── */}
        <section
  id="parts-hero"
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

      <span className="text-white">Parts</span>
    </p>

    {/* Subtitle */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
      PT Braja Mukti Cakra
    </p>

    {/* Title */}
    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4 drop-shadow-lg">
      Spare Parts Catalog
    </h1>

    {/* Description */}
    <p className="text-white/70 text-[16px] leading-relaxed max-w-lg drop-shadow-md">
      Precision Engineering for Global Industries
    </p>
  </div>
</section>

        {/* ── KATALOG PRODUK (kode lama, tidak diubah) ── */}
      <section className="bg-site py-[60px_0] font-condensed min-h-screen pb-20 md:pb-28">
          <div className="max-w-[1280px] mx-auto px-6 pt-16">

            {/* Heading */}
            <div className="text-center mt-4">
              <p className="text-[0.62rem] font-bold text-gold tracking-[0.2em] uppercase mb-3">
                Precision Manufacturing Since 1986
              </p>
              <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold text-navy uppercase tracking-[0.03em] leading-[1.1] mb-[14px]">
                Katalog Produk Lengkap
              </h2>
              <div className="w-[52px] h-[3px] bg-gold mx-auto mb-[18px] rounded-sm" />
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 mb-8">

              <div className="relative max-w-[440px]">
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="#6B7A9E" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari produk, kategori, atau aplikasi..."
                  className="w-full h-[46px] pl-[42px] pr-4 border-[1.5px] border-bdr rounded-[9px] text-[0.86rem] text-navy bg-white font-condensed transition-[border-color,box-shadow] duration-200 placeholder-[#a0aac4] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,168,67,0.15)]"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => {
                  const active = activeCat === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => resetAndFilter(cat)}
                      className={[
                        "px-[18px] py-[7px] rounded-3xl border-[1.5px] text-[0.7rem] font-bold tracking-[0.07em] uppercase cursor-pointer font-condensed transition-all duration-[180ms] inline-flex items-center gap-[7px]",
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-bdr bg-white text-muted hover:border-navy hover:text-navy hover:bg-[#EEF1FB]",
                      ].join(" ")}
                    >
                      {cat}
                      {active && filtered.length > 0 && (
                        <span className="bg-gold text-navy text-[0.6rem] font-bold px-[7px] py-[1px] rounded-[10px] leading-[1.6]">
                          {filtered.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {(search || activeCat !== "All") && (
              <p className="text-[0.78rem] text-muted mb-5">
                {filtered.length === 0
                  ? "Tidak ada produk ditemukan"
                  : `Menampilkan ${visible.length} dari ${filtered.length} produk`}
                {search && <> untuk "<strong className="text-navy">{search}</strong>"</>}
              </p>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-base font-bold text-navy mb-2">Produk tidak ditemukan</p>
                <p className="text-[0.82rem] text-muted mb-5">
                  Coba kata kunci lain atau pilih kategori berbeda
                </p>
                <button
                  onClick={() => { setSearch(""); setActiveCat("All"); }}
                  className="px-6 py-[9px] bg-navy text-white border-none rounded-lg text-[0.75rem] font-bold tracking-[0.08em] uppercase font-condensed cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {filtered.length > 0 && (
              <>
                <div
                  className="grid gap-5"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))" }}
                >
                  {visible.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onClick={setSelected} />
                  ))}
                </div>

                {hasMore && (
    <div className="text-center mt-11">
      <button
        onClick={() => setShowCount((v) => v + 12)}
        className="px-10 py-[13px] border-2 border-navy rounded-[9px] bg-white text-navy text-[0.75rem] font-bold tracking-[0.1em] uppercase font-condensed cursor-pointer transition-all duration-200 hover:bg-navy hover:text-gold"
      >
        Tampilkan Lebih Banyak ({filtered.length - showCount} produk tersisa)
      </button>
    </div>
  )}
              </>
            )}
          </div>

          {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
        </section>
      </div>
    );
  };

  export default Parts;