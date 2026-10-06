import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800/80 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Logo Section */}
        <div className="flex justify-start mb-12">
          <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
            <div className="relative w-40 h-16 overflow-hidden rounded-lg bg-white/5 backdrop-blur-xs p-2 border border-white/10 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={48}
                className="object-contain max-h-full animate-pulse-slow"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Description / Address */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-zinc-100 font-semibold tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              About Us
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed pt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores saepe quam aut
              excepturi, perferendis eligendi recusandae est? Quisquam obcaecati necessitatibus
              odio, quasi porro natus rem fuga itaque tempore vero inventore.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-zinc-100 font-semibold tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Quick Links
            </h4>
            <ul className="space-y-3 pt-2 text-sm">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 block">
                  about us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 block">
                  privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 block">
                  terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/return-and-cancellation-policy" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 block">
                  return and cancellation policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-zinc-100 font-semibold tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Contact Us
            </h4>
            <ul className="space-y-4 pt-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 shrink-0">
                  <MapPin size={16} />
                </span>
                <span className="text-zinc-400 leading-normal">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 shrink-0">
                  <Phone size={16} />
                </span>
                <Link href="tel:01897579066" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 leading-normal">
                  01897579066
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400 shrink-0">
                  <Mail size={16} />
                </span>
                <Link href="mailto:noteboidesign@gmail.com" className="text-zinc-400 hover:text-blue-400 transition-colors duration-200 leading-normal break-all">
                  noteboidesign@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-zinc-100 font-semibold tracking-wider text-sm uppercase relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500">
              Follow Us
            </h4>
            <div className="flex gap-3 pt-2">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-400 hover:border-blue-400/30 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright divider */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} LocalGuaid. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-zinc-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

