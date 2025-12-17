"use client";

export default function MayaCTABooking() {
  return (
    <section className="w-full px-4 py-8 lg:px-10">
      {/* MAIN CONTAINER */}
      <div
        className="
          max-w-7xl mx-auto
                   bg-[url('/bg/mcbg.png')]
          bg-cover bg-center bg-no-repeat
          bg-black
          rounded-[48px]
          px-8 lg:px-14 py-14
          flex flex-col lg:flex-row items-center justify-between
          gap-10
        "
      >
        {/* ========= LEFT ========= */}
        <div className="text-white space-y-6 max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
            Let Maya Transform Your Practice Today and Never miss a patient again!
          </h2>

          <button
            className="
             text-white
              px-6 py-2 rounded-sm
              font-medium text-sm
             bg-[linear-gradient(90deg,#0176F2_0%,#01448C_100%)]
    hover:opacity-90
              transition
              w-fit
            "
          >
            Book Your Free Demo
          </button>
        </div>

        {/* ========= RIGHT (FIXED SIZE) ========= */}
        <div
          className="
            relative
            bg-black
            rounded-[32px]
            w-full lg:w-[550px] xl:w-[650px]
            h-[550px] md:h-[500px] lg:h-[450px]   /* REDUCED HEIGHTS */
            overflow-hidden
            shadow-xl
          "
        >
          <iframe
            src="https://calendly.com/hubaix-info/booking-consultation"
            className="
              absolute inset-0
              w-full
              h-full
              border-none
            "
          />
        </div>
      </div>
    </section>
  );
}
