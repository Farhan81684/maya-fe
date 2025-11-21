"use client";


export default function MayaCTABooking() {
  return (
    <section className="w-full px-4 lg:px-10 py-14">
      {/* MAIN CONTAINER (reduced width) */}
      <div
        className="
          max-w-7xl mx-auto
         bg-gradient-to-b from-[#0176F2] to-[#192027]


          rounded-[48px]
          px-8 lg:px-14 py-14
          flex flex-col lg:flex-row items-center justify-between
          gap-10
        "
      >
        {/* ========= LEFT ========= */}
        <div className="text-white space-y-6 max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
            Let Maya Transform Your <br /> Practice Today and Never <br /> miss a patient again!
          </h2>

          <button
            className="
              border border-white text-white
              px-6 py-2 rounded-full
              font-medium text-sm
              hover:bg-white hover:text-[#0D1023]
              transition
              w-fit
            "
          >
            Book Your Free Demo
          </button>
        </div>


<div
  className="
    bg-white/90
    rounded-2xl
    w-full lg:w-[550px] xl:w-[650px]   /* wider on big screens */
    h-[420px] md:h-[520px] lg:h-[600px]
    border border-white/10
    overflow-hidden
    shadow-xl
    flex justify-center items-center
  "
>
  <iframe
    src="https://calendly.com/hubaix-info/booking-consultation"
    className="w-full h-full"
    frameBorder="0"
  ></iframe>
</div>





      </div>
    </section>
  );
}
