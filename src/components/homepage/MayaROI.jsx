"use client";

import { MdCheckCircle } from "react-icons/md";
import Image from "next/image";
import maya from "../../../public/assets/homepage/ROI.png";

export default function MayaPaysSection() {
  return (
    <section className="w-full px-6 lg:px-14 py-2">
      {/* MAIN Wrapping DIV */}
      <div
        className="
          w-full 
          mx-auto
          bg-[url('/bg/mcbg.png')] 
          bg-cover 
          bg-center 
          bg-no-repeat
          rounded-t-[48px]
          px-6 lg:px-14 py-16
          overflow-hidden
          max-w-[1300px]   /* Set consistent max-width */
        "
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center relative">
          {/* Left Section */}
          <div className="text-white">
            <span className="text-sm font-medium bg-[#132554] text-blue-300 rounded-full px-4 py-1">
              Maya’s ROI
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mt-4 mb-6">
              Maya <span className="text-[#2A62FF]">Pays</span> for Herself
            </h2>

            <p className="text-gray-600 max-w-md mb-6 leading-relaxed">
              Maya is an AI-powered assistant built for healthcare & wellness
              professionals. She manages all patient interactions securely and
              efficiently so you never lose a patient again.
            </p>

            <ul className="space-y-4 text-gray-600 text-base">
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

          {/* Right Section */}
          <div className="relative flex justify-center items-center w-full min-h-[420px]">
            <Image
              src={maya}
              alt="Maya"
              width={1000}
              height={1000}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
