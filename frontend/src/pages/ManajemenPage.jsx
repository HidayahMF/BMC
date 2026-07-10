import React, { useState, useEffect } from "react";
import { ChevronRight, X, ArrowUpRight, Quote } from "lucide-react";
import { management } from "../data/ManajemenData";

const splitVIP = (data) => {
  const vipIdx = data.findIndex((p) =>
    p.position?.toLowerCase().includes("utama")
  );
  const idx = vipIdx === -1 ? 0 : vipIdx;
  const vip = data[idx];
  const rest = data.filter((_, i) => i !== idx);
  return { vip, rest };
};

const MonoBadge = ({ children, tone = "light" }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
      tone === "light"
        ? "border-white/25 bg-white/10 text-white/90 backdrop-blur-sm"
        : "border-[#0D1F5C]/15 bg-[#0D1F5C]/5 text-[#0D1F5C]"
    }`}
  >
    {children}
  </span>
);

const ProfileDrawer = ({ person, open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#08132E]/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] md:w-[500px] bg-[#FAFAF8] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {person && (
          <>
            {/* Photo banner */}
            <div className="relative h-64 md:h-80 flex-shrink-0">
              <img
                src={person.photo}
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08132E] via-[#08132E]/30 to-transparent" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(#D4A843 1px, transparent 1px), linear-gradient(90deg, #D4A843 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4A843] hover:border-[#D4A843] transition-colors duration-300 group"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D4A843] mb-2">
                  {person.code}
                </p>
                <h3 className="font-['Roboto_Condensed',sans-serif] text-2xl md:text-3xl font-bold text-white leading-tight">
                  {person.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">{person.position}</p>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-7">
                <MonoBadge tone="dark">{person.code}</MonoBadge>
              </div>

              <Quote size={22} className="text-[#D4A843] mb-3" strokeWidth={1.5} />
              <p className="text-[#334155] text-[15px] leading-relaxed">
                {person.bio}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-[#0D1F5C] hover:text-[#D4A843] transition-colors duration-200"
              >
                Lihat profil lengkap
                <ArrowUpRight size={14} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   VIP Feature — the leading figure of the board
──────────────────────────────────────────────────────────── */

const VIPCard = ({ person, label, onOpen }) => (
  <div
    className="relative grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden border border-[#0D1F5C]/10 shadow-xl shadow-[#0D1F5C]/[0.06]"
    data-aos="fade-up"
  >
    {/* Photo */}
    <div className="relative lg:col-span-3 h-[380px] lg:h-[560px] overflow-hidden">
      <img
        src={person.photo}
        alt={person.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08132E] via-[#08132E]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:from-transparent via-transparent to-[#08132E]/10" />

      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <MonoBadge>{label}</MonoBadge>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4A843] mb-3">
          {person.code}
        </p>
        <h2 className="font-['Roboto_Condensed',sans-serif] text-3xl md:text-5xl font-bold text-white leading-[1.05]">
          {person.name}
        </h2>
        <p className="text-white/70 text-base md:text-lg mt-2">
          {person.position}
        </p>
      </div>
    </div>

    {/* Info panel */}
    <div className="lg:col-span-2 bg-[#0D1F5C] relative flex flex-col justify-center p-8 md:p-12">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#D4A843 1px, transparent 1px), linear-gradient(90deg, #D4A843 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative">
        <Quote size={28} className="text-[#D4A843] mb-4" strokeWidth={1.5} />
        <p className="text-white/80 text-[15px] leading-relaxed line-clamp-6">
          {person.bio}
        </p>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-full bg-[#D4A843] text-[#0D1F5C] text-sm font-semibold hover:bg-white transition-colors duration-300"
        >
          Lihat profil lengkap
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────────
   Grid Card — remaining board members
──────────────────────────────────────────────────────────── */

const MemberCard = ({ person, onOpen }) => (
  <button
    onClick={onOpen}
    className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-transparent hover:border-[#D4A843] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0D1F5C]/15"
    data-aos="fade-up"
  >
    <img
      src={person.photo}
      alt={person.name}
      className="absolute inset-0 w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.08] transition-all duration-700 ease-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#08132E] via-[#08132E]/45 to-transparent group-hover:from-[#08132E]/95 transition-all duration-500" />

    <div className="absolute top-4 left-4">
      <span className="font-mono text-[10px] tracking-widest uppercase text-[#D4A843] bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
        {person.code}
      </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="font-['Roboto_Condensed',sans-serif] text-lg font-bold text-white leading-tight">
        {person.name}
      </h3>
      <p className="text-white/65 text-[13px] mt-0.5">{person.position}</p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#D4A843] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Profil
          <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  </button>
);

/* ────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────── */

const TABS = [
  { key: "commissioners", label: "Board of Commissioners", group: "board-of-commissioners" },
  { key: "directors", label: "Board of Directors", group: "board-of-directors" },
  { key: "heads", label: "Head of Departments", group: "head-of-department" },
];

const VIP_LABELS = {
  commissioners: "Pucuk Pimpinan Komisaris",
  directors: "Pucuk Pimpinan Direksi",
  heads: "Kepala Departemen",
};

const MEMBER_LABELS = {
  commissioners: "Komisaris",
  directors: "Direksi",
  heads: "Departemen",
};

const ManajemenPage = () => {
  const [activeTab, setActiveTab] = useState("commissioners");
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeGroup = TABS.find((tab) => tab.key === activeTab)?.group;
  const data = management.filter((item) => item.group === activeGroup);
  const { vip, rest } = splitVIP(data);
  const vipLabel = VIP_LABELS[activeTab];

  const openProfile = (person) => {
    setSelected(person);
    setDrawerOpen(true);
  };
  const closeProfile = () => setDrawerOpen(false);

  return (
    <div className="bg-[#FAFAF8] font-['Inter',sans-serif] min-h-screen">

      <button
        onClick={() => window.location.assign("/")}
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#08132E] py-24 px-6">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A843 1px, transparent 1px), linear-gradient(90deg, #D4A843 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute left-0 top-1/2 w-24 h-px bg-[#D4A843]/60 hidden md:block" />
        <div className="absolute right-0 top-1/2 w-24 h-px bg-[#D4A843]/60 hidden md:block" />

        <div className="relative max-w-4xl mx-auto text-center" data-aos="fade-up" data-aos-duration="700">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4A843] mb-6">
            PT Braja Mukti Cakra — Struktur Kepemimpinan
          </p>
          <h1 className="font-['Roboto_Condensed',sans-serif] text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
            Memimpin Perubahan,
            <br />
            <span className="text-[#D4A843]">Setiap Langkah Optimis Bermakna.</span>
          </h1>
          <p className="text-white/50 text-[15px] max-w-xl mx-auto leading-relaxed">
            Tim manajemen yang menggabungkan presisi teknik dengan visi jangka
            panjang untuk industri manufaktur otomotif yang berkelanjutan.
          </p>
        </div>
      </section>

      {/* ── TAB SWITCH ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-7 relative z-10">
        <div className="flex justify-center">
          <div className="inline-flex bg-white border border-[#0D1F5C]/10 rounded-full p-1.5 shadow-lg shadow-[#0D1F5C]/5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold font-['Roboto_Condensed',sans-serif] transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-[#0D1F5C] text-white"
                    : "text-[#64748B] hover:text-[#0D1F5C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIP FEATURE ── */}
      {vip && (
        <section className="max-w-7xl mx-auto px-6 pt-16">
          <VIPCard person={vip} label={vipLabel} onOpen={() => openProfile(vip)} />
        </section>
      )}

      {/* ── MEMBER GRID ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#D4A843]">
            Anggota {MEMBER_LABELS[activeTab]} Lainnya
          </span>
          <div className="h-px flex-1 bg-[#0D1F5C]/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rest.map((person) => (
            <MemberCard
              key={person.code}
              person={person}
              onOpen={() => openProfile(person)}
            />
          ))}
        </div>
      </section>

      <ProfileDrawer person={selected} open={drawerOpen} onClose={closeProfile} />
    </div>
  );
};

export default ManajemenPage;