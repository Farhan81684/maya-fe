"use client";

import Navbar from "@/components/homepage/navbar";
import Hero from "@/components/homepage/Hero";
import Partner from "@/components/homepage/partners";
import AboutSection from "@/components/homepage/AboutSection";
import WhoWeHelp from "@/components/homepage/WhoWeHelp";
import WhyNowSection from "@/components/homepage/WhyNowSection";
import PoweredBy from "@/components/homepage/PoweredBy";
import PricingPlans from "@/components/homepage/PricingPlans";
import MayaROI from "@/components/homepage/MayaROI";
import Testimonials from "@/components/homepage/testimonials";
import HipaaCompliance from "@/components/homepage/HipaaCompliance";
import CTA from "@/components/homepage/CTA";
import Footer from "@/components/homepage/footer";
import AiAutomation from "@/components/homepage/AiAutomation";

export default function Home() {
  return (
    <>
      {/* ⭐ Navbar fixed at top */}
      <Navbar />

      {/* ⭐ Hero */}
      <div id="hero">
        <Hero />
      </div>

      {/* ⭐ Partners */}
      <section className="relative z-[10]">
        <Partner />
      </section>

      {/* ⭐ About / Features Section */}
      <div id="features">
        <AboutSection />
      </div>

      {/* ⭐ AI Automation */}
      <AiAutomation />

      {/* ⭐ Who We Help */}
      <WhoWeHelp />

      {/* ⭐ Why Now */}
      <WhyNowSection />

      {/* ⭐ Powered By */}
      <PoweredBy />

      {/* ⭐ Pricing Section */}
      <div id="pricing">
        <PricingPlans />
      </div>

      {/* ⭐ ROI */}
      <MayaROI />

      {/* ⭐ Testimonials */}
      <Testimonials />

      {/* ⭐ HIPAA Section */}
      <HipaaCompliance />

      {/* ⭐ Contact / CTA Section */}
      <div id="contact">
        <CTA />
      </div>

      {/* ⭐ Affiliates Footer */}
      <div id="affiliates">
        <Footer />
      </div>
    </>
  );
}
