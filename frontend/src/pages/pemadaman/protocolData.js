// Structured, faithful representation of assets/PEMADAMAN.html
// (PROTOCOL v4 - Power Off / On). Technical content/intent preserved.

export const protocolMeta = {
  badges: [
    { text: "PROTOCOL v4 ACTIVE", tone: "cyan" },
    { text: "SEQUENCE IS MAIN ACTOR", tone: "violet" },
    { text: "6 XAMPP MySQL CRITICAL - CORRECTED", tone: "red" },
  ],
  titleLine1: "Power OFF \u2192 Power ON",
  titleLine2: "Sequence Protocol \u2014 Corrected",
  sub: [
    "Revisi terbaru sesuai koreksi: ",
    { strong: "6 server XAMPP (MySQL) wajib matikan service" },
    " \u2014 PRODUCTION 25.22, ONLINE 25.23, SURVEY 25.26, QR 10.29, 192.168.10.99, 192.168.10.55. ",
    { strongGreen: "SVR-BMC-SQL-25.27 (SQL Server) TIDAK perlu stop service" },
    " \u2014 shutdown langsung aman.",
  ],
  kpi: [
    { value: "6 XAMPP MySQL", label: "Wajib Stop Service" },
    { value: "1 SQL Server", label: "25.27 - No Stop Needed" },
    { value: "9 + 9 Langkah", label: "Off & On Sequence" },
    { value: "20 VM", label: "Total Integrated" },
  ],
  precheck: [
    {
      icon: "\u2744\uD83D\uDD0B",
      tone: "cyan",
      title: "PRE-CHECK SEBELUM POWER ON",
      text: "AC ruang server ON <22\u00B0C, UPS Battery Normal hijau. Jika belum OK, JANGAN nyalakan.",
    },
    {
      icon: "\u26A0\uFE0F",
      tone: "red",
      title: "KOREKSI XAMPP - 6 SERVER",
      html: true,
      text:
        "25.22, 25.23, 25.26, 10.29, 192.168.10.99, 192.168.10.55 wajib Stop Apache+MySQL dulu. 25.27 SQL Server aman langsung shutdown.",
    },
  ],
};

