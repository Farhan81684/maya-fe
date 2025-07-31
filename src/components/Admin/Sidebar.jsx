"use client";

import {
  BsFillStarFill,
} from "react-icons/bs";
import { TbMessageCircleFilled } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Popover } from "antd";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const [user, setUser] = useState({ name: "", email_address: "", role_id: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            name: parsedUser.name || "",
            email_address: parsedUser.email_address || "",
            role_id: parsedUser?.role_id || 0,
          });
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Stop loader on path change
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigation = (path) => {
    if (pathname !== path) {
      setIsNavigating(true);
      router.push(path);
    }
  };

  const navItem = (label ,icon, path) => (
    <button
      onClick={() => handleNavigation(path)}
      className={`flex items-center w-full px-2 py-3 text-left text-white no-underline rounded-[1rem] transition-colors duration-200 ${
        pathname === path ? "bg-[rgba(255,255,255,0.15)]" : ""
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-lg">{label}</span>
    </button>
  );

  return (
    <>
      {/* Top loader bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-[3px] bg-blue-500 animate-pulse z-[999]" />
      )}

      <div
        className="hidden lg:flex flex-col w-[14rem] 4xl:w-[15rem] px-7 py-10 bg-purple-600 text-white rounded-tr-[2.5rem] poppins"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.94), rgba(1, 32, 65, 1))",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <div className="logo flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">converAIx</h1>
            <img src="/assets/logo.svg" alt="logo" width={50} height={50} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-9 flex-1">
          <div className="flex flex-col gap-3">
            {navItem("Dashboard", <BsFillStarFill className="h-5 w-5" />, "/admin/dashboard")}
            {navItem("Call to Action", <TbMessageCircleFilled className="h-5 w-5" />, "/admin/cta")}
            {user?.role_id === 1 &&
              navItem("Admins", <RiAdminLine className="h-5 w-5" />, "/admin/admins")}
          </div>
        </nav>

        {/* Footer / User Info */}
        <div className="px-1 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Popover
              arrow={false}
              content={
                <div className="p-2 w-full text-center">
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("access_token");
                      router.push("/admin/login");
                    }}
                  >
                    Logout
                  </Button>
                </div>
              }
            >
              <div className="cursor-pointer">
                <div className="text-white text-[1.1rem] font-medium">
                  {user?.name}
                </div>
                <div className="text-white text-[.75rem]">
                  {user?.email_address}
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
