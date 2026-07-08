import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import newsData from "../data/newsData";

const BeritaPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = newsData.find((n) => n.slug === slug);
  const related = newsData.filter((n) => n.slug !== slug).slice(0, 3);


const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} {...props}>
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} {...props}>
    <path d="M18.9 3H22l-7.6 8.7L23 21h-6.8l-5.3-6.3L4.8 21H2l8.1-9.3L1.5 3h7l4.8 5.7L18.9 3zM17.6 19h1.9L7.5 5H5.5L17.6 19z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} {...props}>
    <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88zM20.45 21h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.08 0-2.4 1.63-2.4 3.31V21H9.24V8.5h3.24v1.71h.05c.45-.85 1.56-1.75 3.22-1.75 3.44 0 4.7 2.27 4.7 5.23V21z" />
  </svg>
);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-[#D4A843] text-sm uppercase tracking-widest mb-3">
          404
        </p>
        <h1 className="text-3xl font-bold text-[#0D1F5C] mb-4">
          Berita tidak ditemukan
        </h1>
        <button
          onClick={() => navigate("/berita")}
          className="inline-flex items-center gap-2 bg-[#0D1F5C] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0D1F5C]/90 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Berita
        </button>
      </div>
    );
  }

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="bg-white font-['Roboto_Condensed',sans-serif]">
      {/* ── HERO ── */}
      <section className="relative h-[45vh] min-h-96 flex items-end bg-[#0D1F5C] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F5C] via-[#0D1F5C]/50 to-transparent" />

        <button
          onClick={() => navigate("/berita")}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-20 inline-flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest hover:text-[#D4A843] transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Kembali ke Berita
        </button>

        <div className="relative z-10 px-6 md:px-20 pb-12 max-w-4xl">
          <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4 flex items-center flex-wrap">
            <Link to="/" className="hover:text-white/90">
              Home
            </Link>
            <ChevronRight size={12} className="mx-1" />
            <Link to="/berita" className="hover:text-white/90">
              Berita
            </Link>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-white line-clamp-1">{article.tag}</span>
          </p>

          <span className="inline-block bg-[#D4A843] text-[#0D1F5C] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4">
            {article.tag}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── META BAR ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#D4A843]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#D4A843]" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 uppercase tracking-wide mr-1">
              Bagikan
            </span>
          {[
  { Icon: FacebookIcon, href: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
  { Icon: TwitterIcon, href: `https://twitter.com/intent/tweet?url=${shareUrl}` },
  { Icon: LinkedinIcon, href: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#0D1F5C] hover:text-white hover:border-[#0D1F5C] transition-colors duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article className="max-w-4xl mx-auto px-6 py-14">
        <div className="prose prose-lg max-w-none text-gray-700 leading-9 [&_strong]:text-[#0D1F5C] [&_p]:mb-6">
          {article.content}
        </div>
      </article>

      {/* ── RELATED NEWS ── */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#0D1F5C]">
                Berita Lainnya
              </h2>
              <Link
                to="/berita"
                className="text-sm font-semibold text-[#D4A843] hover:text-[#0D1F5C] transition-colors inline-flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((news) => (
                <article
                  key={news.id}
                  onClick={() => navigate(`/berita/${news.slug}`)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#D4A843] text-[#0D1F5C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {news.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-400">{news.date}</span>
                    <h3 className="text-[15px] font-bold text-[#0D1F5C] leading-snug line-clamp-2 mt-2 group-hover:text-[#D4A843] transition-colors duration-200">
                      {news.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BeritaPage;