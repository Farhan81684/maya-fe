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
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
  {items.map((item) => (
    <div
      key={item.title}
      className="
        bg-[#0F2B61]
        rounded-3xl
        p-4
        flex flex-col
        items-center
        shadow-md
      "
    >
      {/* ✅ INNER IMAGE WRAPPER WITH RADIUS + NO STRETCH */}
      <div className="w-full rounded-2xl overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* ✅ TITLE */}
      <p className="text-white text-center text-sm font-medium mt-3">
        {item.title}
      </p>
    </div>
  ))}
</div>


      </div>
    </section>
  );
}
