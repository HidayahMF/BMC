import {
  Disc,
  CircleDot,
  Settings,
  Layers,
  Wind,
  Component,
  Cog,
  Boxes,
  ScanLine,
  Ruler,
  Gauge,
  Microscope,
  BadgeCheck,
  ClipboardCheck,
  Truck,
  Cpu,
  Users,
  ShieldCheck,
  Award,
  TrendingUp,
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
   FACILITIES — daftar mesin/line untuk gallery
   Field "origin" dipakai untuk prioritas urutan tampilan:
   Quality & Inspection Lab > Japan > Korea > Other
   ⚠️ Silakan koreksi origin di bawah kalau ada yang kurang tepat,
   karena data asli tidak menyertakan info merek/negara asal.
══════════════════════════════════════════════════════════ */
export const FACILITIES = [
  // ── Machining Center ──
  { name: "Robot Disc Brake",           category: "Machining Center", image: ROBOTTO,             origin: "Other" },
  { name: "Doosan 4500",                category: "Machining Center", image: MACHDOOSAN4500,       origin: "Korea" }, // Doosan = Korea
  { name: "Doosan 5700",                category: "Machining Center", image: MACHDOOSAN5700,       origin: "Korea" }, // Doosan = Korea
  { name: "Doosan DNM 5700",            category: "Machining Center", image: MACHDOOSANDNM5700,    origin: "Korea" }, // Doosan = Korea
  { name: "Doosan NHP 6300",            category: "Machining Center", image: MACHDOOSANNHP6300,    origin: "Korea" }, // Doosan = Korea
  { name: "Doosan V8300",               category: "Machining Center", image: MACHDOOSANV8300,      origin: "Korea" }, // Doosan = Korea
  { name: "Makino n51nx",               category: "Machining Center", image: MACHMAKINOn51nx,      origin: "Japan" }, // Makino = Japan
  { name: "Makino Slim 3N",             category: "Machining Center", image: MACHMAKINOSLIM3N,     origin: "Japan" }, // Makino = Japan
  { name: "Robotic Cleantec",           category: "Machining Center", image: MACHROBOTICLEANTEC,   origin: "Other" },
  { name: "SPM Check DTV RR Disc",      category: "Machining Center", image: SPMCHECKDTVRRDISC,    origin: "Other" },
  { name: "Honning Machine",            category: "Machining Center", image: MACHHONNING,          origin: "Other" },
  { name: "Leak Test Machine",          category: "Machining Center", image: MACHLEAKTEST,         origin: "Other" },
  { name: "Balancing Machine",          category: "Machining Center", image: MACHBALANCING,        origin: "Other" },
  { name: "MC Polishing",               category: "Machining Center", image: MCPOLISHING,          origin: "Other" },

  // ── Production Line ──
  { name: "Axle Assy Line 1",           category: "Production Line",  image: AxleAssyLine1,        origin: "Other" },
  { name: "Axle Assy Line 2",           category: "Production Line",  image: AxleAssyLine2,        origin: "Other" },
  { name: "Brake Assy Line",            category: "Production Line",  image: BRAKEASSYLINE,        origin: "Other" },
  { name: "Disc Brake Line",            category: "Production Line",  image: DiscBrakeLine,        origin: "Other" },
  { name: "Drum Brake & Hub CAT3 Line", category: "Production Line",  image: DrumBrakeAndHUBCAT3Line, origin: "Other" },
  { name: "Exhaust Gas Line EGR",       category: "Production Line",  image: EXHGASLINEEGR,        origin: "Other" },
  { name: "Exhaust Manifold Line",      category: "Production Line",  image: EXHMANIFOLDLINE,      origin: "Other" },
  { name: "Knuckle Line",               category: "Production Line",  image: KnuckleLine,          origin: "Other" },

  // ── Quality & Inspection Lab ──
  { name: "Photomicroscope",            category: "Quality & Inspection Lab", image: PHOTOMICRO,             origin: "Other" },
  { name: "Hardness Vickers/Rockwell",  category: "Quality & Inspection Lab", image: HARDNESSVICKERSROCKWELL, origin: "Other" },
  { name: "Hardness Brinell",           category: "Quality & Inspection Lab", image: HARDNESSBRINELL,        origin: "Other" },
  { name: "Surfcom",                    category: "Quality & Inspection Lab", image: SURFCOM,                origin: "Japan" }, // Tokyo Seimitsu (Surfcom) = Japan
  { name: "CMM Accura",                 category: "Quality & Inspection Lab", image: CMMACCURA,              origin: "Other" },
  { name: "CMM Accretech",              category: "Quality & Inspection Lab", image: CMMACCRETECH,           origin: "Japan" }, // Accretech = Japan
  { name: "CMM Hexagon",                category: "Quality & Inspection Lab", image: CMMHEXAGON,             origin: "Other" }, // Hexagon = Sweden/Swiss
];

export const CATEGORIES = ["All", "Production Line", "Machining Center", "Quality & Inspection Lab"];

export const CAT_COLOR = {
  "Production Line":          { bg: "#EEF9F1", text: "#3B6D11" },
  "Machining Center":         { bg: "#EBF5FF", text: "#185FA5" },
  "Quality & Inspection Lab": { bg: "#F3F0FF", text: "#5C3D9E" },
};

/* ══════════════════════════════════════════════════════════
   SORT PRIORITY — Quality & Inspection Lab > Japan > Korea > Other
   Dipakai untuk urutan render di grid gallery.
══════════════════════════════════════════════════════════ */
const ORIGIN_PRIORITY = { Japan: 0, Korea: 1, Other: 2 };

export function getFacilityPriority(item) {
  // Prioritas paling atas: kategori Quality & Inspection Lab
  if (item.category === "Quality & Inspection Lab") return -1;
  // Setelah itu urutkan berdasarkan origin: Japan (0) lalu Korea (1) lalu Other (2)
  return ORIGIN_PRIORITY[item.origin] ?? 2;
}

export function sortFacilities(list) {
  // Sort stabil: item dengan priority lebih kecil tampil lebih dulu,
  // urutan asli tetap dipertahankan untuk item dengan priority sama.
  return list
    .map((item, idx) => ({ item, idx }))
    .sort((a, b) => {
      const pa = getFacilityPriority(a.item);
      const pb = getFacilityPriority(b.item);
      if (pa !== pb) return pa - pb;
      return a.idx - b.idx;
    })
    .map(({ item }) => item);
}

/* ══════════════════════════════════════════════════════════
   MACHINE_INFO — enrichment untuk lightbox (per mesin)
══════════════════════════════════════════════════════════ */
export const MACHINE_INFO = {
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
      "Lini perakitan kedua yang memperluas kapasitas produksi axle assembly untuk memenuhi volume pesanan OEM dan OES secara paralel.",
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
      "Automotive Brake Components",
    ],
    keyFeatures: [
      "6-axis industrial robot automation",
      "Automatic loading & unloading system",
      "Reduced cycle time",
      "Consistent part positioning",
      "Improved production safety",
      "High repeatability and accuracy",
    ],
  },
};

