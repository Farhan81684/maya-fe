"use client";

import Image from "next/image";
import hiipa from "../../../public/assets/homepage/hiipa.png";

// Feature Images
import feat1 from "../../../public/assets/1.png";
import feat2 from "../../../public/assets/2.png";
import feat3 from "../../../public/assets/3.png";
import feat4 from "../../../public/assets/4.png";
import feat5 from "../../../public/assets/5.png";

export default function HipaaCompliance() {
  return (
    <section className="w-full px-6 lg:px-14 py-20">
      <div
        className="
          w-full
          bg-[url('/bg/mcbg.png')]
          bg-cover bg-center bg-no-repeat
          rounded-t-[48px]
          px-6 lg:px-14 py-16
        "
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN (Heading + Features) */}
          <div className="text-white">
            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-12">
              <span className="text-[#2A62FF]">HIPAA</span> Compliance{" "}
              <span className="text-[#2A62FF]">at Every</span>{" "}
              <span className="text-white">Step</span>
            </h2>

            {/* GRID - MATCHES THE IMAGE EXACTLY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-20">
              {/* LEFT SIDE (3 ITEMS) */}
              <div className="space-y-10">
                {/* ITEM 1 */}
                <div className="flex items-center gap-4">
                  <div
                    className="
  w-16 aspect-square shrink-0 
  rounded-full bg-[#2A62FF] 
  flex justify-center items-center
"
                  >
                    <Image
                      src={feat1}
                      alt="Feature"
                      className="w-16 h-12 object-contain"
                    />
                  </div>

                  <p className="text-gray-300 text-lg leading-snug">
                    AWS HIPAA-hosted backend
                  </p>
                </div>

                {/* ITEM 2 */}
                <div className="flex items-center gap-4">
                  <div
                    className="  w-16 aspect-square shrink-0 
  rounded-full bg-[#2A62FF] 
  flex justify-center items-center"
                  >
                    <Image
                      src={feat2}
                      alt="Feature"
                      className="w-16 h-11 object-contain"
                    />
                  </div>
                  <p className="text-gray-300 text-lg leading-snug">
                    Consent tracking & audit trails
                  </p>
                </div>

                {/* ITEM 3 */}
                <div className="flex items-center gap-4">
                  <div
                    className="  w-16 aspect-square shrink-0 
  rounded-full bg-[#2A62FF] 
  flex justify-center items-center"
                  >
                    <Image
                      src={feat3}
                      alt="Feature"
                      className="w-16 h-11 object-contain"
                    />
                  </div>
                  <p className="text-gray-300 text-lg leading-snug">
                    Secure encryption at rest & in transit
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE (2 ITEMS) */}
              <div className="space-y-10">
                {/* ITEM 4 */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 aspect-square shrink-0 
  rounded-full bg-[#2A62FF] 
  flex justify-center items-center"
                  >
                    <Image
                      src={feat4}
                      alt="Feature"
                      className="w-16 h-12 object-contain"
                    />
                  </div>
                  <p className="text-gray-300 text-lg leading-snug">
                    Full BAA coverage
                  </p>
                </div>

                {/* ITEM 5 */}
                <div className="flex items-center gap-4">
                  <div
                    className="  w-16 aspect-square shrink-0 
  rounded-full bg-[#2A62FF] 
  flex justify-center items-center"
                  >
                    <Image
                      src={feat5}
                      alt="Feature"
                      className="w-16 h-12 object-contain"
                    />
                  </div>
                  <p className="text-gray-300 text-lg leading-snug">
                    PHI redaction before LLM processing
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
<div className="flex justify-center lg:justify-end items-center">
  <div className="w-full max-w-[540px] lg:mr-[-200px] xl:mr-[-256px]">
    <Image
      src={hiipa}
      alt="HIPAA Mockup"
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
