"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa";

import agent1 from "../../../public/assets/homepage/agents.png";


export default function PoweredBy() {
  return (
    <section className="w-full bg-white pt-18">
      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ Card Container */}
<div 
  className="
    w-full 
    bg-[url('/bg/wic.png')]
    bg-cover bg-no-repeat
    rounded-t-3xl 
    p-10 lg:p-16 
    relative overflow-hidden
  "
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

    {/* LEFT — TEXT + DESCRIPTION */}
    <div>
      <div className="inline-block bg-blue-200 text-blue-700 text-sm px-4 py-1 rounded-full font-medium mb-4">
        What is Converaix?
      </div>

      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6 drop-shadow-lg">
        <span className="text-blue-500">Powered</span> by Hubaix 
        Transforming
        <span className="text-blue-500"> Industries</span> with AI
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        Converaix is a suite of intelligent AI agents developed by Hubaix,
        a Texas-based AI solutions company with 8+ years of experience
        building secure, scalable automation for regulated industries.
      </p>

      <p className="text-gray-600 text-lg leading-relaxed">
        Each Converaix agent is tailored for a specific domain. Maya is our
        healthcare & wellness specialist, designed to manage patient
        engagement, appointment booking, and front-desk tasks with full
        HIPAA compliance.
      </p>
    </div>

<div className="flex justify-center mt-8 items-center">
  <div className="w-[500px] sm:w-[650px] md:w-[800px] lg:w-[950px] xl:w-[1100px]">
    <Image
      src={agent1}
      alt="AI Agent"
      className="object-contain w-full h-auto"
      priority
    />
  </div>
</div>




    {/* BOTTOM — BULLET POINTS */}
    <div className="lg:col-span-2 mt-8">
      <ul className="space-y-4 text-gray-600 text-lg">
        <li className="flex gap-3">
          <FaCheck className="text-green-500 mt-1" />
          US headquartered in Texas; serving clients across USA, Europe & Middle East.
        </li>
        <li className="flex gap-3">
          <FaCheck className="text-green-500 mt-1" />
          8+ years of AI SaaS expertise.
        </li>
        <li className="flex gap-3">
          <FaCheck className="text-green-500 mt-1" />
          Focused on compliance-driven automation.
        </li>
      </ul>
    </div>

  </div>
</div>

      </div>
    </section>
  );
}
