"use client";
import Link from "next/link";
import image from "../../../public/logo.png";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSidebarItems } from "../uitls/getNavItem";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import { loggedOutNavItems } from "../uitls/loggedOutNavItems";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolly, setScrolly] = useState(0);
  const [visible, setVisible] = useState(false);

  const { data: userData } = useMeQuery(undefined);
  console.log(userData);

  const navItems = userData?.data?.role
    ? getSidebarItems(userData.data.role.toUpperCase())
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
      className={`fixed  w-full  left-0 top-0 z-50 transition-all duration-500 ease-in-out  ${
        visible ? "py-0  shadow-lg" : "py-7 "
      }`}
    >
      <div className=" md:max-w-6xl mx-auto w-full overflow-hidden ">
        <div className="flex items-center justify-between  relative inset-x-0  ">
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
            <ul className="flex gap-4 overflow-hidden py-2 md:p-2 text-[15px] text-gray-700  font-medium">
              {navItems.map((item, index) => (
                <Link href={item.path} key={index}>
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center justify-center gap-2">
              <div>
                {userData ? (
                  <Link href="/login">
                    <span className="text-gray-700 font-medium py-2 text-[15px] md:p-2 capitalize">
                      log Out
                    </span>
                  </Link>
                ) : (
                  <h2 className="text-gray-700 font-medium py-2 text-[15px] md:p-2 capitalize">
                    log in
                  </h2>
                )}
              </div>
              {userData && (
                <div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      className="object-cover"
                      src={userData?.data?.profilePhoto}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          <div
            className="md:hidden cursor-pointer text-gray-800 "
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-[70%] overflow-hidden">
          <div
            className={`${
              open ? "translate-x-0 " : "-translate-x-full"
            } transition-transform duration-700 ease-in-out w-full `}
          >
            <div className="block md:hidden  h-screen bg-[#111111]/20">
              <ul className="flex flex-col gap-4 text-sm font-medium font-mono items-center pt-10">
                {navItems.map((item, index) => (
                  <Link
                    onClick={() => setOpen(!open)}
                    className=""
                    href={item.path}
                    key={index}
                  >
                    {item.label}
                  </Link>
                ))}
                {userData ? (
                  <Link href="/login">
                    <span className="text-gray-700 font-medium py-2 text-[15px] md:p-2">
                      log in
                    </span>
                  </Link>
                ) : (
                  <h2 className="text-gray-700 font-medium py-2 text-[15px] md:p-2">
                    log Out
                  </h2>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
