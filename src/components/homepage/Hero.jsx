"use client";

import Image from "next/image";
import maya from "../../../public/assets/homepage/hero.png";
import Mockup from "../../../public/assets/homepage/mockup.png";
import { FaCheck } from "react-icons/fa";

export default function Hero() {
  return (
    <>
      {/* HERO SECTION */}
<section
  className="
    relative w-full 
    pt-24 
    pb-[270px]
    sm:pb-[300px]
    md:pb-[330px]
    lg:pb-[360px]
    xl:pb-[390px]
    overflow-visible
    bg-[url('/bg/hero.png')]
    bg-cover bg-center bg-no-repeat
    bg-black
  "
>



        {/* MAIN CONTENT */}
        <div
          className="
            max-w-7xl mx-auto 
            px-8 sm:px-12 md:px-16 
            flex flex-col lg:flex-row 
            items-center justify-between 
            gap-10 lg:gap-5
          "
        >
          {/* LEFT TEXT CONTENT */}
          <div
            className="
              flex-1 text-white max-w-[800px]
              text-center lg:text-left mx-auto
              lg:pl-6 xl:pl-10  
            "
          >
            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                font-bold leading-tight mb-8
              "
            >
              Never Miss a Patient <span className='text-blue-400'>Again</span>
              <br />
              Meet <span className='text-blue-400'>Maya!</span> Your 24/7 AI
              <br />
              Front Desk <span className='text-blue-400'>Assistant</span>
            </h1>

            <ul className="space-y-4 text-gray-600 text-base sm:text-lg md:text-xl mb-8 mx-auto">
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
    text-white 
    px-8 py-1.5 sm:px-10 sm:py-2
    rounded-md 
    text-base sm:text-lg md:text-xl
    font-medium 
    transition
    bg-[linear-gradient(90deg,#0176F2_0%,#01448C_100%)]
    hover:opacity-90
    min-w-[200px]
  "
>
  Get Early Discounted Access
</button>


            </div>
          </div>

          {/* RIGHT SIDE HERO IMAGE */}
          <div
            className="
              relative flex-1 flex 
              justify-center items-center 
              min-h-[300px] sm:min-h-[400px] md:min-h-[500px]
            "
          >
            <Image
              src={maya}
              alt="Maya AI"
              className="
                w-[85%] sm:w-[90%] md:w-[95%] lg:w-[100%]
                max-w-[650px] sm:max-w-[700px] md:max-w-[750px] lg:max-w-[800px]
                h-auto object-contain
              "
            />
          </div>
        </div>

        {/* MOCKUP TABLET */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-0 translate-y-[48%]
            w-full flex justify-center 
            z-20
          "
        >
       <Image
  src={Mockup}
  alt="Tablet Mockup"
  className="
    w-[90%] sm:w-[75%] md:w-[80%] lg:w-[75%] xl:w-[70%]
    max-w-[900px]
    h-auto rounded-xl shadow-xl
    relative z-20
  "
/>


        </div>
      </section>
<div
  className="
    w-full 
    bg-[url('/assets/homepage/bg.gif')]
    bg-cover bg-center
    filter invert brightness-50
    h-[300px] sm:h-[350px] md:h-[400px]
    -mt-15
  "
/>


      {/* GIF FLOOR SECTION — BOTTOM-MOST LAYER */}

    </>
  );
}
