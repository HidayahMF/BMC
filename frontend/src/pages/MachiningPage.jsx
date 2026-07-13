import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Factory,
  Settings,
  Cog,
  Disc,
  CircleDot,
  Layers,
  Wind,
  Component,
  Boxes,
  Ruler,
  Gauge,
  Microscope,
  ScanLine,
  BadgeCheck,
  ClipboardCheck,
  Truck,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

import AxleAssyLine1 from "../assets/AxleAssyLine1.png";
import AxleAssyLine2 from "../assets/AxleAssyLine2.png";
import BRAKEASSYLINE from "../assets/BRAKEASSYLINE.png";
import DiscBrakeLine from "../assets/DiscBrakeLine.png";
import DrumBrakeAndHUBCAT3Line from "../assets/DrumBrakeHUBCAT3Line.png";
import EXHGASLINEEGR from "../assets/EXHGASLINEEGR.png";
import EXHMANIFOLDLINE from "../assets/EXHMANIFOLDLINE.png";
import KnuckleLine from "../assets/KnuckleLine.png";
import MACHBALANCING from "../assets/MACHBALANCING.png";
import MACHDOOSAN4500 from "../assets/MACHDOOSAN4500.png";
import MACHDOOSAN5700 from "../assets/MACHDOOSAN5700.png";
import MACHDOOSANDNM5700 from "../assets/MACHDOOSANDNM5700.png";
import MACHDOOSANNHP6300 from "../assets/MACHDOOSANNHP6300.png";
import MACHDOOSANV8300 from "../assets/MACHDOOSANV8300.png";
import MACHHONNING from "../assets/MACHHONNING.png";
import MACHLEAKTEST from "../assets/MACHLEAKTEST.png";
import MACHMAKINOn51nx from "../assets/MACHMAKINOnnx.png";
import MACHMAKINOSLIM3N from "../assets/MACHMAKINOSLIM3N.png";
import MACHROBOTICLEANTEC from "../assets/MACHROBOTICLEANTEC.png";
import SPMCHECKDTVRRDISC from "../assets/SPMCHECKDTVRRDISC.png";
import MCPOLISHING from "../assets/MCPOLISHING.png";
import PHOTOMICRO from "../assets/PHOTOMICRO.png";
import HARDNESSVICKERSROCKWELL from "../assets/HARDNESSVICKERSROCKWELL.png";
import HARDNESSBRINELL from "../assets/HARDNESSBRINELL.png";
import SURFCOM from "../assets/SURFCOM.png";
import CMMACCURA from "../assets/CMMACCURA.png";
import CMMACCRETECH from "../assets/CMMACCRETECH.png";
import CMMHEXAGON from "../assets/CMMHEXAGON.png";
import ROBOTTO from "../assets/ROBOTTO.png";

