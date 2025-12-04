"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dummy from "../../../public/assets/dummy.png";

const testimonials = [
  {
    name: "Dr. Adam Foster",
    role: "Family Chiropractor, Manchester, UK",
    img: dummy,
    text:
      "ConveraiX has completely transformed how we handle patient inquiries. We went from missing dozens of patients a week to having an AI agent booking appointments and answering questions 24/7. "
  },

  {
    name: "James Walker",
    role: "Clinic Manager, Bright Smiles Dental Group, FL, USA",
    img: dummy,
    text:
      "Our front desk team was drowning in calls. After switching to ConveraiX, our patient satisfaction scores jumped significantly. Staff now focus on real patient care instead of constant phone handling."
  },

  {
    name: "Tom Müller",
    role: "Physiotherapist & Rehab Center Owner, Berlin, Germany",
    img: dummy,
    text:
      "As a solo practitioner, this AI system has been a lifesaver. It pre-screens patients, manages schedules, and handles FAQs better than any human assistant I’ve hired. A true game changer!"
  },

  {
    name: "Dr. Nina Kapoor",
    role: "Aesthetic Dermatologist, Dubai, UAE",
    img: dummy,
    text:
      "My clinic receives dozens of WhatsApp inquiries daily. ConveraiX now handles them instantly with accurate responses. No leads are lost anymore — and engagement has doubled."
  },

  {
    name: "Michael Chen",
    role: "Operations Director, Wellness Hub, Singapore",
    img: dummy,
    text:
      "We integrated ConveraiX into our website and Instagram DM. The results were unbelievable — bookings increased, admin workload decreased, and patients love the instant replies."
  },

  {
    name: "Dr. Sarah Thompson",
    role: "Pediatric Dentist, Ontario, Canada",
    img: dummy,
    text:
      "Parents often message late at night with concerns. The AI handles triage beautifully and even schedules consultations when needed. It fits our practice perfectly."
  },

  {
    name: "Dr. Luis Herrera",
    role: "General Practitioner, Madrid, Spain",
    img: dummy,
    text:
      "ConveraiX responds in multiple languages, which is perfect for our diverse patient base. It handles everything from symptom queries to appointment reminders flawlessly."
  },

  {
    name: "Emily Rogers",
    role: "Clinic Administrator, MindWell Therapy Center, Texas, USA",
    img: dummy,
    text:
      "Our therapists used to spend hours each week responding to clients. Now the AI handles intake forms, FAQs, and scheduling automatically. It has streamlined our entire workflow."
  },

  {
    name: "Dr. Omar Qureshi",
    role: "Orthopedic Surgeon, Lahore, Pakistan",
    img: dummy,
    text:
      "The AI assistant has significantly reduced the back-and-forth communication. It pre-qualifies patients and updates me with concise summaries before each consultation."
  },

  {
    name: "Jessica Williams",
    role: "Manager, Serenity Women’s Health Clinic, California, USA",
    img: dummy,
    text:
      "We were shocked by how human-like Maya sounds. Patients frequently say, 'your receptionist is so efficient!' They don’t even realize it’s AI — that’s how seamless it is."
  },

  {
    name: "Dr. Viktor Sokolov",
    role: "Rehab Specialist, Warsaw, Poland",
    img: dummy,
    text:
      "Our website conversions increased by 42% after adding the AI chatbot. It guides visitors through treatment options and helps them book instantly. Fantastic ROI."
  },

  {
    name: "Sofia Almeida",
    role: "Nutritionist & Wellness Coach, Lisbon, Portugal",
    img: dummy,
    text:
      "Maya handles all my initial consultations, collects client goals, and sends me a structured summary. It saves me hours every week and gives a polished experience to new clients."
  }
];



export default function Testimonials() {
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(4);

  // ✅ Responsive number of cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisible(1);        // mobile
      else if (window.innerWidth < 1024) setVisible(2); // tablet
      else setVisible(4);                               // desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Infinite LOOP next
  const next = () => {
    setStart((prev) => (prev + 1) % testimonials.length);
  };

  // ✅ Infinite LOOP previous
  const prev = () => {
    setStart((prev) =>
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    );
  };

// build base slides
let baseSlides = testimonials.map((t) => t);

// add clones to prevent empty ending space
let clonesNeeded = visible - 1;
let clones = testimonials.slice(0, clonesNeeded);

const slideItems = [...baseSlides, ...clones];


  return (
    <section className="w-full py-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Client <span className="text-blue-500">Testimonials</span>
      </h2>

      <div className="relative max-w-7xl mx-auto">

        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <FiChevronLeft size={22} />
        </button>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <div
            className={`flex transition-all duration-500`}
            style={{ transform: `translateX(-${start * (100 / visible)}%)` }}
          >
            {slideItems.map((t, i) => (
<div
  key={i}
  className="flex-shrink-0 px-2"
  style={{ width: `${100 / visible}%` }}
>
  <div
    className="
              bg-[url('/bg/tbg.png')]
          bg-cover bg-center bg-no-repeat
    text-white 
    rounded-xl shadow-lg overflow-hidden 
    h-[400px] flex flex-col justify-between"
  >
    
    <div className="p-5">
<div className="flex items-start justify-between mb-6">
  {/* LEFT: Avatar + Name + Role */}
  <div className="flex items-start gap-2">
    <Image
      src={t.img}
      alt={t.name}
      width={40}
      height={40}
      className="rounded-full object-cover"
    />

    <div className="leading-tight">
      <h3 className="text-white font-semibold text-[16px]">
        {t.name}
      </h3>

      {/* ROLE + STARS — same line */}
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-gray-200 opacity-90">
          {t.role}
        </p>

        {/* STARS aligned with role */}
        <div className="flex gap-[2px]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <FaStar key={idx} size={12} className="text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>



      <p className="text-md mt-10 text-gray-100 leading-relaxed ">
        {t.text}
      </p>
    </div>

  </div>
</div>

            ))}
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <FiChevronRight size={22} />
        </button>

      </div>
    </section>
  );
}