/* ══════════════════════════════════════════════════════════
   CAPACITIES — Section 3: Machining Line Capacities
══════════════════════════════════════════════════════════ */
export const CAPACITIES = [
  { title: "Brake Drum Cat I",       lines: "2 Lines",         icon: Disc,      desc: "Machining line untuk brake drum kategori ringan dengan presisi dimensi tinggi." },
  { title: "Brake Drum Cat II",      lines: "3 Lines",         icon: Disc,      desc: "Kapasitas produksi menengah untuk brake drum kendaraan komersial." },
  { title: "Brake Drum Cat III",     lines: "2 Lines",         icon: Disc,      desc: "Line khusus brake drum heavy-duty untuk aplikasi beban berat." },
  { title: "Hub Cat I",              lines: "1 Line",          icon: CircleDot, desc: "Machining hub kategori ringan dengan siklus proses efisien." },
  { title: "Hub Cat II",             lines: "3 Lines",         icon: CircleDot, desc: "Kapasitas produksi hub menengah untuk kebutuhan volume tinggi." },
  { title: "Hub Cat III",            lines: "2 Lines",         icon: CircleDot, desc: "Line hub heavy-duty untuk aplikasi kendaraan komersial berat." },
  { title: "Flywheel",               lines: "2 Lines",         icon: Settings,  desc: "Machining dan balancing presisi untuk komponen flywheel." },
  { title: "Pressure Plate",         lines: "2 Lines",         icon: Layers,    desc: "Produksi pressure plate dengan kontrol kerataan permukaan ketat." },
  { title: "Disc Brake",             lines: "3 Lines",         icon: Disc,      desc: "Machining disc brake dengan toleransi run-out & ketebalan presisi." },
  { title: "Exhaust Manifold RR/FR", lines: "Dedicated Line",  icon: Wind,      desc: "Produksi exhaust manifold depan dan belakang, teruji ketahanan panas." },
  { title: "Exhaust Manifold Pipe",  lines: "Dedicated Line",  icon: Wind,      desc: "Machining pipa exhaust manifold dengan uji kebocoran terintegrasi." },
  { title: "Knuckle",                lines: "Dedicated Line",  icon: Component, desc: "Machining steering knuckle dengan akurasi geometris struktural." },
  { title: "Brake Assy RH/LH",       lines: "Dedicated Line",  icon: Cog,       desc: "Perakitan brake assembly kanan & kiri dengan final function check." },
  { title: "Multipurpose Line",      lines: "Flexible Line",   icon: Boxes,     desc: "Line fleksibel untuk menangani variasi part sesuai kebutuhan produksi." },
];

