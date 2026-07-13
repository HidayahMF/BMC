import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import logobmcbg from "../assets/logobmcbg.png";
import { ChevronDown, Menu, X } from "lucide-react";

const menuItems = [
  {
    title: "Home",
  },
  {
    title: "About Us",
    submenu: [
      "Company Profile",
      "History & Milestones",
      "Vision & Mission",
      "Events, Awards & Certification",
      "Top Management",
      "Customer",

    ],
  },
  {
    title: "Products",
    submenu: [
      "Commercial Car",
      "Passenger Car",
      "General Parts & Accessories",
    ],
  },
  {
    title: "Facilities & Equipment",

  },
  {
    title: "Contact Us",

  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleEnter = (i) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(i);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const isTransparent = !scrolled && !mobileOpen;

  const getRouteByTitle = (title) => {
    switch (title) {
      case "Home":
        return "/";

      case "About Us":
      case "About BMC":
        return "/companyprofile";

      case "Vision & Mission":
        return "/visimisi";

      case "History & Milestones":
        return "/milestone";

      case "Company Profile":
        return "/companyprofile";

      case "Events, Awards & Certification":
        return "/events";

      case "Top Management":
        return "/manajemen";

      case "Commercial Car":
        return "/commercialcar";

      case "Passenger Car":
        return "/passengercar";

        case "Products":
      case "General Parts & Accessories":
        return "/parts";

           case "Facilities & Equipment":
        return "/machiningfacilities";
        
        case "Contact Us":
        return "/contactus";

                case "Customer":
        return "/customer";
          
        case "Berita":
        return "/berita";

      default:
        return "/";
    }
  };

  const handleNavigate = (title) => {
    const to = getRouteByTitle(title);
    navigate(to);
    setMobileOpen(false);
    setActiveMenu(null);
    setMobileExpanded(null);
  };

  // Toggle submenu on mobile instead of navigating immediately if it has children
  const handleMobileClick = (item, i) => {
    if (item.submenu && item.submenu.length > 0) {
      setMobileExpanded((prev) => (prev === i ? null : i));
    } else {
      handleNavigate(item.title);
    }
  };

  return (
    <>
      <header
        className={
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out " +
          (scrolled
            ? "bg-white shadow-[0_2px_20px_rgba(13,31,92,0.08)]"
            : "bg-transparent")
        }
      >
        <div
          className={
            "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0D1F5C] via-[#D4A843] to-[#0D1F5C] transition-transform duration-500 origin-left " +
            (scrolled ? "scale-x-100" : "scale-x-0")
          }
        />

        <div
          className="max-w-[1500px] mx-auto px-6 flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? "68px" : "82px" }}
        >
          {/* DESKTOP */}
          <nav className="hidden xl:flex items-center h-full">
            {menuItems.map((item, i) => {
              const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
              return (
                <div
                  key={i}
                  className="relative h-full flex items-center group"
                  onMouseEnter={() => hasSubmenu && handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.title)}
                    className={
                      "flex items-center gap-1 px-4 h-full font-['Roboto Condensed',sans-serif] font-[600] text-[0.95rem] uppercase whitespace-nowrap transition-colors duration-200 bg-transparent border-none cursor-pointer " +
                      (isTransparent
                        ? "text-white/90 hover:text-[#D4A843]"
                        : "text-[#1a2a5e] hover:text-[#D4A843]")
                    }
                  >
                    {item.title}
                    {hasSubmenu && (
                      <ChevronDown
                        size={14}
                        className={
                          "transition-transform duration-250 flex-shrink-0 " +
                          (activeMenu === i ? "rotate-180" : "rotate-0")
                        }
                      />
                    )}
                  </button>

                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#D4A843] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />

                  {/* DROPDOWN */}
                  {hasSubmenu && (
                    <div
                      className={
                        "absolute top-full left-0 min-w-[240px] z-50 transition-all duration-500 will-change-transform will-change-opacity " +
                        (activeMenu === i
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none")
                      }
                    >
                      <div className="bg-white shadow-[0_8px_32px_rgba(13,31,92,0.18)]">
                        <div className="py-1">
                          {item.submenu.map((sub, j) => (
                            <button
                              key={j}
                              type="button"
                              onClick={() => handleNavigate(sub)}
                              className="
                                relative block px-[18px] py-2.5 overflow-hidden
                                text-[0.95rem]  font-['Roboto Condensed',sans-serif]  text-[#1a1a2e]
                                border-b border-[#f0f2f8] last:border-b-0
                                whitespace-nowrap no-underline
                                transition-colors duration-150
                                group/item
                                text-left w-full
                              "
                            >
                              {/* Parallelogram hover background */}
                              <span
                                className="
                                  absolute top-0 left-[-30px] h-full w-0
                                  bg-[#1a3a9e] -skew-x-12
                                  group-hover/item:w-[calc(100%+40px)]
                                  transition-all duration-[620ms] ease-[cubic-bezier(.4,0,.2,1)]
                                  z-0
                                "
                              />
                              {/* Text */}
                              <span className="relative z-10 group-hover/item:text-white transition-colors duration-150">
                                {sub}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <a href="/" className="flex items-center flex-shrink-0">
            <img
              src={logobmcbg}
              alt="BMC"
              className={`object-contain transition-all duration-300 ${
                scrolled ? "h-10" : "h-13"
              }`}
              style={{
                filter: isTransparent ? "brightness(0) invert(1)" : "none",
              }}
            />
          </a>

          {/* HAMBURGER */}
          <button
            className={
              "xl:hidden flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer rounded transition-colors duration-200 " +
              (isTransparent ? "text-white" : "text-[#0D1F5C]") +
              " hover:text-[#D4A843]"
            }
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={
          "fixed top-0 right-0 z-[999] h-screen overflow-y-auto w-[min(340px,88vw)] bg-white shadow-[-8px_0_32px_rgba(13,31,92,0.15)] transition-transform duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] pt-[88px] " +
          (mobileOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="pb-8">
          {menuItems.map((item, i) => {
            const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
            return (
              <div key={i} className="border-b border-[#f0f2f8]">
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-6 py-4 bg-transparent border-none cursor-pointer font-['Roboto Condensed',sans-serif] font-semibold text-base uppercase tracking-[0.01em] text-[#0D1F5C]"
                  onClick={() => handleMobileClick(item, i)}
                >
                  {item.title}
                  {hasSubmenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-250 ${
                        mobileExpanded === i ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {hasSubmenu && (
                  <div
                    className={`overflow-hidden bg-[#f8f9fc] transition-all duration-300 ease-in-out ${
                      mobileExpanded === i ? "max-h-[400px]" : "max-h-0"
                    }`}
                  >
                    {item.submenu.map((sub, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => handleNavigate(sub)}
                        className="block w-full text-left px-8 py-2.5 text-[0.9rem] text-[#3a4a7a] no-underline hover:text-[#D4A843] hover:pl-10 transition-all duration-150"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="#"
            className="block mx-6 mt-6 py-3 text-center bg-[#0D1F5C] text-white no-underline font-['Roboto Condensed',sans-serif] font-semibold text-[0.85rem] tracking-[0.01em] uppercase hover:bg-[#D4A843] hover:text-[#0D1F5C] transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[998] bg-[rgba(13,31,92,0.4)] backdrop-blur-sm animate-[fadeIn_0.25s_ease]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
};

export default Navbar;