"use client";

import Image from "next/image";
import Doc from "../../../public/assets/homepage/doc.png";
import Doc2 from "../../../public/assets/homepage/2.png";
import Doc3 from "../../../public/assets/homepage/3.png";
import Doc4 from "../../../public/assets/homepage/4.png";
import Doc5 from "../../../public/assets/homepage/5.png";
import Doc6 from "../../../public/assets/homepage/6.png";


const items = [
  { title: "General Practitioners", img: Doc },
  { title: "Dentists", img: Doc2 },
  { title: "Chiropractors", img: Doc3 },
  { title: "Physiotherapists", img: Doc4 },
  { title: "Therapists & Psychologists", img: Doc5 },
  { title: "Wellness Clinics", img: Doc6 },
];

export default function WhoWeHelp() {
  return (
    <section className="w-full bg-white py-20">
      <div className="w-full max-w-7xl mx-auto px-4 text-center">
        
        <div className="inline-block px-6 py-1 text-sm text-blue-600 bg-blue-100 rounded-full font-medium mb-4">
          Who We Help?
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Made for Solo <span className="text-blue-500">Practices</span> & Small{" "}
          <span className="text-blue-500">Clinics</span>
        </h2>

        {/* ✅ 3 IN ROW + SQUARE */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 mx-auto  justify-center">
  {items.map((item) => (
    <div
      key={item.title}
      className="w-[70%] mx-auto sm:w-[75%] lg:w-[65%]" // 🔹 narrower cards
    >
      {/* 🔵 FULL SQUARE CARD */}
      <div
        className="
          aspect-square                   /* ✅ card = perfect square */
          bg-[#0F2B61]
          rounded-3xl
          p-4
          flex flex-col
          items-center
          shadow-md
          h-full
        "
      >
        {/* IMAGE AREA (flex-1 takes remaining height) */}
        <div className="w-full flex-1 rounded-2xl overflow-hidden">
          <Image
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT AREA — BIGGER BLUE SECTION BELOW IMAGE */}
        <div className="w-full mt-3 py-4 px-2">
          <p className="text-white text-center text-base sm:text-lg font-semibold">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>



      </div>
    </section>
  );
}