/* ══════════════════════════════════════════════════════════
   DATA — FACILITIES (tidak diubah)
══════════════════════════════════════════════════════════ */
const FACILITIES = [
      { name: "Robot Disc Brake",             category: "Machining Center", image: ROBOTTO },
  { name: "Doosan 4500",                category: "Machining Center", image: MACHDOOSAN4500 },
  { name: "Doosan 5700",                category: "Machining Center", image: MACHDOOSAN5700 },
  { name: "Doosan DNM 5700",            category: "Machining Center", image: MACHDOOSANDNM5700 },
  { name: "Doosan NHP 6300",            category: "Machining Center", image: MACHDOOSANNHP6300 },
  { name: "Doosan V8300",               category: "Machining Center", image: MACHDOOSANV8300 },
    { name: "Makino n51nx",               category: "Machining Center", image: MACHMAKINOn51nx },
      { name: "Robotic Cleantec",           category: "Machining Center", image: MACHROBOTICLEANTEC },
      { name: "SPM Check DTV RR Disc",      category: "Machining Center", image: SPMCHECKDTVRRDISC },
  { name: "Honning Machine",            category: "Machining Center", image: MACHHONNING },
  { name: "Leak Test Machine",          category: "Machining Center", image: MACHLEAKTEST },

  { name: "Makino Slim 3N",             category: "Machining Center", image: MACHMAKINOSLIM3N },



  { name: "Balancing Machine",          category: "Machining Center", image: MACHBALANCING },
  { name: "MC Polishing",               category: "Machining Center", image: MCPOLISHING },
  { name: "Axle Assy Line 1",           category: "Production Line", image: AxleAssyLine1 },
  { name: "Axle Assy Line 2",           category: "Production Line", image: AxleAssyLine2 },
  { name: "Brake Assy Line",            category: "Production Line", image: BRAKEASSYLINE },
  { name: "Disc Brake Line",            category: "Production Line", image: DiscBrakeLine },
  { name: "Drum Brake & Hub CAT3 Line", category: "Production Line", image: DrumBrakeAndHUBCAT3Line },
  { name: "Exhaust Gas Line EGR",       category: "Production Line", image: EXHGASLINEEGR },
  { name: "Exhaust Manifold Line",      category: "Production Line", image: EXHMANIFOLDLINE },
  { name: "Knuckle Line",               category: "Production Line", image: KnuckleLine },

  { name: "Photomicroscope",            category: "Quality & Inspection Lab", image: PHOTOMICRO },
  { name: "Hardness Vickers/Rockwell",  category: "Quality & Inspection Lab", image: HARDNESSVICKERSROCKWELL },
  { name: "Hardness Brinell",           category: "Quality & Inspection Lab", image: HARDNESSBRINELL },
  { name: "Surfcom",                    category: "Quality & Inspection Lab", image: SURFCOM },
  { name: "CMM Accura",                 category: "Quality & Inspection Lab", image: CMMACCURA },
  { name: "CMM Accretech",              category: "Quality & Inspection Lab", image: CMMACCRETECH },
  { name: "CMM Hexagon",                category: "Quality & Inspection Lab", image: CMMHEXAGON },
];

const CATEGORIES = ["All", "Production Line", "Machining Center", "Quality & Inspection Lab"];

const CAT_COLOR = {
  "Production Line":          { bg: "#EEF9F1", text: "#3B6D11" },
  "Machining Center":         { bg: "#EBF5FF", text: "#185FA5" },
  "Quality & Inspection Lab": { bg: "#F3F0FF", text: "#5C3D9E" },
};

