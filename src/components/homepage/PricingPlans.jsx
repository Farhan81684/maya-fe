"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function renderCell(value, isBlueColumn = false) {
  if (value === "✔") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
          <FaCheck className="text-green-600 text-sm" />
        </div>
      </div>
    );
  }

  if (value === "x") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
          <FaTimes className="text-red-500 text-sm" />
        </div>
      </div>
    );
  }

  if (value.includes("Limited")) {
    return (
      <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
        {value}
      </span>
    );
  }

  if (value.includes("Full")) {
    return (
      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
        {value}
      </span>
    );
  }

  // ⭐ FIX: NORMAL NUMBERS/TEXT BECOME WHITE ONLY IN BLUE COLUMN
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
    <section className="w-full bg-gradient-to-b from-[#0B1A33] to-[#041022] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-14">
          Our <span className="text-blue-400">Plans</span> For Every{" "}
          <span className="text-blue-400">Practice</span> Type
        </h2>

        {/* PLAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Starter Plan",
              subtitle:
                "AI Chatbot for Basic Customer Interactions (Non-PHI Use Cases)",
              body: `Ideal for small wellness practices looking to automate general
              queries and appointment booking without handling sensitive patient
              information.`,
              note: "Pricing starts from as low as $99/month",
            },
            {
              title: "Professional Plan",
              subtitle: "Agentic AI Assistant for Individual Practitioners",
              body: `Designed for solo practitioners, this HIPAA-compliant AI agent handles
              front desk tasks, patient interactions, appointment bookings,
              reminders, and more — all personalized and secure.`,
              note: "Pricing starts from as low as $99/month",
            },
            {
              title: "Clinic Plan",
              subtitle:
                "Comprehensive Front Desk for Multi-Practitioner Clinics",
              body: `A scalable, all-in-one solution for clinics with multiple specialists.
              Manages patient interactions across chat, messaging and calls.`,
              note: "Pricing starts from as low as $99/month",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="px-6 py-8 rounded-3xl bg-gradient-to-b from-[#1840A8] to-[#0B1A33]
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
                <button className="w-full px-4 py-3 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition">
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
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-300 underline text-base hover:text-blue-400"
        >
          {open ? "Hide Features" : "View All Features"}
        </button>

        {/* TABLE */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            open ? "max-h-[4000px] mt-16" : "max-h-0 mt-0"
          }`}
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse rounded-t-3xl shadow-xl">
              {/* TABLE HEADER */}
              <thead>
                <tr>
                  {/* ALL FEATURES LEFT HEADER */}
                  <th className="w-[22%] rounded-tl-3xl align-top py-10 px-6">
                    <span className="text-[40px] font-bold text-white leading-none">
                      All
                    </span>
                    <br />
                    <span className="text-[40px] font-bold text-blue-500 leading-none">
                      Features
                    </span>
                  </th>

                  {/* STARTER (WHITE) */}
                  <th className="w-[25%]">
                 <div className="py-10 px-6 rounded-t-3xl bg-white text-[#19376D] shadow-md text-left">

                      <h3 className="text-xl font-bold mb-1">Starter Plan</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        AI Chatbot for Basic Customer Interactions
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium">
                        Book Demo
                      </button>
                    </div>
                  </th>

                  {/* PROFESSIONAL (BLUE, BIGGER & RAISED) */}
<th className="w-[30%] relative overflow-hidden rounded-t-3xl">

<div className="
  py-12 px-6 rounded-t-3xl 
  bg-gradient-to-b from-[#1F4FCF] to-[#173B9B]
  text-white shadow-2xl 
  text-left -mt-6 
  scale-[1.03]
">

                      <h3 className="text-xl font-bold mb-1">
                        Professional Plan
                      </h3>
                      <p className="text-xs text-gray-200 mb-4">
                        Agentic AI Assistant for Practitioners
                      </p>
                      <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-xs font-semibold">
                        Book Demo
                      </button>
                    </div>
                  </th>

                  {/* CLINIC (WHITE) */}
                  <th className="w-[25%]">
<div className="py-10 px-6 rounded-t-3xl bg-white text-[#19376D] shadow-md text-left">

                      <h3 className="text-xl font-bold mb-1">Clinic Plan</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Multi-Practitioner AI Front Desk
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium">
                        Book Demo
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="text-[15px]">
                {[
                  ["HIPAA Compliance", "x", "✔", "✔"],
                  ["BAA Coverage", "x", "✔", "✔"],
                  [
                    "AI Chatbot (Website Widget)",
                    "✔",
                    "(Limited Config)",
                    "(Full Config)",
                  ],
                  ["AI Chat Agent (WhatsApp)", "✔", "✔", "✔"],
                  ["AI Voice Agent (Inbound Calls One Number)", "x", "✔", "✔"],
                  ["LLM Tokens (Millions)", "0.2", "1", "3"],
                  ["Message Volume", "1,000", "5,000", "15,000"],
                  [
                    "Inbound Phone Calls - AI Voice Minutes",
                    "0",
                    "500",
                    "1500",
                  ],
                  ["WhatsApp Sessions", "50", "250", "750"],
                  ["SMS Reminders", "20", "100", "300"],
                  ["Emails", "20", "100", "300"],
                  [
                    "Appointment Booking System",
                    "Basic (No Calendar Sync)",
                    "Advanced (With Calendar Sync)",
                    "Advanced Multi-Provider",
                  ],
                  [
                    "Pre-Screening Intake Forms",
                    "Basic Template",
                    "Dynamic Form Builder",
                    "Dynamic Form Builder",
                  ],
                  ["CRM Integration (If Required)", "x", "✔", "✔"],
                  [
                    "Calendar Integration (Google / Outlook) OR Hubspot/Calendly",
                    "x",
                    "✔",
                    "✔",
                  ],
                  [
                    "Appointment Rescheduling (Link Sent On Email)",
                    "x",
                    "✔",
                    "✔",
                  ],
                  [
                    "Admin Dashboard",
                    "Basic Metrics",
                    "Full Dashboard & Analytics",
                    "Multi-User Admin Dashboards",
                  ],
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
                  [
                    "Multilingual Support",
                    "x",
                    "(English + 1 Supported Language)",
                    "(English + 1 Supported Language)",
                  ],
                  ["Custom Branding", "x", "✔", "✔"],
                  ["Dedicated Account Manager", "x", "x", "✔"],
                  [
                    "Support Level",
                    "Email Only",
                    "Priority Chat",
                    "Priority Chat + Phone",
                  ],
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    {/* FEATURE NAME */}
                    <td className="py-6 px-6 bg-white font-semibold text-gray-900">
                      {row[0]}
                    </td>

                    {/* PLANS */}
                    <td className="text-center bg-white  py-6">
                      {renderCell(row[1])}
                    </td>
                    <td className="text-center py-6 bg-gradient-to-b from-[#1F4FCF] to-[#173B9B]">
                      {renderCell(row[2], true)}
                    </td>

                    <td className="text-center py-6 bg-white">
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