/* ══════════════════════════════════════════════════════════
   QC_FACILITIES — Section 5: Quality Control Facilities
══════════════════════════════════════════════════════════ */
export const QC_FACILITIES = [
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
   STANDARDS — Section 6: Inspection Standards
══════════════════════════════════════════════════════════ */
export const STANDARDS = ["JIS B0651", "JIS B7440", "JIS B7451", "JIS B7153", "JIS Z2243", "JIS B7506"];

/* ══════════════════════════════════════════════════════════
   WORKFLOW — Section 7: Inspection Workflow
══════════════════════════════════════════════════════════ */
export const WORKFLOW = [
  { label: "Raw Material",           icon: Boxes },
  { label: "Machining",              icon: Cog },
  { label: "Dimensional Inspection", icon: Ruler },
  { label: "Surface Inspection",     icon: ScanLine },
  { label: "Hardness Test",          icon: Gauge },
  { label: "Final Inspection",       icon: ClipboardCheck },
  { label: "Delivery",               icon: Truck },
];

/* ══════════════════════════════════════════════════════════
   ADVANTAGES — Section 8: Manufacturing Advantages
══════════════════════════════════════════════════════════ */
export const ADVANTAGES = [
  { title: "Precision Machining",         desc: "Toleransi machining presisi tinggi untuk menjamin akurasi setiap komponen.", icon: Ruler },
  { title: "Automated Production",        desc: "Kombinasi otomasi dan robotik untuk efisiensi dan konsistensi proses produksi.", icon: Cpu },
  { title: "Skilled Engineers",           desc: "Tim engineer berpengalaman yang memahami standar manufaktur otomotif global.", icon: Users },
  { title: "Strict Quality Inspection",   desc: "Sistem inspeksi berlapis di setiap tahap proses produksi.", icon: ShieldCheck },
  { title: "Automotive Standards",        desc: "Proses produksi mengacu pada standar internasional industri otomotif.", icon: Award },
  { title: "Continuous Improvement",      desc: "Budaya perbaikan berkelanjutan untuk efisiensi dan kualitas jangka panjang.", icon: TrendingUp },
];