"use client"; // Interactive menu-r jonno eta dorkar

import { useState } from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MyBrand
            </Link>
          </div>

          {/* Desktop Menu - Boro screen-er jonno */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4 ">
            <Link
              href="/"
              className="relative group p-2 bg-gray-100 hover:bg-blue-50 rounded-full transition-all duration-300 inline-flex items-center justify-center"
            >
              {/* Cart Icon */}
              <CiShoppingCart className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />

              {/* Notification Badge (Optional: Koyta item ache seta dekhate) */}
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                3
              </span>
            </Link>

            <button className="bg-blue-600 hidden md:block hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
              Login
            </button>
          </div>

          {/* Mobile Menu Button - Shudhu mobile-e dekhabe */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links - Toggle hole dekhabe */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 pt-2 shadow-lg">
          <div className="px-2 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 block md:hidden">


            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
