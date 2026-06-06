import React from 'react'
import { useNavigate } from 'react-router-dom'
import home1 from '../assets/home1.png'
import noimage from "../assets/noimage.jpg"
import blackimage from "../assets/blackimage.jpg"

const AboutSection = () => {
  const navigate = useNavigate()

  return (
    <section className="py-16 px-6 md:px-20 bg-white overflow-hidden">

      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">

        {/* Kolom kiri: teks */}
        <div data-aos="fade-right" data-aos-duration="800">

          <span className="inline-block text-[15px] font-bold font-['Roboto_Condensed',sans-serif] tracking-[0.12em] uppercase text-[#B8922A] bg-[#FDF3DC] px-4 py-1.5 rounded-full mb-5">
            About BMC
          </span>

          <h2
            className="text-[40px] font-bold font-['Roboto_Condensed',sans-serif] leading-[1.12] text-[#0D1F5C] max-w-md mb-3"
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            The Precision Value
          </h2>

          <div
            className="w-12 h-0.5 bg-[#D4A843] rounded mb-7"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="600"
          />

          <p
            className="text-[18px] leading-relaxed text-gray-500 max-w-md mb-4"
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            PT Braja Mukti Cakra (BMC) is a precision component manufacturer
            serving automotive OEM and Replacement Market customers — including
            Mitsubishi, Hino, Isuzu, Toyota, and more — as well as the Heavy
            Equipment, Agribusiness, and General Machining industries.
          </p>

          <p
            className="text-[18px] leading-relaxed text-gray-500 max-w-md mb-9"
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            With over 25 years of experience, we deliver consistent quality,
            competitive pricing, and on-time delivery across domestic and
            global markets.
          </p>

          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-2 bg-[#0D1F5C] text-white font-bold font-['Roboto_Condensed',sans-serif] uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[#D4A843] hover:text-[#0D1F5C] transition-all duration-200"           
            data-aos-delay="100"
            data-aos-duration="600"
          >
            Learn more about us
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Kolom kanan: gambar */}
        <div
          className="relative md:self-stretch"
          data-aos="fade-left"
          data-aos-duration="900"
          data-aos-delay="200"
        >
          <div className="md:-mr-20 md:-mb-16 h-full overflow-hidden rounded-sm">
            <img
              src={blackimage}
              alt="BMC Manufacturing"
              className="w-full h-full min-h-[360px] object-cover"
            />
          </div>      
        </div>
      </div>

    </section>
  )
}

export default AboutSection