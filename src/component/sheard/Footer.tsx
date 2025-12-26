import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import image from "../../../public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div className="w-30 h-20">
            <Image
              src={image}
              width={300}
              height={300}
              alt="this is nav logo"
              className="w-full h-full bg-transparent"
            />
          </div>
          <p className="text-gray-400">
            Discover the citys top attractions, explore hidden gems, and
            experience authentic local culture with LocalGuaid.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/popular" className="hover:text-white">
                Popular Places
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-white">
                Tours
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: info@localguaid.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4 text-gray-400">
            <Link href="#" className="hover:text-white">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Linkedin size={20} />
            </Link>
          </div>
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
        © 2025 LocalGuaid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