/* ══════════════════════════════════════════════════════════
   DATA — LIGHTBOX ENRICHMENT (per mesin)
══════════════════════════════════════════════════════════ */
const MACHINE_INFO = {
  "Axle Assy Line 1": {
    machineType: "Semi-Automatic Assembly Line",
    description:
      "Lini perakitan komponen axle assembly dengan kombinasi proses manual terkontrol dan bantuan alat bantu presisi untuk menjamin konsistensi torsi dan posisi komponen.",
    applications: ["Axle Assembly – Commercial Vehicle", "Axle Assembly – Heavy Equipment"],
    keyFeatures: ["Torque control terkalibrasi", "Fixture khusus per varian axle", "In-line visual check"],
  },
  "Axle Assy Line 2": {
    machineType: "Semi-Automatic Assembly Line",
    description:
      "Lini perakitan kedua yang memperluas kapasitas produksi axle assembly untuk memenuhi volume pesanan OEM dan REM secara paralel.",
    applications: ["Axle Assembly – Commercial Vehicle", "Axle Assembly – Passenger Car"],
    keyFeatures: ["Dual-line capacity", "Standarisasi proses dengan Line 1", "Traceability per batch"],
  },
  "Brake Assy Line": {
    machineType: "Assembly Line",
    description:
      "Lini perakitan sistem rem yang menggabungkan komponen drum/disc, hub, dan hardware pendukung menjadi satu unit brake assembly siap pasang.",
    applications: ["Brake Assembly RH/LH", "Commercial & Passenger Vehicle"],
    keyFeatures: ["Sequenced assembly station", "Final function check", "Barcode traceability"],
  },
  "Disc Brake Line": {
    machineType: "Dedicated Machining & Assembly Line",
    description:
      "Lini khusus untuk proses machining dan finishing disc brake dengan toleransi ketebalan dan run-out yang ketat sesuai standar otomotif.",
    applications: ["Disc Brake – Passenger Car", "Disc Brake – Light Commercial Vehicle"],
    keyFeatures: ["Kontrol run-out presisi tinggi", "Automatic thickness check", "Surface finish terkontrol"],
  },
  "Drum Brake & Hub CAT3 Line": {
    machineType: "Combined Machining Line",
    description:
      "Lini gabungan untuk machining drum brake dan hub kategori berat (CAT3), dirancang untuk menangani dimensi dan beban kerja komponen heavy-duty.",
    applications: ["Brake Drum Cat III", "Hub Cat III"],
    keyFeatures: ["Kapasitas heavy-duty", "Multi-stage machining", "Konsistensi dimensi tinggi"],
  },
  "Exhaust Gas Line EGR": {
    machineType: "Dedicated Production Line",
    description:
      "Lini produksi komponen exhaust gas recirculation (EGR) yang menuntut presisi jalur aliran gas serta ketahanan terhadap temperatur tinggi.",
    applications: ["EGR System Components", "Emission Control Parts"],
    keyFeatures: ["Toleransi jalur aliran presisi", "Uji ketahanan panas", "Sesuai standar emisi"],
  },
  "Exhaust Manifold Line": {
    machineType: "Production Line",
    description:
      "Lini produksi exhaust manifold dengan proses machining dan inspeksi kebocoran untuk memastikan performa sistem pembuangan optimal.",
    applications: ["Exhaust Manifold RR/FR", "Exhaust Manifold Pipe"],
    keyFeatures: ["Leak test terintegrasi", "Machining multi-titik", "Kontrol dimensi ketat"],
  },
  "Knuckle Line": {
    machineType: "Precision Machining Line",
    description:
      "Lini machining komponen steering knuckle yang menopang beban struktural kendaraan, membutuhkan akurasi geometris tinggi.",
    applications: ["Steering Knuckle – Commercial Vehicle", "Steering Knuckle – Heavy Equipment"],
    keyFeatures: ["Machining multi-axis", "Kontrol geometri presisi", "Uji beban struktural"],
  },
  "Balancing Machine": {
    machineType: "Dynamic Balancing Machine",
    description:
      "Mesin untuk menyeimbangkan komponen berputar seperti flywheel dan drum guna mengurangi getaran dan meningkatkan umur pakai komponen.",
    applications: ["Flywheel Balancing", "Rotating Component Balancing"],
    keyFeatures: ["Deteksi unbalance presisi tinggi", "Otomatis rekomendasi koreksi", "Mengurangi vibrasi operasional"],
  },
  "Doosan 4500": {
    machineType: "CNC Machining Center",
    description:
      "Mesin CNC multi-axis untuk proses machining komponen presisi dengan kapasitas produksi menengah, cocok untuk part dengan geometri kompleks.",
    applications: ["Precision Machining – Brake & Axle Components"],
    keyFeatures: ["Multi-axis CNC control", "Toleransi mikron", "Cocok untuk batch produksi menengah"],
  },
  "Doosan 5700": {
    machineType: "CNC Machining Center",
    description:
      "Mesin CNC dengan area kerja lebih luas, digunakan untuk machining komponen berukuran lebih besar dengan tetap menjaga akurasi tinggi.",
    applications: ["Precision Machining – Hub & Drum Components"],
    keyFeatures: ["Working area luas", "Kecepatan spindle tinggi", "Stabilitas machining jangka panjang"],
  },
  "Doosan DNM 5700": {
    machineType: "CNC Vertical Machining Center",
    description:
      "Mesin vertical machining center untuk proses milling presisi dengan fleksibilitas tinggi terhadap berbagai jenis komponen otomotif.",
    applications: ["Milling – Automotive Components"],
    keyFeatures: ["Vertical spindle configuration", "Fleksibel untuk berbagai part", "Repeatability tinggi"],
  },
  "Doosan NHP 6300": {
    machineType: "CNC Horizontal Machining Center",
    description:
      "Mesin horizontal machining center berkapasitas besar untuk produksi volume tinggi dengan efisiensi siklus yang optimal.",
    applications: ["High-Volume Machining – Brake & Axle Parts"],
    keyFeatures: ["Konfigurasi horizontal untuk efisiensi", "Cocok volume produksi tinggi", "Automasi pallet changer"],
  },
  "Doosan V8300": {
    machineType: "CNC Machining Center",
    description:
      "Mesin CNC dengan kapasitas kerja besar untuk komponen berdimensi lebih besar, mendukung proses machining tahap akhir yang presisi.",
    applications: ["Machining – Large Dimension Components"],
    keyFeatures: ["Kapasitas beban kerja besar", "Presisi tinggi pada part besar", "Efisiensi siklus produksi"],
  },
  "Honning Machine": {
    machineType: "Honing Machine",
    description:
      "Mesin honing untuk menghaluskan permukaan internal komponen silindris hingga mencapai kekasaran permukaan sesuai spesifikasi fungsional.",
    applications: ["Internal Bore Finishing"],
    keyFeatures: ["Kontrol kekasaran permukaan presisi", "Proses finishing internal bore", "Meningkatkan umur komponen"],
  },
  "Leak Test Machine": {
    machineType: "Automatic Leak Test Machine",
    description:
      "Mesin uji kebocoran otomatis untuk memvalidasi kerapatan komponen sebelum dilanjutkan ke proses berikutnya, khususnya komponen exhaust.",
    applications: ["Leak Testing – Exhaust Components"],
    keyFeatures: ["Deteksi kebocoran otomatis", "Standar tekanan uji terkalibrasi", "Data hasil uji terekam digital"],
  },
  "Makino n51nx": {
    machineType: "CNC Horizontal Machining Center",
    description:
      "Mesin CNC horizontal berteknologi tinggi untuk proses machining presisi dengan kecepatan dan akurasi tinggi pada volume produksi besar.",
    applications: ["High-Precision Machining – Automotive Parts"],
    keyFeatures: ["Teknologi Makino presisi tinggi", "Kecepatan produksi tinggi", "Cocok untuk komponen kritikal"],
  },
  "Makino Slim 3N": {
    machineType: "CNC Machining Center",
    description:
      "Mesin CNC dengan desain compact yang tetap menghadirkan performa machining presisi tinggi untuk efisiensi ruang produksi.",
    applications: ["Precision Machining – Compact Components"],
    keyFeatures: ["Desain compact hemat ruang", "Presisi machining tinggi", "Efisiensi energi"],
  },
  "Robotic Cleantec": {
    machineType: "Robotic Cleaning System",
    description:
      "Sistem pembersihan otomatis berbasis robot untuk menghilangkan chip dan residu machining, menjaga kebersihan komponen sebelum proses inspeksi.",
    applications: ["Component Cleaning – Post Machining"],
    keyFeatures: ["Proses cleaning otomatis", "Konsisten dan bebas kontaminasi", "Mendukung standar kebersihan part"],
  },
  "SPM Check DTV RR Disc": {
    machineType: "Special Purpose Measuring Machine",
    description:
      "Mesin ukur khusus (Special Purpose Machine) untuk memeriksa Disc Thickness Variation (DTV) pada disc brake belakang guna mencegah gejala getaran pengereman.",
    applications: ["DTV Inspection – Rear Disc Brake"],
    keyFeatures: ["Deteksi variasi ketebalan otomatis", "Akurasi pengukuran tinggi", "Mencegah defect fungsional"],
  },
  "MC Polishing": {
    machineType: "Machine Polishing Unit",
    description:
      "Unit polishing untuk menghaluskan permukaan akhir komponen, meningkatkan kualitas estetika sekaligus fungsi anti korosi awal.",
    applications: ["Surface Finishing – Final Process"],
    keyFeatures: ["Hasil permukaan halus merata", "Meningkatkan tampilan produk akhir", "Proses terstandarisasi"],
  },
  "Photomicroscope": {
    machineType: "Metallurgical Microscope",
    description:
      "Mikroskop metalurgi untuk menganalisis struktur mikro material logam, digunakan dalam proses validasi hasil heat treatment.",
    applications: ["Metallurgical Structure Analysis"],
    keyFeatures: ["Pembesaran tinggi presisi", "Analisis struktur butir material", "Validasi hasil heat treatment"],
  },
  "Hardness Vickers/Rockwell": {
    machineType: "Hardness Testing Machine",
    description:
      "Alat uji kekerasan material dengan metode Vickers dan Rockwell untuk memastikan sifat mekanis komponen sesuai spesifikasi desain.",
    applications: ["Hardness Testing – Machined Components"],
    keyFeatures: ["Dua metode pengujian standar", "Akurasi hasil tinggi", "Sesuai standar JIS"],
  },
  "Hardness Brinell": {
    machineType: "Hardness Testing Machine",
    description:
      "Alat uji kekerasan metode Brinell, umum digunakan untuk material dengan struktur kasar atau permukaan yang tidak homogen.",
    applications: ["Hardness Testing – Casting & Forged Components"],
    keyFeatures: ["Cocok material struktur kasar", "Hasil uji konsisten", "Sesuai standar industri"],
  },
  "Surfcom": {
    machineType: "Surface Roughness Tester",
    description:
      "Alat ukur kekasaran dan profil permukaan untuk memastikan hasil akhir komponen memenuhi persyaratan fungsional dan estetika.",
    applications: ["Surface Roughness Measurement"],
    keyFeatures: ["Pengukuran profil permukaan detail", "Data kuantitatif terukur", "Mendukung kontrol kualitas proses"],
  },
  "CMM Accura": {
    machineType: "Coordinate Measuring Machine",
    description:
      "Mesin ukur koordinat 3D untuk verifikasi dimensi geometris komponen secara menyeluruh dengan tingkat akurasi tinggi.",
    applications: ["Dimensional Inspection – Complex Geometry"],
    keyFeatures: ["Pengukuran 3D multi-titik", "Akurasi mikron", "Laporan inspeksi digital"],
  },
  "CMM Accretech": {
    machineType: "Coordinate Measuring Machine",
    description:
      "CMM dengan teknologi presisi tinggi untuk mendukung proses verifikasi dimensi pada komponen kritikal secara efisien.",
    applications: ["Dimensional Inspection – Critical Components"],
    keyFeatures: ["Kecepatan pengukuran tinggi", "Akurasi terverifikasi", "Terintegrasi dengan data QC"],
  },
  "CMM Hexagon": {
    machineType: "Coordinate Measuring Machine",
    description:
      "Mesin CMM kelas industri global yang digunakan untuk validasi akhir dimensi komponen sebelum produk dikirimkan ke pelanggan.",
    applications: ["Final Dimensional Verification"],
    keyFeatures: ["Standar pengukuran internasional", "Akurasi dan repeatability tinggi", "Mendukung full traceability"],
  },
  "Robot Disc Brake": {
  machineType: "Robotic Machining Cell",
  description:
    "Sel machining otomatis berbasis robot yang menangani proses loading dan unloading komponen disc brake pada CNC machining center. Sistem ini meningkatkan efisiensi produksi, menjaga konsistensi kualitas, serta mengurangi waktu siklus melalui otomatisasi proses penanganan material.",
  applications: [
    "Disc Brake Machining",
    "Automatic CNC Loading & Unloading",
    "Automotive Brake Components"
  ],
  keyFeatures: [
    "6-axis industrial robot automation",
    "Automatic loading & unloading system",
    "Reduced cycle time",
    "Consistent part positioning",
    "Improved production safety",
    "High repeatability and accuracy"
  ],
},
};

