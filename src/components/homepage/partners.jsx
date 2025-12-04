"use client";

import Image from "next/image";

// Import ALL logos
import logo1 from "../../../public/clients/1.png";
import logo2 from "../../../public/clients/2.png";
import logo3 from "../../../public/clients/3.png";
import logo4 from "../../../public/clients/4.png";
import logo5 from "../../../public/clients/5.png";
import logo7 from "../../../public/clients/7.png";
import logo8 from "../../../public/clients/11.png";
import logo10 from "../../../public/clients/10.png";

export default function PartnerBar() {
  const partners = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo7,
    logo8,
    logo10,
  ];

  return (
    <section className="relative w-full py-5 mt-15 bg-white overflow-hidden">

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* WRAPPER THAT SCROLLS */}
      <div className="flex w-max animate-infinite-scroll gap-10">
        {[...partners, ...partners, ...partners].map((logo, index) => (
          <div
            key={index}
            className="inline-flex w-20 h-20 justify-center items-center"
          >
            <Image
              src={logo}
              alt={`partner-${index}`}
              width={80}
              height={80}
              className="object-contain transition"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
