"use client";

import { MdCheckCircle } from "react-icons/md";
import Image from "next/image";
import maya from "../../../public/assets/homepage/ROI.png";
export default function MayaPaysSection() {
  return (
    <section className="w-full px-6 lg:px-14 py-14">
      {/* ✅ MAIN Wrapping DIV (only top corners rounded) */}
      <div
        className="
          w-full 
                       bg-[url('/bg/mcbg.png')]     bg-[url('/bg/mcbg.png')]
    bg-cover           /* image ALWAYS covers full width */
    bg-center          /* perfectly centered */
    bg-no-repeat
          rounded-t-[48px]
          px-10 lg:px-20 py-20
          overflow-hidden
        "
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative">

          {/* ========= LEFT ========= */}
          <div className="text-white">
            <span className="text-sm font-medium bg-[#132554] text-blue-300 rounded-full px-4 py-1">
              Maya’s ROI
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mt-4 mb-6">
              Maya <span className="text-[#2A62FF]">Pays</span> for Herself
            </h2>

            <p className="text-gray-300 max-w-md mb-6 leading-relaxed">
              Maya is an AI-powered assistant built for healthcare & wellness
              professionals. She manages all patient interactions securely and
              efficiently so you never lose a patient again.
            </p>

            <ul className="space-y-4 text-gray-200 text-base">
              <li className="flex items-start gap-2">
                <MdCheckCircle className="text-green-400 text-xl mt-[1px]" />
                <span>12 extra patients/month → $2,400 added revenue.</span>
              </li>

              <li className="flex items-start gap-2">
                <MdCheckCircle className="text-green-400 text-xl mt-[1px]" />
                <span>That’s a 700%+ ROI for our Professional package</span>
              </li>
            </ul>
          </div>

          {/* ========= RIGHT ========= */}
<div className="relative flex justify-center items-center w-full min-h-[420px]">

  {/* ✅ IMAGE IN CENTER */}
  <Image
    src={maya}
    alt="Maya"
    width={600}
    height={600}
    className="object-contain"
    priority
  />

</div>

        </div>
      </div>
    </section>
  );
}
