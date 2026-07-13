import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blackimage from "../assets/blackimage.jpg";
import bmc2 from "../assets/bmc2.jpg";
import {
    ChevronRight,
    MapPin,
    User,
    Phone,
    Printer,
    Mail,
    Navigation,
    Clock,
} from "lucide-react";

/* ─── DATA LOKASI ── */
const LOCATION = {
    name: "PT Braja Mukti Cakra",
    address:
        "Jl. Desa Harapan Kita No.4, RT.001/RW.020, Harapan Jaya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17124, Indonesia",
    lat: -6.2023676,
    lng: 106.9981441,
    placeId: "ChIJ8aBcPSKMaS4RgcagNfKtZUI",
};

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}&hl=id&z=17&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}&destination_place_id=${LOCATION.placeId}`;

const ContactUs = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const to = "marketingteam@bmc.co.id";
        const subject = encodeURIComponent(form.subject || "Pertanyaan dari Website");
        const body = encodeURIComponent(
            `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-white font-['Roboto_Condensed',sans-serif]">
            {/* ── HERO ── */}
            <section
  id="contact-hero"
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

      <span className="text-white">Contact Us</span>
    </p>

    {/* Subtitle */}
    <p className="text-[#D4A843] text-[11px] font-medium tracking-[0.16em] uppercase mb-4">
      PT Braja Mukti Cakra
    </p>

    {/* Title */}
    <h1 className="text-[48px] md:text-[64px] font-bold text-white leading-[1.05] mb-4 drop-shadow-lg">
      Contact Us
    </h1>

    {/* Description */}
    <p className="text-white/70 text-[16px] leading-relaxed max-w-lg drop-shadow-md">
      Kami siap membantu kebutuhan spare part dan kerja sama bisnis Anda.
    </p>
  </div>
</section>

            {/* ── CONTACT INFO + MAP ── */}
            <section className="relative py-24 px-6 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div
                        className="text-center mb-14"
                        data-aos="fade-up"
                        data-aos-duration="700"
                    >
                        <p className="text-[#D4A843] text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
                            Get In Touch
                        </p>
                        <h2 className="text-[#0D1F5C] text-[32px] md:text-[42px] font-bold uppercase tracking-tight leading-[1.1] mb-4">
                            Office &amp; Factory
                        </h2>
                        <div className="w-[52px] h-[3px] bg-[#D4A843] mx-auto rounded-sm" />
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* ── INFO CARD ── */}
                        <div
                            className="lg:col-span-2 rounded-2xl bg-[#0D1F5C] p-8 md:p-10 relative overflow-hidden"
                            data-aos="fade-right"
                            data-aos-duration="700"
                        >
                           

                            <div className="relative z-10">
                                <p className="text-[#D4A843] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
                                    Office / Factory
                                </p>
                                <h3 className="text-white text-[20px] font-bold uppercase tracking-wide mb-8">
                                    PT Braja Mukti Cakra
                                </h3>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <MapPin size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Alamat
                                            </p>
                                            <p className="text-white text-[13.5px] leading-relaxed">
                                                Jl. Desa Harapan Kita No. 4, Kel. Harapan Jaya,
                                                Bekasi Utara 17124, Jawa Barat, Indonesia
                                            </p>
                                        </div>
                                    </div>

                                    {/* PIC */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <User size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Contact Person
                                            </p>
                                            <p className="text-white text-[13.5px] font-semibold leading-relaxed">
                                                Robyandi Dwi Ronudi
                                            </p>
                                            <p className="text-white/60 text-[12px] leading-relaxed">
                                                Commercial Dept. Head
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Phone size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Telepon
                                            </p>
                                            
                                            <a
                                                href="tel:+622188718360"
                                                className="text-white text-[13.5px] font-semibold hover:text-[#D4A843] transition-colors"
                                            >
                                                (62-21) 8871836
                                            </a>

                                        </div>
                                    </div>

                                    {/* Fax */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Printer size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Fax
                                            </p>
                                            <p className="text-white text-[13.5px] font-semibold">
                                                (62-21) 8878949
                                            </p>
                                        </div>
                                    </div>

                                    {/* Emails */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Mail size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Email
                                            </p>
                                            
                                            
                                            <a
                                                href="mailto:robyandidwi@bmc.co.id"
                                                className="block text-white text-[13.5px] font-semibold hover:text-[#D4A843] transition-colors truncate"
                                            >
                                                robyandidwi@bmc.co.id
                                            </a>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-3 mb-1">
                                                Marketing Email
                                            </p>
                                            
                                            <a
                                                href="mailto:marketingteam@bmc.co.id"
                                                className="block text-white text-[13.5px] font-semibold hover:text-[#D4A843] transition-colors truncate"
                                            >
                                                marketingteam@bmc.co.id
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex gap-4 pt-5 border-t border-white/10">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <Clock size={17} className="text-[#D4A843]" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                                                Jam Operasional
                                            </p>
                                            <p className="text-white text-[13px] leading-relaxed">
                                                Senin – Jumat, 07.00 – 17.00 WIB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── MAP ── */}
                        <div
                            className="lg:col-span-3 rounded-2xl overflow-hidden border border-[#E3E7F3] flex flex-col"
                            data-aos="fade-left"
                            data-aos-duration="700"
                        >
                            <div className="relative flex-1 min-h-[380px]">
                                <iframe
                                    title="Lokasi PT Braja Mukti Cakra"
                                    src={MAP_EMBED_SRC}
                                    className="absolute inset-0 w-full h-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="bg-[#F4F6FC] px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <p className="text-[#0D1F5C] text-[13px] font-bold uppercase tracking-wide mb-0.5">
                                        {LOCATION.name}
                                    </p>
                                    <p className="text-[#6B7A9E] text-[12px] leading-snug max-w-sm">
                                        {LOCATION.address}
                                    </p>
                                </div>

                                <a
                                    href={MAP_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-2 px-5 py-[10px] rounded-[9px] bg-[#0D1F5C] text-white text-[0.72rem] font-bold tracking-[0.06em] uppercase hover:opacity-90 transition-opacity"
                                >
                                    <Navigation size={14} />
                                    Petunjuk Arah
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        
        </div>
    );
};

export default ContactUs;