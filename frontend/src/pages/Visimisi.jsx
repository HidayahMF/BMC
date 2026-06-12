import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackimage from "../assets/blackimage.jpg";
import { ChevronRight } from "lucide-react";
const Visimisi = () => {
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

                        <span className="text-white">History & Milestones</span>
                    </p>
                    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
                        PT Braja Mukti Cakra
                    </p>
                    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4">
                        History & Milestones


                    </h1>
                    <p className="text-white/50 text-[16px] leading-relaxed max-w-lg">
                        Precision Engineering for Global Industries
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Visimisi