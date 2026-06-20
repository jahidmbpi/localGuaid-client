"use client";
import Link from "next/link";
import image from "../../../public/logo.png";
import { Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSidebarItems } from "../uitls/getNavItem";
import { useMeQuery, useLogoutMutation } from "@/redux/feature/auth/auth.api";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { loggedOutNavItems } from "../uitls/nav/navItem";
import { ModeToggle } from "@/components/ModeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolly, setScrolly] = useState(0);
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState(false);
  const { data: user } = useMeQuery();
  const userData = user?.data;
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setProfile(false);
      setOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = userData?.role
    ? getSidebarItems(userData.role)
    : loggedOutNavItems;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || 0;

      setScrolly(currentScroll);

      setVisible(currentScroll > 5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed  w-full  left-0 top-0 z-50 transition-all duration-500 ease-in-out   ${visible ? "py-0  shadow-lg bg-white dark:bg-gray-900" : "py-7 "
        }`}
    >
      <div className=" md:max-w-6xl mx-auto w-full relative">
        <div className="flex items-center justify-between inset-x-0 font-sans">
          <Link href="/">
            {" "}
            <div className="w-26 h-17.5">
              <Image
                src={image}
                width={300}
                height={300}
                alt="this is nav logo"
                className="w-full h-full bg-transparent"
              />
            </div>
          </Link>

          <div className="hidden md:block">
            <ul className="flex gap-6 overflow-hidden py-2 md:p-2 text-[15px] text-gray-700 dark:text-gray-200 font-medium">
              {navItems.map((item, index) => (
                <Link href={item.path} key={index} className="hover:text-blue-500 transition-colors">
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center justify-center gap-2">
              <div>
                {!userData && (
                  <Link href="/login">
                    <button className="text-white font-medium py-2 text-[15px] md:p-2 bg-blue-600 hover:bg-blue-700 capitalize px-4 rounded-lg w-25 hover:cursor-pointer transition-colors">
                      log in
                    </button>
                  </Link>
                )}
              </div>
              {userData && (
                <div className="relative">
                  <div
                    onClick={() => setProfile(!profile)}
                    className="cursor-pointer"
                  >
                    <Avatar className="w-10 h-10 border border-gray-200">
                      <AvatarImage
                        className="object-cover"
                        src={userData.profilePhoto}
                      />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {profile && (
                    <div className="absolute right-0 top-full mt-3 w-56 rounded-xl shadow-xl border border-gray-200 py-2 z-50 md:block bg-white text-gray-800">
                      <div className="flex flex-col space-y-2 p-4">
                        <div className="border-b border-gray-100 pb-2 mb-1">
                          <p className="font-bold text-sm text-gray-900 truncate">{userData.name}</p>
                          <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setProfile(false)}
                          className="text-sm font-semibold capitalize hover:text-blue-500 transition-colors py-1"
                        >
                          profile
                        </Link>
                        <Link
                          href="/dashboard"
                          onClick={() => setProfile(false)}
                          className="text-sm font-semibold capitalize hover:text-blue-500 transition-colors py-1"
                        >
                          dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-left text-sm font-semibold capitalize text-red-600 hover:text-red-700 transition-colors py-2 border-t border-gray-100 mt-1 cursor-pointer"
                        >
                          log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <ModeToggle />
            </div>
          </div>

          <div
            className="md:hidden cursor-pointer text-gray-800 dark:text-gray-200 pr-2 "
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </div>
        </div>

        {/* mobile menu */}
        <div className="absolute top-0 left-0 w-[80%] overflow-hidden z-10">
          <div
            className={`${open ? "translate-x-0 " : "-translate-x-full"
              } transition-transform duration-700 ease-in-out w-full `}
          >
            <div className="block md:hidden  h-screen bg-[#111111]/90">
              <ul className="flex flex-col gap-4 text-sm font-medium font-sans items-start pt-25 text-[#f3f4f6] pl-6">
                {navItems.map((item, index) => (
                  <Link
                    onClick={() => setOpen(!open)}
                    className="hover:text-blue-400 transition-colors py-1 w-full"
                    href={item.path}
                    key={index}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {userData ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-400 font-medium py-2 text-[15px] text-left cursor-pointer hover:text-red-500 transition-colors w-full"
                  >
                    log Out
                  </button>
                ) : (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <span className="text-[#f3f4f6] font-medium py-2 text-[15px] hover:text-blue-400 transition-colors">
                      log in
                    </span>
                  </Link>
                )}
                <div className="py-2">
                  <ModeToggle />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
