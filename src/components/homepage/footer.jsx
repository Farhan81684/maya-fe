"use client";
import { FaWindows ,FaApple  } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
export default function Footer() {
  return (
    <footer className="w-full">

      {/* ✅ TOP — ALL IN ONE ROW */}
      <div className="max-w-7xl mx-auto w-full px-6 py-14 flex flex-wrap justify-between items-start gap-10">

        {/* LOGO + TAGLINE */}
        <div className="flex flex-col min-w-[180px] gap-3">
          {/* ✅ Logo Placeholder */}
          <div className="w-10 h-10 rounded">
<Image src={Logo} alt="logo" />

          </div>

          <h3 className="text-sm font-semibold text-gray-900 leading-snug">
            Your 24/7 AI Front <br /> Desk Assistant
          </h3>

          <p className="text-gray-500 text-xs">ConverAIx, 2025.</p>
        </div>

        {/* PLATFORM */}
        <div className="flex flex-col gap-2 min-w-[130px]">
          <h4 className="text-gray-600 font-semibold text-xs">Platform</h4>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            Plans & Pricing
          </span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            Personal AI Manager
          </span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            AI Business Writer
          </span>
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-2 min-w-[110px]">
          <h4 className="text-gray-600 font-semibold text-xs">Company</h4>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">Blog</span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">Careers</span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">News</span>
        </div>

        {/* RESOURCES */}
        <div className="flex flex-col gap-2 min-w-[150px]">
          <h4 className="text-gray-600 font-semibold text-xs">Resources</h4>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            Documentation
          </span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            Papers
          </span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer">
            Press Conferences
          </span>
        </div>

        {/* APP */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          <h4 className="text-gray-600 font-semibold text-xs">Get the app</h4>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer flex items-center gap-1">
            <FaWindows className="text-gray-700" />
             Windows
          </span>
          <span className="text-gray-700 text-xs hover:text-blue-600 cursor-pointer flex items-center gap-1">
            <FaApple className="text-gray-700" />
           
             macOS
          </span>
        </div>
      </div>

      {/* ✅ BOTTOM BAR */}
      <div className="w-full bg-gradient-to-r from-[#0A1A33] to-[#0B2A52] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300 text-xs">

          <p className="text-center md:text-left">
            © 2025 CoverAIX. All rights reserved.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