/* ══════════════════════════════════════════════════════════
   DATA — SECTION 3: MACHINING LINE CAPACITIES
══════════════════════════════════════════════════════════ */
const CAPACITIES = [
  { title: "Brake Drum Cat I",      lines: "2 Lines", icon: Disc,      desc: "Machining line untuk brake drum kategori ringan dengan presisi dimensi tinggi." },
  { title: "Brake Drum Cat II",     lines: "3 Lines", icon: Disc,      desc: "Kapasitas produksi menengah untuk brake drum kendaraan komersial." },
  { title: "Brake Drum Cat III",    lines: "2 Lines", icon: Disc,      desc: "Line khusus brake drum heavy-duty untuk aplikasi beban berat." },
  { title: "Hub Cat I",             lines: "1 Line",  icon: CircleDot, desc: "Machining hub kategori ringan dengan siklus proses efisien." },
  { title: "Hub Cat II",            lines: "3 Lines", icon: CircleDot, desc: "Kapasitas produksi hub menengah untuk kebutuhan volume tinggi." },
  { title: "Hub Cat III",           lines: "2 Lines", icon: CircleDot, desc: "Line hub heavy-duty untuk aplikasi kendaraan komersial berat." },
  { title: "Flywheel",              lines: "2 Lines", icon: Settings,  desc: "Machining dan balancing presisi untuk komponen flywheel." },
  { title: "Pressure Plate",        lines: "2 Lines", icon: Layers,    desc: "Produksi pressure plate dengan kontrol kerataan permukaan ketat." },
  { title: "Disc Brake",            lines: "3 Lines", icon: Disc,      desc: "Machining disc brake dengan toleransi run-out & ketebalan presisi." },
  { title: "Exhaust Manifold RR/FR",lines: "Dedicated Line", icon: Wind, desc: "Produksi exhaust manifold depan dan belakang, teruji ketahanan panas." },
  { title: "Exhaust Manifold Pipe", lines: "Dedicated Line", icon: Wind, desc: "Machining pipa exhaust manifold dengan uji kebocoran terintegrasi." },
  { title: "Knuckle",               lines: "Dedicated Line", icon: Component, desc: "Machining steering knuckle dengan akurasi geometris struktural." },
  { title: "Brake Assy RH/LH",      lines: "Dedicated Line", icon: Cog, desc: "Perakitan brake assembly kanan & kiri dengan final function check." },
  { title: "Multipurpose Line",     lines: "Flexible Line", icon: Boxes, desc: "Line fleksibel untuk menangani variasi part sesuai kebutuhan produksi." },
];

