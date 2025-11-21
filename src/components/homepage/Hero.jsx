"use client";

import Image from "next/image";
import maya from "../../../public/assets/homepage/hero.png";
import Mockup from "../../../public/assets/homepage/mockup.png";
import { FaCheck } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      className="
        relative w-full 
       pt-24 pb-[350px]   /* gives space for mockup */
sm:pb-[380px]
md:pb-[420px]
lg:pb-[480px]
xl:pb-[520px]

        overflow-visible
        bg-[url('/bg/hero.png')] 
        bg-cover bg-center bg-no-repeat
      "
    >
      <div
        className="
    max-w-7xl mx-auto 
  px-8 sm:px-12 md:px-16 

    flex flex-col lg:flex-row 
    items-center justify-between 
    gap-10 lg:gap-5
  "
      >
        {/* LEFT CONTENT */}
        <div className="flex-1 text-white max-w-[800px] text-center lg:text-left mx-auto">
          <h1
            className="
      text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
      font-bold leading-tight mb-8
    "
          >
            Never Miss a Patient <span className="text-blue-400">Again</span>{" "}
            <br />
            Meet <span className="text-blue-400">Maya!</span> Your 24/7 AI{" "}
            <br />
            Front Desk <span className="text-blue-400">Assistant</span>
          </h1>

          <ul className="space-y-4 text-base sm:text-lg md:text-xl mb-8 mx-auto">
            <li className="flex gap-3 justify-center lg:justify-start">
              <FaCheck className="text-green-400 text-lg sm:text-xl" />
              Instantly books & manages appointments
            </li>
            <li className="flex gap-3 justify-center lg:justify-start">
              <FaCheck className="text-green-400 text-lg sm:text-xl" />
              Responds to patients anytime, anywhere
            </li>
            <li className="flex gap-3 justify-center lg:justify-start">
              <FaCheck className="text-green-400 text-lg sm:text-xl" />
              HIPAA-compliant, secure & reliable
            </li>
          </ul>

          <div className="flex justify-center lg:justify-start">
            <button
              className="
        px-6 py-3 sm:px-8 sm:py-4 
        bg-gradient-to-r from-blue-500 to-blue-600 
        text-white rounded-md 
        text-base sm:text-lg md:text-xl 
        font-medium hover:brightness-95 transition
      "
            >
              Get Early Discounted Access
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div
          className="
            relative flex-1 flex 
            justify-center items-center 
            min-h-[280px] sm:min-h-[350px] md:min-h-[420px]
          "
        >
          <Image
            src={maya}
            alt="Maya AI"
            className="
              w-[80%] sm:w-[90%] md:w-full 
              max-w-[600px] md:max-w-[650px] 
              h-auto object-contain
            "
          />
        </div>
      </div>

      {/* MOCKUP SECTION */}
      <div
        className="
    absolute left-1/2 -translate-x-1/2
    bottom-0
    translate-y-[40%]     /* perfect push down */
    w-full flex justify-center z-10
  "
      >
        <div
          className="
      w-full flex justify-center 
      py-6 sm:py-8 md:py-10
      rounded-xl
      bg-[url('/assets/homepage/bg.png')]
      bg-cover bg-center
    "
        >
          <Image
            src={Mockup}
            alt="Tablet"
            className="
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[900px]
        max-w-[900px]
        h-auto rounded-xl shadow-xl
      "
          />
        </div>
      </div>

      {/* SPACER FOR NEXT SECTION */}
    </section>
  );
}
