"use client";

import Image from "next/image";
import hiipa from "../../../public/assets/homepage/hiipa.png";
import { FaUserShield, FaClipboardCheck, FaLock } from "react-icons/fa";

export default function HipaaCompliance() {
  return (
    <section className="w-full px-6 lg:px-14 py-14">
      <div
        className="
          w-full
                       bg-[url('/bg/mcbg.png')]     bg-[url('/bg/mcbg.png')]
    bg-cover           /* image ALWAYS covers full width */
    bg-center          /* perfectly centered */
    bg-no-repeat
          rounded-t-[48px]
          px-6 lg:px-14 py-16
          relative
        "
      >
        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 relative">

          {/* LEFT SIDE */}
          <div className="text-white">

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-10">
              <span className="text-[#2A62FF]">HIPAA</span>{" "}
              Compliance <span className="text-[#2A62FF]">at Every</span>{" "}
              <span className="text-white">Step</span>
            </h2>

{/* ✅ 5-item HIPAA feature grid (3 left, 2 right) */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">

  {/* LEFT COLUMN (3 items) */}
  <div className="space-y-10">

    {/* 1 */}
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[#2A62FF] flex justify-center items-center">
        <FaUserShield className="text-white text-2xl" />
      </div>
      <span className="text-gray-300 text-lg">
        AWS HIPAA-hosted backend
      </span>
    </div>

    {/* 2 */}
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[#2A62FF] flex justify-center items-center">
        <FaClipboardCheck className="text-white text-2xl" />
      </div>
      <span className="text-gray-300 text-lg">
        Consent tracking & audit trails
      </span>
    </div>

    {/* 3 */}
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[#2A62FF] flex justify-center items-center">
        <FaLock className="text-white text-2xl" />
      </div>
      <span className="text-gray-300 text-lg">
        Secure encryption at rest & in transit
      </span>
    </div>

  </div>

  {/* RIGHT COLUMN (2 items) */}
  <div className="space-y-10">

    {/* 4 */}
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[#2A62FF] flex justify-center items-center">
        <FaClipboardCheck className="text-white text-2xl" />
      </div>
      <span className="text-gray-300 text-lg">
        Full BAA coverage
      </span>
    </div>

    {/* 5 */}
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-full bg-[#2A62FF] flex justify-center items-center">
        <FaUserShield className="text-white text-2xl" />
      </div>
      <span className="text-gray-300 text-lg">
        PHI redaction before LLM processing
      </span>
    </div>

  </div>
</div>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative flex justify-end items-center">
            <div className="w-full max-w-[540px]">
              <Image
                src={hiipa}
                alt="Mockup"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