/* ══════════════════════════════════════════════════════════
   DATA — SECTION 5: QUALITY CONTROL FACILITIES
══════════════════════════════════════════════════════════ */
const QC_FACILITIES = [
  {
    equipment: "Coordinate Measuring Machine (CMM)",
    function: "Mengukur dimensi geometris komponen secara presisi tiga dimensi.",
    benefit: "Menjamin akurasi dimensi sesuai spesifikasi teknis pelanggan.",
    icon: ScanLine,
  },
  {
    equipment: "Surface Measurement (Surfcom)",
    function: "Mengukur kekasaran dan profil permukaan hasil machining.",
    benefit: "Memastikan kualitas permukaan sesuai persyaratan fungsional.",
    icon: Ruler,
  },
  {
    equipment: "Hardness Testing",
    function: "Menguji kekerasan material hasil proses heat treatment.",
    benefit: "Menjamin ketahanan dan umur pakai komponen jangka panjang.",
    icon: Gauge,
  },
  {
    equipment: "Metallurgical Analysis",
    function: "Menganalisis struktur mikro material logam secara detail.",
    benefit: "Mendeteksi potensi cacat material sejak tahap awal produksi.",
    icon: Microscope,
  },
  {
    equipment: "Calibration Equipment",
    function: "Melakukan kalibrasi berkala pada seluruh alat ukur produksi.",
    benefit: "Menjaga konsistensi dan traceability hasil pengukuran.",
    icon: BadgeCheck,
  },
];

