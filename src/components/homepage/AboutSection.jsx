"use client";

import Image from "next/image";
import MayaMain from "../../../public/assets/homepage/aboutus.png";
import Tablet from "../../../public/assets/homepage/docs.png";

export default function AboutSection() {
  return (
    <section className="w-full bg-white pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-6">
<div
  className="
    bg-[url('/bg/mcbg.png')]
    bg-cover bg-center bg-no-repeat
    bg-black
    rounded-t-[60px]
    rounded-b-none
    max-w-7xl 
    w-full
    px-4 sm:px-6 md:px-10 
    pt-4 sm:pt-6 md:pt-10
    pb-0
    mt-2 sm:mt-10 md:mt-12   /* ✅ extra space from top */
  "
>

<div className="relative z-10 mt-12 mb-12">
                  <h2 className="text-center text-3xl md:text-5xl font-bold mb-6 text-white">
                  Missed Calls = <span className="text-blue-500">Missed Patients</span>
                </h2>

                <p className="text-gray-600 text-center text-lg" >Your patients are reaching out right now, is anyone responding?</p>
        
<div className="relative w-full flex justify-center">
  <Image
    src={MayaMain}
    alt="AI Front Desk Automation"
    width={1600}
    height={900}
    className="
      w-full max-w-[75%] h-auto object-cover
      relative
      -bottom-8
    "
    priority
  />
</div>
</div>

              </div>


        {/* ✅ TEXT + TABLET SECTION */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center mt-20 justify-between gap-12 px-6 md:px-10">

          {/* ✅ LEFT TEXT */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Your <span className="text-blue-500">Virtual AI</span> Front Desk
              that is <span className="text-blue-500">Helping</span> your{" "}
              <span className="text-blue-500">Patients 24/7</span>
            </h2>

            <p className="text-gray-600 text-lg">
              Maya is an AI-powered assistant built for healthcare & wellness
              professionals. She manages all patient interactions securely and
              efficiently so you never lose a patient again.
            </p>
          </div>

          {/* ✅ RIGHT TABLET IMG */}
          <div className="flex-1 flex justify-center">
            <Image
              src={Tablet}
              alt="Tablet UI"
              className="w-full max-w-[520px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