export const offSteps = [
  {
    num: "01",
    critical: false,
    title: "CLIENT NODES \u2014 Matikan Duluan",
    ip: "BrakeAssy 10.103.10.101-105, Mesin QC, Timbangan, Input, Monitoring",
    actions: [
      "Shutdown normal Windows \u2014 semua hanya browser, tidak ada service",
      "Urutan: BRAKEASSY \u2192 MESIN QC (CMM_WS1, CMM_631174, PC-QC-LAB-CMM1) \u2192 TIMBANGAN \u2192 INPUT \u2192 MONITORING",
    ],
    tags: [
      { text: "SAFE FIRST", tone: "ok" },
      { text: "~10 MENIT", tone: "vm" },
    ],
  },
  {
    num: "02",
    critical: false,
    title: "CCTV NVR \u2014 Manual Security Room",
    ip: "10.19.24.21 & 10.19.24.50",
    actions: [
      "Shutdown manual, matikan SEBELUM Synology (rekaman sebagian ke NAS)",
    ],
  },
  {
    num: "03",
    critical: true,
    title: "XAMPP MySQL \u2014 6 SERVER WAJIB STOP SERVICE DULU [KOREKSI]",
    ip: "10.19.25.22, 10.19.25.23, 10.19.25.26, 10.19.10.29, 192.168.10.99, 192.168.10.55",
    ipRed: true,
    actions: [
      ["strong", "SVR-BMC-PRODUCTION-25.22", " \u2014 Production XAMPP"],
      ["strong", "SVR-BMC-ONLINE-25.23", " \u2014 Production Online XAMPP"],
      ["strong", "SVR-BMC-SURVEY-25.26", " \u2014 Survey / app.bmc.co.id XAMPP"],
      ["strong", "SVR-BMC-QR-10.29", " \u2014 QR System XAMPP (10.19.10.29)"],
      ["strong", "192.168.10.99", " \u2014 Admin / Legacy XAMPP"],
      ["strong", "192.168.10.55 / SVR-BMC-ADMIN-10.55", " \u2014 Admin Panel XAMPP"],
      ["plain", "Buka XAMPP Control Panel \u2192 Stop Apache & Stop MySQL / CMD Admin"],
    ],
    code: {
      tone: "red",
      lines: [
        ":: WAJIB untuk 6 server XAMPP MySQL ini",
        "net stop Apache2.4",
        "net stop mysql",
        ":: Pastikan Stopped baru Shutdown OS - cegah corrupt DB!",
      ],
    },
    tags: [
      { text: "6 SERVER XAMPP CRITICAL", tone: "critical" },
      { text: "MYSQL MUST STOP", tone: "warn" },
    ],
  },
  {
    num: "04",
    critical: false,
    title: "SERVER VM SQL SERVER & Non-XAMPP \u2014 Langsung Shutdown Aman",
    ip: "Termasuk 10.19.25.27 (SQL Server) \u2014 TIDAK perlu stop service",
    actions: [
      ["strong", "SVR-BMC-SQL-25.27", " menggunakan SQL Server \u2014 shutdown langsung aman tanpa stop service"],
      ["plain", "Sisa non-XAMPP: AV 25.14, PAY 25.13, MON 25.15, DB01 25.12, ADM 25.10, DISP 25.16, GL-SERVER 10.2, WG 25.21, SS, LAB, DB-51, WAGW"],
      ["plain", "Pastikan semua OFF sebelum lanjut ke HOST"],
    ],
    details: {
      summary: "Rincian 14 VM Non-XAMPP (aman langsung shutdown)",
      table: [
        ["Hostname", "IP", "Type", "Action"],
        ["SVR-BMC-SQL-25.27", "10.19.25.27", { tag: "SQL Server", tone: "sql" }, "Direct Shutdown - NO STOP NEEDED"],
        ["SVR-BMC-AV-25.14", "10.19.25.14", "VM Umum", "Direct Shutdown"],
        ["SVR-BMC-PAY-25.13", "10.19.25.13", "VM Umum", "Direct Shutdown"],
        ["SVR-BMC-MON-25.15", "10.19.25.15", "VM Umum", "Direct Shutdown"],
        ["SVR-BMC-DB01-25.12", "10.19.25.12", "DB", "Direct Shutdown"],
        ["SVR-BMC-ADM-25.10", "10.19.25.10", "VM Umum", "Direct Shutdown"],
        ["SVR-BMC-DISP-25.16", "10.19.25.16", "Display", "Direct Shutdown"],
        ["GL-SERVER-10.2", "10.19.10.2", "GL", "Direct Shutdown"],
        ["SVR-BMC-WG-25.21", "10.19.25.21", "WG", "Direct Shutdown"],
        ["SVR-BMC-SS", "On Host", "VM", "Direct Shutdown"],
        ["SVR-BMC-LAB", "On Host", "VM", "Direct Shutdown"],
        ["SVR-BMC-DB-51", "DB-51", "DB", "Direct Shutdown"],
        ["WAGW", "GW", "WAGW", "Direct Shutdown"],
      ],
    },
    tags: [
      { text: "SQL SERVER SAFE", tone: "sql" },
      { text: "~15 MENIT", tone: "vm" },
    ],
  },
  {
    num: "05",
    critical: false,
    title: "HOST VM Hypervisor",
    ip: "10.19.1.10",
    actions: ["Matikan setelah semua VM OFF, cek vCenter/Hyper-V tidak ada VM running"],
  },
  {
    num: "06",
    critical: false,
    title: "SYNOLOGY NAS",
    ip: "10.103.21.126:234 & 10.103.21.127:234",
    actions: ["Shutdown via DSM setelah CCTV OFF"],
  },
  {
    num: "07",
    critical: false,
    title: "AD Domain Controller",
    ip: "10.19.25.1",
    actions: ["Shutdown AD setelah Synology"],
  },
  {
    num: "08",
    critical: false,
    title: "FORTIGATE Firewall",
    ip: "10.103.0.101",
    actions: ["Shutdown Fortigate"],
  },
  {
    num: "09",
    critical: true,
    title: "CORE SWITCH \u2014 TERAKHIR",
    ip: "10.103.1.254",
    ipRed: true,
    actions: ["Matikan paling akhir setelah semua OFF"],
    tags: [{ text: "LAST OFF", tone: "critical" }],
  },
];

