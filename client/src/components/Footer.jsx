import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#f9fafb] px-6 md:px-16 lg:px-24 xl:px-32 pt-12 pb-6 text-gray-600">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-gray-300 pb-8">
        {/* Logo + Description */}
        <div className="md:max-w-md">
          <img className="h-9" src={assets.logo} alt="QuickAI logo" />
          <p className="mt-6 text-sm leading-relaxed">
            <strong className="text-gray-800">QuickAI</strong> empowers
            creators, developers, and businesses to harness the potential of AI.
            From content generation to workflow automation, everything you need
            is here — smart, intuitive, and fast.
          </p>
        </div>

        {/* Links + Newsletter */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-12">
          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-blue-600 transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600 transition" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600 transition" href="#">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600 transition" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Subscribe to updates
            </h3>
            <p className="text-sm mb-4">
              Get the latest AI news and tips straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full sm:w-64 h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <button className="bg-primary hover:bg-blue-700 transition text-white rounded-lg px-4 py-2 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 text-center text-xs sm:text-sm text-gray-500">
        © 2024 QuickAI. Built with 💡 by{" "}
        <a
          href="https://your-portfolio-link.com"
          className="text-blue-500 hover:underline"
        >
          Prerona Som
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
