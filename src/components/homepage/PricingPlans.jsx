"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function renderCell(value, isBlueColumn = false) {
  if (value === "✔") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-[#09FF2E]/26 flex items-center justify-center">
          <FaCheck className="text-[#09FF2E] text-sm" />
        </div>
      </div>
    );
  }

  if (value === "x") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-[#FF0909]/26 flex items-center justify-center">
          <FaTimes className="text-[#FF0909] text-sm" />
        </div>
      </div>
    );
  }



  return (
    <span
      className={
        isBlueColumn ? "text-white font-medium" : "text-gray-700 font-medium"
      }
    >
      {value}
    </span>
  );
}

export default function PricingPlans() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-12 px-2 sm:px-4 lg:px-6 xl:px-10">
      {/* OUTER CONTAINER */}
      <div
        className="
          w-full
          mx-auto
          bg-[url('/bg/mcbg.png')]
          rounded-t-[32px] md:rounded-t-[40px] lg:rounded-t-[48px]
          bg-cover bg-center bg-no-repeat
          px-16 sm:px-20 md:px-28 lg:px-36
          pt-12 md:pt-14 lg:pt-16
          pb-16 md:pb-18 lg:pb-20
          shadow-2xl
          text-white
          max-w-[1290px]   /* Set consistent max-width */
        "
      >
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-14">
          Our <span className="text-blue-400">Plans</span> For Every{" "}
          <span className="text-blue-400">Practice</span> Type
        </h2>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[

            {
              title: "Starter Plan",
              subtitle:
                "AI Chatbot for Basic Customer Interactions (Non-PHI Use Cases)",
              body: `Ideal for small wellness practices looking to automate general queries and appointment booking without handling sensitive patient information.`,
              note: "Pricing starts from as low as $99/month",
            },
            {
              title: "Professional Plan",
              subtitle: "Agentic AI Assistant for Individual Practitioners",
              body: `Designed for solo practitioners, this HIPAA-compliant AI agent handles front desk tasks, patient interactions, appointment bookings, reminders, and more — all personalized and secure.`,
              note: "Pricing starts from as low as $99/month",
            },
            {
              title: "Clinic Plan",
              subtitle:
                "Comprehensive Front Desk for Multi-Practitioner Clinics",
              body: `A scalable, all-in-one solution for clinics with multiple specialists. Manages patient interactions across chat, messaging and calls.`,
              note: "Pricing starts from as low as $99/month",
            },

          ].map((p, i) => (
            <div
              key={i}
              
              className="px-5 py-8 rounded-3xl bg-[linear-gradient(130deg,#0176F2_0%,#192027_100%)]
              border border-[#4B80EA] shadow-xl flex flex-col justify-between min-h-[480px] text-left"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-blue-200 leading-relaxed mb-6">
                  {p.subtitle}
                </p>

                <p className="text-[15px] text-gray-200 leading-relaxed mb-10">
                  {p.body}
                </p>
              </div>

              <div>
                <button className="w-full px-2 py-3 bg-[#0176F2] rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition">
                  Book a Demo to Unlock Alpha Pricing
                </button>

                <p className="text-xs text-gray-400 mt-4 text-center">
                  {p.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
<div className="flex justify-center mt-4">
  <button
    onClick={() => setOpen(!open)}
    className="text-blue-300 underline text-base hover:text-blue-400"
  >
    {open ? "Hide Features" : "View All Features"}
  </button>
</div>


        {/* TABLE */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            open ? "max-h-[4000px] mt-16" : "max-h-0 mt-0"
          }`}
        >
          <div className="w-full overflow-x-auto">
<table className="w-full mt-10 table-fixed  border-collapse rounded-t-3xl shadow-xl">
  <thead>
    <tr>
      {/* LEFT HEADER — All Features */}
      <th className="w-1/4 rounded-tl-3xl align-top py-10 px-6 bg-transparent text-left">
        <div className="-mt-2">
          <span className="text-[42px] font-extrabold text-white block leading-[1]">
            All
          </span>
          <span className="text-[42px] font-extrabold text-blue-500 block leading-[1]">
            Features
          </span>
        </div>
      </th>

      {/* STARTER PLAN */}
<th className="w-1/4 align-top">
  <div className="h-full min-h-[260px] md:min-h-[280px] lg:min-h-[300px] 
      py-10 px-6 rounded-t-3xl bg-white text-[#19376D] shadow-md 
      flex flex-col justify-between">
    <h3 className="text-xl font-bold mb-1">Starter Plan</h3>
    <p className="text-xs text-gray-500 mb-4">
      AI Chatbot for Basic Customer Interactions (Non-PHI Use Cases)
    </p>
    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-medium">
      Book a Demo to Unlock Alpha Pricing
    </button>
  </div>
</th>


<th className="w-1/4 align-top">
  <div className="
      h-full min-h-[260px] md:min-h-[280px] lg:min-h-[300px]
      py-10 px-6 rounded-t-3xl shadow-2xl
      bg-[linear-gradient(90deg,#003063_0%,#0061C9_100%)]
      text-white flex flex-col justify-between">
    <h3 className="text-xl font-bold mb-1">Professional Plan</h3>
    <p className="text-xs text-gray-200 mb-4">
      Agentic AI Assistant for Individual Practitioners
    </p>
    <button className="bg-white text-blue-700 px-5 py-2 rounded-lg text-xs font-semibold">
      Book a Demo to Unlock Alpha Pricing
    </button>
  </div>
</th>


      {/* CLINIC PLAN */}
<th className="w-1/4 align-top rounded-tr-3xl">
  <div className="h-full min-h-[260px] md:min-h-[280px] lg:min-h-[300px]
      py-10 px-6 rounded-t-3xl bg-white text-[#19376D] shadow-md 
      flex flex-col justify-between">
    <h3 className="text-xl font-bold mb-1">Clinic Plan</h3>
    <p className="text-xs text-gray-500 mb-4">
      Comprehensive AI-Powered Front Desk for Multi-Practitioner Clinics
    </p>
    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-medium">
      Book a Demo to Unlock Alpha Pricing
    </button>
  </div>
</th>

    </tr>
  </thead>

  <tbody className="text-[12px]">
    {[
      ["HIPAA Compliance", "x", "✔", "✔"],
      ["BAA Coverage", "x", "✔", "✔"],
      ["AI Chatbot (Website Widget)", "✔", "(Limited Config)", "(Full Config)"],
      ["AI Chat Agent (WhatsApp)", "✔", "✔", "✔"],
      ["AI Voice Agent (Inbound Calls One Number)", "x", "✔", "✔"],
      ["LLM Tokens (Millions)", "0.2", "1", "3"],
      ["Message Volume", "1,000", "5,000", "15,000"],
      ["Inbound Phone Calls - AI Voice Minutes", "0", "500", "1500"],
      ["WhatsApp Sessions", "50", "250", "750"],
      ["SMS Reminders", "20", "100", "300"],
      ["Emails", "20", "100", "300"],
      ["Appointment Booking System", "Basic (No Calendar Sync)", "Advanced (With Calendar Sync)", "Advanced Multi-Provider"],
      ["Pre-Screening Intake Forms", "Basic Template", "Dynamic Form Builder", "Dynamic Form Builder"],
      ["CRM Integration (If Required)", "x", "✔", "✔"],
      ["Calendar Integration (Google / Outlook) OR Hubspot/Calendly", "x", "✔", "✔"],
      ["Appointment Rescheduling (Link Sent On Email)", "x", "✔", "✔"],
      ["Admin Dashboard", "Basic Metrics", "Full Dashboard & Analytics", "Multi-User Admin Dashboards"],
      ["Reporting & Analytics", "x", "✔", "(Exportable)"],
      ["Team Members", "1", "1", "3 (INCLUDED)"],
      ["Additional Practitioners", "x", "x", "$50/User/Mo"],
      ["User Roles (Doctor/Admin/Staff)", "x", "✔", "✔"],
      ["SMS/Email Reminders", "x", "✔", "✔"],
      ["Chat Logs Retention", "7 Days", "90 Days", "1 Year"],
      ["Storage Allotted Per Month", "500 MB", "1 GB", "3 GB"],
      ["PHI Detection & Redaction", "x", "✔", "(Customizable)"],
      ["Consent Tracking", "x", "✔", "✔"],
      ["Secure Vector Search (RAG)", "x", "✔", "✔"],
      ["Multilingual Support", "x", "(English + 1 Supported Language)", "(English + 1 Supported Language)"],
      ["Custom Branding", "x", "✔", "✔"],
      ["Dedicated Account Manager", "x", "x", "✔"],
      ["Support Level", "Email Only", "Priority Chat", "Priority Chat + Phone"],
    ].map((row, idx) => (
      <tr
        key={idx}
        className="border-t border-gray-200 divide-x divide-gray-200"
      >
        {/* FEATURE NAME */}
        <td className="py-3 px-6 bg-white font-semibold text-gray-900">
          {row[0]}
        </td>

        {/* STARTER */}
        <td className="text-center bg-white py-3">
          {renderCell(row[1])}
        </td>

        {/* PROFESSIONAL */}
        <td className="text-center py-3 bg-[#003063]">
          {renderCell(row[2], true)}
        </td>

        {/* CLINIC */}
        <td className="text-center py-3 bg-white">
          {renderCell(row[3])}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </div>

      </div>
    </section>
  );
}
