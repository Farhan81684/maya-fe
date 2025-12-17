import "./globals.css";
import { Poppins } from "next/font/google";
import Spineer from "../components/homepage/StartupLoader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Spineer /> {/* overlay only */}
        {children}
      </body>
    </html>
  );
}
