import logobmcbg from "../assets/logobmcbg.png";

const IconMail = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconPhone = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconGlobe = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconFB = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconIG = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconLI = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socials = [
  // {
  //   Icon: IconFB,
  //   href: "https://www.facebook.com/ptbmc/?locale=id_ID",
  //   label: "Facebook",
  // },
  {
    Icon: IconIG,
    href: "https://www.instagram.com/ptbrajamukticakra/",
    label: "Instagram",
  },
  {
    Icon: IconLI,
    href: "https://id.linkedin.com/company/braja-mukti-cakra-pt",
    label: "LinkedIn",
  },
];

// eslint-disable-next-line no-unused-vars
const _unusedIconFB = IconFB;

const contacts = [
  {
    Icon: IconMail,
    text: "marketing@bmc.co.id",
  },
  {
    Icon: IconPhone,
    text: "Telp: (62-21) 8871836",
  },
  {
    Icon: IconPhone,
    text: "Fax: (62-21) 8878949",
  },
  {
    Icon: IconGlobe,
    text: "bmc.co.id",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="font-['Roboto_Condensed'] bg-gradient-to-br from-[#0D1F5C] via-[#0A1840] to-[#07112E]  ">

      {/* Gold Top Line */}
      <div className="h-[3px] bg-gradient-to-r from-[#D4A843] to-transparent" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Left */}
          <div className="text-center md:text-left">

            <h4 className="text-[#D4A843] uppercase tracking-[0.2em] text-xs font-bold mb-5">
              Office
            </h4>

            <p className="text-white/80 leading-8 font-medium text-sm">
              Jl. Desa Harapan Kita No. 4,
              <br />
              Kelurahan Harapan Jaya,
              <br />
              Kecamatan Bekasi Utara,
              <br />
              Jawa Barat
            </p>

          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">

            <img
              src={logobmcbg}
              alt="PT Braja Mukti Cakra"
              className="h-14 w-auto brightness-0 invert"
            />

            <div className="mt-8">

              <p className="text-[#D4A843] text-xs tracking-[0.28em] font-bold uppercase">
                The
              </p>



              <p className="text-[#D4A843] text-xs tracking-[0.28em] font-bold uppercase">
                Precision
              </p>


    <p className="text-[#D4A843] text-xs tracking-[0.28em] font-bold uppercase">
                Value
              </p>
            </div>

            <div className="flex gap-3 mt-6">

              {socials.map(({ Icon, href, label }) => (

                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 transition-all duration-300 hover:bg-[#D4A843] hover:border-[#D4A843] hover:text-[#0D1F5C]"
                >
                  <Icon />
                </a>

              ))}

            </div>

          </div>

          {/* Right */}
          <div className="text-center md:text-right">

            <h4 className="text-[#D4A843] uppercase tracking-[0.2em] text-xs font-bold mb-5">
              Contact
            </h4>

            <div className="space-y-3">

              {contacts.map(({ Icon, text }) => (

                <div
                  key={text}
                  className="flex md:justify-end justify-center items-center gap-3 text-white/60 text-sm"
                >
                  <span className="text-white/40">
                    <Icon />
                  </span>

                  {text}
                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12" />

        {/* Copyright */}
        <div className="text-center text-white/30 text-xs tracking-widest uppercase pt-6">
          © {year} PT Braja Mukti Cakra. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}