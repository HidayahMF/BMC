import React, { useState } from "react";
import logo from "../assets/logo-text.png";
import { ChevronDown } from "lucide-react";

const menuItems = [
  {
    title: "Company",
    submenu: [
      "Overview",
      "History & Milestones",
      "Vision & Mission",
      "Global Presence",
    ],
  },
  {
    title: "Industries",
    submenu: [
      "Automotive",
      "Heavy Equipment",
      "Agribusiness",
      "General Machining",
    ],
  },
  {
    title: "Capabilities",
    submenu: [
      "Casting",
      "Machining",
      "CNC Process",
      "Heat Treatment",
      "Quality Control",
    ],
  },
  {
    title: "Products",
    submenu: [
      "Brake Components",
      "Engine Components",
      "Agricultural Components",
      "Custom Parts",
    ],
  },
  {
    title: "Facilities",
    submenu: [
      "Factory",
      "Machinery",
      "Laboratory",
      "Warehouse",
    ],
  },
  {
    title: "Quality",
    submenu: [
      "Certifications",
      "Quality Assurance",
      "Testing Facilities",
    ],
  },
  {
    title: "Media Center",
    submenu: ["News", "Events", "Gallery", "CSR"],
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto px-10">
        <div className="flex items-center justify-between h-[90px]">
          
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="BMC"
              className="h-14 object-contain"
            />
          </div>

          {/* Menu */}
          <nav className="hidden font-bold xl:flex items-center gap-10 h-full">
           

            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 font-medium text-gray-800 hover:text-blue-900 transition">
                  {item.title}
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {activeMenu === index && (
                  <div className="absolute top-full left-0 w-[320px] bg-white shadow-xl border border-gray-100 py-5">
                    <div className="flex flex-col">
                      {item.submenu.map((sub, i) => (
                        <a
                          key={i}
                          href="#"
                          className="px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-900 transition"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

           
          </nav>

    
        </div>
      </div>
    </header>
  );
};

export default Navbar;