export const onSteps = [
  {
    num: "01",
    critical: true,
    title: "CORE SWITCH \u2014 PERTAMA",
    ip: "10.103.1.254",
    ipGreen: true,
    actions: ["Nyalakan core switch pertama, tunggu 2-3 menit port up"],
  },
  {
    num: "02",
    critical: false,
    title: "FORTIGATE",
    ip: "10.103.0.101",
    actions: ["Nyalakan, tunggu 3 menit"],
  },
  {
    num: "03",
    critical: false,
    title: "AD + VALIDASI WAJIB",
    ip: "10.19.25.1",
    actions: ["Nyalakan AD, jalankan script readiness check \u2014 WAJIB OK baru lanjut"],
    code: {
      tone: "cyan",
      lines: [
        "\\\\10.19.25.1\\bmc\\IT\\GAOSA\\CEK AD\\AD_Readiness_Check.bat",
        "# Double-click .bat \u2192 cek DNS, LDAP, SYSVOL, Replication",
        "# Semua harus OK / PASSED",
      ],
    },
  },
  {
    num: "04",
    critical: false,
    title: "SYNOLOGY",
    ip: "10.103.21.126:234 & .127:234",
  },
  {
    num: "05",
    critical: false,
    title: "CCTV NVR",
    ip: "10.19.24.21 & .50",
  },
  {
    num: "06",
    critical: false,
    title: "HOST VM",
    ip: "10.19.1.10",
  },
  {
    num: "07",
    critical: false,
    title: "SERVER VM Non-XAMPP & SQL Server \u2014 Nyalakan Dulu",
    ip: "25.27 SQL Server + 13 VM umum \u2014 langsung nyala aman",
    actions: [
      "Nyalakan 10.19.25.27 (SQL Server) bareng VM umum \u2014 tidak perlu urutan khusus service",
      "AV, PAY, MON, DB01, ADM, DISP, GL, WG, SS, LAB, DB-51, WAGW",
    ],
    tags: [{ text: "SQL SERVER AUTO START", tone: "sql" }],
  },
  {
    num: "08",
    critical: true,
    title: "XAMPP MySQL \u2014 6 SERVER \u2014 Start MySQL Dulu Baru Apache [KOREKSI]",
    ip: "25.22, 25.23, 25.26, 10.29, 192.168.10.99, 192.168.10.55",
    ipRed: true,
    actions: [
      "Start MySQL dulu, tunggu Running, baru Start Apache di semua 6 server",
      "25.22 Production, 25.23 Online, 25.26 Survey/app.bmc.co.id, 10.29 QR, 192.168.10.99, 192.168.10.55 Admin",
      "Cek XAMPP Panel hijau + test app.bmc.co.id, prd_online, /rm/srtjln.php, /qr, /admin",
    ],
    code: {
      tone: "cyan",
      lines: [
        "net start mysql",
        "net start Apache2.4",
        "# Cek XAMPP Panel: MySQL & Apache Running (hijau)",
        "# Test: https://app.bmc.co.id , https://10.19.25.26/prd_online",
      ],
    },
    tags: [{ text: "MYSQL FIRST \u2192 APACHE", tone: "critical" }],
  },
  {
    num: "09",
    critical: false,
    title: "CLIENT NODES \u2014 Paling Akhir",
    ip: "Monitoring, Input, Timbangan, Mesin QC, BrakeAssy",
    actions: ["Nyalakan client PC, buka browser test akses aplikasi"],
  },
];

export const coordination = {
  title: "KOORDINASI",
  table: [
    ["Dept", "PIC"],
    ["ADMIN PRODUKSI", "P Musa, P Yasin, P Makmur"],
    ["ADMIN RAW MAT", "P Dwi Bakti, P Arifin"],
    ["ADMIN FG", "P Asep"],
    ["ADMIN QUALITY", "P Yayan, P Bambang HP"],
    ["ADMIN STORE", "P Ata, P Rizky R"],
    ["ABSENSI", "P Putra"],
  ],
};

export const appTests = {
  title: "TEST APLIKASI",
  table: [
    ["URL", "Server"],
    [{ code: "https://app.bmc.co.id" }, "25.26 SURVEY (XAMPP)"],
    [{ code: "https://10.19.25.26/rm/srtjln.php" }, "Surat Jalan"],
    [{ code: "app.bmc.co.id/wms" }, "25.27 SQL Server (No Stop)"],
    [{ code: "10.168.10.99/admin & 192.168.10.99" }, "Admin XAMPP"],
    [{ code: "https://10.19.25.26/prd_online" }, "25.23 ONLINE XAMPP + 25.22 PROD"],
    [{ code: "QR System 10.29 / 10.19.10.29" }, "QR XAMPP"],
  ],
};

export const inventory = {
  summary: "Lampiran: Full Inventory Corrected (6 XAMPP MySQL + 1 SQL Server)",
  table: [
    ["Hostname", "IP", "DB Type", "Action"],
    ["SVR-BMC-PRODUCTION-25.22", "10.19.25.22", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["SVR-BMC-ONLINE-25.23", "10.19.25.23", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["SVR-BMC-SURVEY-25.26", "10.19.25.26", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["SVR-BMC-QR-10.29", "10.19.10.29", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["192.168.10.99", "192.168.10.99", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["SVR-BMC-ADMIN-10.55 / 192.168.10.55", "192.168.10.55 / 10.19.10.55", { tag: "XAMPP MySQL", tone: "critical" }, "STOP SERVICE"],
    ["SVR-BMC-SQL-25.27", "10.19.25.27", { tag: "SQL Server", tone: "sql" }, "DIRECT SHUTDOWN - AMAN"],
    ["SVR-BMC-AV / PAY / MON / DB01 / ADM / DISP / GL / WG / SS / LAB / DB-51 / WAGW", ".10, .12, .13, .14, .15, .16, .21, 10.2, etc", "VM Umum", "DIRECT SHUTDOWN"],
  ],
  note: "Koreksi: 25.27 tidak lagi critical XAMPP, melainkan SQL Server. 25.22, 25.26, 10.29, 192.168.10.99, 192.168.10.55 ditambahkan sebagai XAMPP MySQL critical.",
};

export const footer = "PT BRAJA MUKTI CAKRA \u2022 PROTOCOL v4 CORRECTED - 6 XAMPP MySQL + 1 SQL Server \u2022 Sequence is Main Actor \u2022 1 Sept 2026";
