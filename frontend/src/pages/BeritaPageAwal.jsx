import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Calendar } from "lucide-react";
import newsData from "../data/newsData";

const BeritaPageAwal = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("All");

  const years = useMemo(
    () => ["All", ...new Set(newsData.map((n) => n.year))],
    []
  );

  const filteredNews = useMemo(
    () =>
      selectedYear === "All"
        ? newsData
        : newsData.filter((n) => n.year === selectedYear),
    [selectedYear]
  );

  return (
    <div className="bg-white font-['Roboto_Condensed',sans-serif]">
      {/* ── HERO ── */}
      <section
        id="berita-hero"
        className="relative h-[40vh] min-h-80 flex items-end bg-[#0D1F5C] overflow-hidden"
      >
        <img
          src={newsData[0].image}
          alt="Siaran Pers & Berita BMC"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1F5C]/80 via-[#0D1F5C]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F5C]/70 via-transparent to-transparent" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-999 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
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
            <span className="text-white">Siaran Pers & Berita</span>
          </p>
          <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4 drop-shadow-lg">
            Siaran Pers & Berita
          </h1>
          <p className="text-white/70 text-[16px] leading-relaxed max-w-lg drop-shadow-md">
            Update terbaru seputar aktivitas, inovasi, dan pencapaian PT Braja
            Mukti Cakra
          </p>
        </div>
      </section>

      {/* ── FILTER + LIST ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div
          className="mb-10 flex flex-col gap-2 max-w-[220px]"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <label className="text-[13px] font-semibold text-[#0D1F5C] uppercase tracking-wide">
            Tahun
          </label>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843] cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4A843] pointer-events-none"
            />
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <p className="text-gray-500 text-sm py-10 text-center">
            Tidak ada berita untuk tahun ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, idx) => (
              <article
                key={news.id}
                onClick={() => navigate(`/berita/${news.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={idx * 100}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#D4A843] text-[#0D1F5C] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {news.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={13} />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0D1F5C] leading-snug line-clamp-3 group-hover:text-[#D4A843] transition-colors duration-200">
                    {news.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-semibold text-[#D4A843] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Baca selengkapnya <ChevronRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BeritaPageAwal;