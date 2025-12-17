"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";

export default function StartupLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Runs once after hydration + first paint
    setReady(true);
  }, []);

  if (ready) return null;

  return (
    <div className="startup-loader-overlay">
      <div className="animate-bounce-slow">
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={120}
          priority
        />
      </div>
    </div>
  );
}
