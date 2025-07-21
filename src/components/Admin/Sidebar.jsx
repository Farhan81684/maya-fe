import { ChevronDown, MessageSquare, Star } from "lucide-react";
import { TbMessageCircleFilled } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { BsFillStarFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Popover } from "antd";
import { useEffect, useState } from "react";

const Sidebar = () => {

  const pathname = usePathname();
  const router = useRouter();

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
            role_id: parsedUser?.role_id || 0
          });
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-[14rem] 4xl:w-[15rem] px-7 py-10 bg-purple-600 text-white rounded-tr-[2.5rem] poppins"
     style={{
        background:
          "linear-gradient(to top, rgba(0, 0, 0, 0.94), rgba(1, 32, 65, 1))",
      }}>
      <div className="flex items-center justify-center">
     <div className="logo flex items-center gap-3">
  <h1 className="text-xl font-bold text-white">converAIx</h1>
  <img src="/assets/logo.svg" alt="logo" width={50} height={50} />
</div>
 
      </div>
      <nav className="mt-9 flex-1">
        <div className="flex flex-col gap-4">
          <Link href="/admin/dashboard" className={`flex items-center px-2 py-3 !text-white !no-underline rounded-[1rem] ${pathname === '/admin/dashboard' ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}>
            {/* <Star className="h-5 w-5 mr-3" /> */}
            <BsFillStarFill className="h-5 w-5 mr-3" />
            <span className="text-lg">Dashboard</span>
          </Link>
          <Link href="/admin/cta" className={`flex items-center px-2 py-3 !text-white !no-underline rounded-[1rem] ${pathname === '/admin/cta' ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}>
            {/* <MessageSquare className="h-5 w-5 mr-3" /> */}
            <TbMessageCircleFilled className="h-5 w-5 mr-3" />
            <span className="text-lg">Call to Action</span>
          </Link>
          {user?.role_id === 1
            ? <Link href="/admin/admins" className={`flex items-center px-2 py-3 !text-white !no-underline rounded-[1rem] ${pathname === '/admin/admins' ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}>
              {/* <MessageSquare className="h-5 w-5 mr-3" /> */}
              <TbMessageCircleFilled className="h-5 w-5 mr-3" />
              <span className="text-lg">Admins</span>
            </Link> : <></>}
        </div>
      </nav>

      <div className="px-1 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Popover arrow={false} content={<div className="p-2 w-full text-center">
            <Button danger type="primary" onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("access_token");
              router.push("/admin/login");
            }}>Logout</Button>
          </div>}>
            <div className="text cursor-pointer">
              <div className="text-white text-[1.1rem] font-medium">{user?.name}</div>
              <div className="text-white text-[.75rem]">{user?.email_address}</div>
            </div>
          </Popover>
        </div>
      </div >
    </div >
  )
}

export default Sidebar