/* ══════════════════════════════════════════════════════════
   DATA — SECTION 6: INSPECTION STANDARDS
══════════════════════════════════════════════════════════ */
const STANDARDS = ["JIS B0651", "JIS B7440", "JIS B7451", "JIS B7153", "JIS Z2243", "JIS B7506"];

/* ══════════════════════════════════════════════════════════
   DATA — SECTION 7: INSPECTION WORKFLOW
══════════════════════════════════════════════════════════ */
const WORKFLOW = [
  { label: "Raw Material",             icon: Boxes },
  { label: "Machining",                icon: Cog },
  { label: "Dimensional Inspection",   icon: Ruler },
  { label: "Surface Inspection",       icon: ScanLine },
  { label: "Hardness Test",            icon: Gauge },
  { label: "Final Inspection",         icon: ClipboardCheck },
  { label: "Delivery",                 icon: Truck },
];

/* ══════════════════════════════════════════════════════════
   DATA — SECTION 8: MANUFACTURING ADVANTAGES
══════════════════════════════════════════════════════════ */
const ADVANTAGES = [
  { title: "Precision Machining", desc: "Toleransi machining presisi tinggi untuk menjamin akurasi setiap komponen.", icon: Ruler },
  { title: "Automated Production", desc: "Kombinasi otomasi dan robotik untuk efisiensi dan konsistensi proses produksi.", icon: Cpu },
  { title: "Skilled Engineers", desc: "Tim engineer berpengalaman yang memahami standar manufaktur otomotif global.", icon: Users },
  { title: "Strict Quality Inspection", desc: "Sistem inspeksi berlapis di setiap tahap proses produksi.", icon: ShieldCheck },
  { title: "Automotive Standards", desc: "Proses produksi mengacu pada standar internasional industri otomotif.", icon: Award },
  { title: "Continuous Improvement", desc: "Budaya perbaikan berkelanjutan untuk efisiensi dan kualitas jangka panjang.", icon: TrendingUp },
];

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
   COMPONENT — Animated Stat Counter
