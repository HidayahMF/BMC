import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackimage from "../assets/blackimage.jpg";
import { ChevronRight, Target, Handshake, Sparkles } from "lucide-react";

const Visimisi = () => {
    const navigate = useNavigate();

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
                        <span className="text-white">Vission & Mission</span>
                    </p>
                    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
                        PT Braja Mukti Cakra
                    </p>
                    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4">
                        Vission & Mission
                    </h1>
                    <p className="text-white/50 text-[16px] leading-relaxed max-w-lg">
                        Precision Engineering for Global Industries
                    </p>
                </div>
            </section>

            {/* ── VISION & MISSION CARDS ── */}
            <section className="relative py-24 px-6 md:px-20 bg-white">
                {/* subtle background accent */}
                <div
                    className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full opacity-[0.04] pointer-events-none"
                    style={{ background: "#0D1F5C", filter: "blur(60px)" }}
                />

                <div className="max-w-6xl mx-auto relative">
                    {/* Section label */}
                    <div
                        className="text-center mb-16"
                        data-aos="fade-up"
                        data-aos-duration="700"
                    >
                        <p className="text-[#D4A843] text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
                            Fondasi Perusahaan
                        </p>
                        <h2 className="text-[#0D1F5C] text-[32px] md:text-[42px] font-bold uppercase tracking-tight leading-[1.1] mb-4">
                            Vision, Mission &amp; Motto
                        </h2>
                        <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto rounded-sm" />
                    </div>

                    {/* Vision & Mission grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* VISION */}
                        <div
                            className="group relative rounded-2xl bg-[#0D1F5C] p-10 md:p-12 overflow-hidden"
                            data-aos="fade-right"
                            data-aos-duration="700"
                        >
                            <div
                                className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full opacity-[0.08] transition-transform duration-500 group-hover:scale-110"
                                style={{ background: "#D4A843" }}
                            />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-[#D4A843]/15 border border-[#D4A843]/30 flex items-center justify-center mb-7">
                                    <Target size={24} className="text-[#D4A843]" strokeWidth={1.75} />
                                </div>
                                <p className="text-[#D4A843] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                                    Our Vision
                                </p>
                                <p className="text-white text-[26px] md:text-[30px] font-semibold leading-[1.35]">
                                    "To be a global{" "}
                                    <span className="text-[#D4A843]">parts maker</span>."
                                </p>
                            </div>
                        </div>

                        {/* MISSION */}
                        <div
                            className="group relative rounded-2xl bg-[#F4F6FC] border border-[#E3E7F3] p-10 md:p-12 overflow-hidden"
                            data-aos="fade-left"
                            data-aos-duration="700"
                        >
                            <div
                                className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full opacity-[0.05] transition-transform duration-500 group-hover:scale-110"
                                style={{ background: "#0D1F5C" }}
                            />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-[#0D1F5C]/8 border border-[#0D1F5C]/15 flex items-center justify-center mb-7">
                                    <Handshake size={24} className="text-[#0D1F5C]" strokeWidth={1.75} />
                                </div>
                                <p className="text-[#0D1F5C] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                                    Our Mission
                                </p>
                                <p className="text-[#0D1F5C] text-[26px] md:text-[30px] font-semibold leading-[1.35]">
                                    "Being a good partner for stakeholders with
                                    excellent{" "}
                                    <span className="text-[#D4A843]">
                                        QSV
                                    </span>
                                    ."
                                </p>
                                <div className="flex gap-4 mt-7 pt-6 border-t border-[#0D1F5C]/10">
                                    {[
                                        { l: "Quality" },
                                        { l: "Service" },
                                        { l: "Value" },
                                    ].map((q) => (
                                        <div key={q.l} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                                            <span className="text-[#6B7A9E] text-[12px] font-bold uppercase tracking-wider">
                                                {q.l}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MOTTO — full width banner */}
                    <div
                        className="relative rounded-2xl overflow-hidden border border-[#E3E7F3]"
                        data-aos="zoom-in"
                        data-aos-duration="700"
                        data-aos-delay="150"
                    >
                        <div className="relative bg-gradient-to-br from-[#0D1F5C] via-[#12275F] to-[#0A1642] px-10 py-14 md:py-16 flex flex-col items-center text-center">
                            {/* decorative grid */}
                            <div
                                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                }}
                            />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-full bg-[#D4A843]/15 border border-[#D4A843]/30 flex items-center justify-center mb-6 mx-auto">
                                    <Sparkles size={22} className="text-[#D4A843]" strokeWidth={1.75} />
                                </div>
                                <p className="text-[#D4A843] text-[11px] font-bold tracking-[0.22em] uppercase mb-5">
                                    Our Motto
                                </p>
                                <h3 className="text-white text-[36px] md:text-[52px] font-bold uppercase tracking-tight leading-[1.1]">
                                    "The Precision Value"
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Visimisi;