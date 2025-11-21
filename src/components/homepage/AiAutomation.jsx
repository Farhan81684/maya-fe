"use client";
import Ai from "../../../public/assets/homepage/ai.png";
import Image from "next/image";

export default function AiAutomation() {
  return (
    <section className="w-full py-20 flex justify-center">
      <div
        className="
          relative
          bg-[url('/bg/feat.png')]
          bg-cover
          bg-center
          bg-no-repeat
          rounded-t-[60px]
          rounded-b-none
          max-w-7xl 
          w-full
          px-4 sm:px-6 md:px-10 
          pt-4 sm:pt-6 md:pt-10
          pb-0
          overflow-hidden
        "
      >


        {/* ====== CONTENT ====== */}
        <div className="relative z-10">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-6 text-white">
            All-in-One <span className="text-blue-500">AI Front Desk Automation</span>
          </h2>

          <div className="relative w-full">
            <Image
              src={Ai}
              alt="AI Front Desk Automation"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
