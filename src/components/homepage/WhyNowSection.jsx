"use client";

import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import laptop from "../../../public/assets/homepage/laptop.png";

export default function WhyNowSection() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT CONTENT */}
        <div className="flex-1">
          
          {/* ✅ Subtitle pill */}
          <div className="inline-block bg-blue-100 text-blue-600 text-sm px-6 py-1 rounded-full font-medium mb-4">
            Why it is Now or Never?
          </div>

          {/* ✅ Main Headline */}
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
            Your <span className="text-blue-600">Patients</span> Expect
            <br />
            Instant Support. Are You
            <br />
            <span className="text-blue-600">Ready?</span>
          </h2>

          {/* ✅ Bullet Points */}
          <ul className="space-y-4 text-lg text-gray-600">
            <li className="flex gap-3">
              <FaCheck className="text-green-500 mt-1" />
              78% patients prefer clinics with instant chat/call support.
            </li>

            <li className="flex gap-3">
              <FaCheck className="text-green-500 mt-1" />
              HIPAA penalties reach $50,000 per incident.
            </li>

            <li className="flex gap-3">
              <FaCheck className="text-green-500 mt-1" />
              Competitors are already moving to AI.
            </li>
          </ul>
        </div>

{/* ✅ RIGHT — Laptop image placeholder */}
<div className="flex-1 flex justify-center">
  <div className="w-full max-w-[650px] h-auto flex items-center justify-center">
    <Image
      src={laptop}
      alt="Laptop"
      className="w-full h-auto object-contain"
      width={650}
      height={380}
    />
  </div>
</div>


      </div>
    </section>
  );
}
