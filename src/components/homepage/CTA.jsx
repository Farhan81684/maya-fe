"use client";


export default function MayaCTABooking() {
  return (
    <section className="w-full px-4 mt-20 mb-20 lg:px-10 py-14">
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
    relative
    bg-white/90
    rounded-2xl
    w-full lg:w-[550px] xl:w-[650px]
    h-[350px] md:h-[380px] lg:h-[400px]
    shadow-xl
    overflow-visible   /* allow iframe to overflow */
  "
>
  <iframe
    src="https://calendly.com/hubaix-info/booking-consultation"
    className="
      absolute 
      top-[-80px]        /* iframe goes UP */
      left-0 
      w-full             /* width SAME as parent */
      h-[650px]          /* bigger height — goes down too */
    "
    frameBorder="0"
  ></iframe>
</div>


      </div>
    </section>
  );
}