══════════════════════════════════════════════════════════ */
function StatCounter({ value, suffix = "", label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          const duration = 1800;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started, value]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="w-14 h-14 rounded-xl bg-[#D4A843]/10 border border-[#D4A843]/25 flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-[#D4A843]" strokeWidth={1.75} />
      </div>
      <p className="text-white text-[2.2rem] md:text-[2.8rem] font-bold leading-none mb-2 tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-[#AEB8DA] text-[0.68rem] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPONENT — Capacity Card
══════════════════════════════════════════════════════════ */
function CapacityCard({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const [hov, setHov] = useState(false);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${(index % 8) * 60}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      className={[
        "rounded-2xl bg-white border-[1.5px] p-6 font-condensed cursor-default",
        hov ? "border-[#D4A843] shadow-[0_16px_36px_rgba(13,31,92,0.12)]" : "border-[#E3E7F3] shadow-[0_2px_10px_rgba(13,31,92,0.04)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={{ background: hov ? "#0D1F5C" : "#F4F6FC" }}
        >
          <Icon size={20} className={hov ? "text-[#D4A843]" : "text-[#0D1F5C]"} strokeWidth={1.75} />
        </div>
        <span className="text-[0.6rem] font-bold text-[#0D1F5C] bg-[#F4F6FC] px-2.5 py-1 rounded-full uppercase tracking-widest">
          {item.lines}
        </span>
      </div>
      <h4 className="text-[#0D1F5C] text-[0.92rem] font-bold uppercase tracking-wide leading-snug mb-2">
        {item.title}
      </h4>
      <p className="text-[#6B7A9E] text-[0.76rem] leading-relaxed">{item.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPONENT — Quality Control Card
══════════════════════════════════════════════════════════ */
function QCCard({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 70}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="rounded-2xl bg-white border-[1.5px] border-[#E3E7F3] p-6 font-condensed hover:border-[#D4A843] hover:shadow-[0_16px_36px_rgba(13,31,92,0.12)] transition-all duration-200"
    >
      <div className="w-12 h-12 rounded-xl bg-[#0D1F5C] flex items-center justify-center mb-5">
        <Icon size={20} className="text-[#D4A843]" strokeWidth={1.75} />
      </div>
      <h4 className="text-[#0D1F5C] text-[0.9rem] font-bold uppercase tracking-wide leading-snug mb-3">
        {item.equipment}
      </h4>
      <div className="space-y-2.5">
        <div>
          <p className="text-[0.58rem] font-bold text-[#8B96C0] uppercase tracking-widest mb-1">Fungsi</p>
          <p className="text-[#6B7A9E] text-[0.76rem] leading-relaxed">{item.function}</p>
        </div>
        <div className="pt-2.5 border-t border-[#E3E7F3]">
          <p className="text-[0.58rem] font-bold text-[#8B96C0] uppercase tracking-widest mb-1">Manfaat Kualitas</p>
          <p className="text-[#3B6D11] text-[0.76rem] leading-relaxed font-medium">{item.benefit}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPONENT — Advantage Card
══════════════════════════════════════════════════════════ */
function AdvantageCard({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const [hov, setHov] = useState(false);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${index * 70}ms`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="rounded-2xl bg-white/[0.04] border border-white/10 p-7 font-condensed hover:bg-white/[0.07] hover:border-[#D4A843]/40 transition-all duration-250"
    >
      <div
        className="w-13 h-13 w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-6 transition-colors duration-200"
        style={{ background: hov ? "#D4A843" : "rgba(212,168,67,0.12)" }}
      >
        <Icon size={22} className={hov ? "text-[#0A1642]" : "text-[#D4A843]"} strokeWidth={1.75} />
      </div>
      <h4 className="text-white text-[0.94rem] font-bold uppercase tracking-wide leading-snug mb-2.5">
        {item.title}
      </h4>
      <p className="text-[#AEB8DA] text-[0.78rem] leading-relaxed">{item.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPONENT — Facility Card (tidak diubah)
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
   COMPONENT — Lightbox (UPGRADED)
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
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
        aria-label="Sebelumnya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      {/* Next */}
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
          {/* Image */}
          <div className="bg-[#F4F6FC] border-b md:border-b-0 md:border-r border-[#DDE1EF] flex items-center justify-center p-6 min-h-[260px]">
            <img
              src={item.image}
              alt={item.name}
              className="max-h-[320px] max-w-full object-contain rounded-lg"
            />
          </div>

          {/* Info */}
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
const MachiningFacilities = () => {
    const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = FACILITIES.filter(
    (f) => activeCat === "All" || f.category === activeCat
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
  const [capHeadRef, capHeadVis] = useReveal(0.1);
  const [qcHeadRef, qcHeadVis] = useReveal(0.1);
  const [stdRef, stdVis] = useReveal(0.1);
  const [flowRef, flowVis] = useReveal(0.1);
  const [advHeadRef, advHeadVis] = useReveal(0.1);

  return (
    <div className="font-condensed">
      {/* ══════════════════════════════════════════════
          HERO + STATS (dark navy)
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
            <p className="text-[0.86rem] text-[#AEB8DA] max-w-xl mx-auto">

            </p>



          </div>

          {/* 1. MANUFACTURING OVERVIEW */}
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
              dan keandalan sesuai kebutuhan pelanggan OEM dan REM di pasar domestik maupun ekspor.
            </p>
          </div>


        </div>
      </section>



      {/* ══════════════════════════════════════════════
          4. EXISTING FACILITY GALLERY (tidak diubah)
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

          {/* Category tabs */}
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

          {/* Grid */}
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

export default MachiningFacilities;