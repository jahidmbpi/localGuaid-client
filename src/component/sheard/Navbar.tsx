"use client";
import Link from "next/link";
import image from "../../../public/logo.png";
import { Menu, User, X } from "lucide-react";
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
  const [profile, setProfile] = useState(false);

  const { data: user } = useMeQuery();
  const userData = user?.data;

  const navItems = userData?.role
    ? getSidebarItems(userData.role)
    : loggedOutNavItems;

  console.log(userData);

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
      className={`fixed  w-full  left-0 top-0 z-50 transition-all duration-500 ease-in-out   ${
        visible ? "py-0  shadow-lg" : "py-7 "
      }`}
    >
      <div className=" md:max-w-6xl mx-auto w-full relative">
        <div className="flex items-center justify-between inset-x-0 ">
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
                {!userData && (
                  <Link href="/login">
                    <button className="text-gray-700 font-medium py-2 text-[15px] md:p-2  bg-blue-500 capitalize px-2 rounded-sm w-25 hover:cursor-pointer">
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
                    <Avatar className="w-10 h-10">
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
                    <div className="absolute right-0 top-full mt-3 w-56 rounded-lg shadow-xl border border-gray-200 py-2 z-50  md:block bg-white">
                      <div className="flex flex-col space-y-3.5 text-gray-700 p-4 ">
                        <p className="text-sm font-bold font-sans capitalize">
                          profile
                        </p>
                        <p className="text-sm font-bold font-sans capitalize">
                          update profile
                        </p>
                        <p className="text-sm font-bold font-sans capitalize">
                          hello
                        </p>
                        <p className="text-sm font-bold font-sans capitalize">
                          hello
                        </p>
                        <p className="text-sm font-bold font-sans capitalize">
                          hello
                        </p>
                        <Link
                          href="/login"
                          className="text-gray-700 font-medium  text-[15px] capitalize"
                        >
                          log out
                        </Link>
                      </div>
                    </div>
                  )}
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

        {/* mobile menu */}
        <div className="absolute top-0 left-0 w-[80%] overflow-hidden z-10">
          <div
            className={`${
              open ? "translate-x-0 " : "-translate-x-full"
            } transition-transform duration-700 ease-in-out w-full `}
          >
            <div className="block md:hidden  h-screen bg-[#111111]/80">
              <ul className="flex flex-col gap-4 text-sm font-medium font-mono items-start pt-25 text-[#f3f4f6] pl-4">
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
                    <span className="text-[#f3f4f6] font-medium py-2 text-[15px] md:p-2">
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
