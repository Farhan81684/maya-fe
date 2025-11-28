"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import LogoImage from "../../../public/assets/logo.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Scroll handler (smooth)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false); // auto-close mobile menu
  };

  return (
   <header className="w-full absolute top-0 left-0 z-[999] bg-transparent">


      <nav className="w-full border-b-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <Image src={LogoImage} alt="Logo" width={46} height={36} />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-white/90 text-sm">
            <li onClick={() => scrollToSection("features")} className="hover:text-white cursor-pointer">Features</li>
            <li onClick={() => scrollToSection("pricing")} className="hover:text-white cursor-pointer">Pricing</li>
            <li onClick={() => scrollToSection("contact")} className="hover:text-white cursor-pointer">Contact</li>
            <li onClick={() => scrollToSection("affiliates")} className="hover:text-white cursor-pointer">Affiliates</li>
          </ul>

<div className="hidden md:block">
  <button 
    className="
      text-white py-2 rounded-md text-sm transition
      bg-[linear-gradient(90deg,#0176F2_0%,#01448C_100%)]
      hover:opacity-90
      px-8        /* width increased */
      min-w-[180px]  /* ensures the button looks wide */
    "
    onClick={() => scrollToSection('contact')}
  >
    Book a Demo
  </button>
</div>



          {/* Mobile Toggle */}
          <button className="md:hidden text-white/90" onClick={() => setOpen(!open)}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-transparent px-6 pb-4 animate-slideDown">
            <ul className="flex flex-col gap-4 text-white/90 text-sm mt-4">
              <li onClick={() => scrollToSection("features")} className="hover:text-white cursor-pointer">Features</li>
              <li onClick={() => scrollToSection("pricing")} className="hover:text-white cursor-pointer">Pricing</li>
              <li onClick={() => scrollToSection("contact")} className="hover:text-white cursor-pointer">Contact</li>
              <li onClick={() => scrollToSection("affiliates")} className="hover:text-white cursor-pointer">Affiliates</li>
            </ul>

            <button
              onClick={() => scrollToSection("contact")}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Book a Demo
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
