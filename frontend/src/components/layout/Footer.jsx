import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-t border-yellow-400/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Department Info */}
        <div className="flex flex-col justify-center">
          {/* <img src="/src/assets/JUST_logo.jpg" alt="JUST Logo" className="h-14 w-14 object-center rounded-full mb-3 shadow-lg" /> */}
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-1">
            Department of Computer Science & Engineering
          </h2>
          <p className="text-base text-slate-300">
            Jashore University of Science and Technology
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-2 text-yellow-400">Contact Us</h2>
          <div className="flex items-center space-x-3 mb-2">
            <a
              href="mailto:auto.docs.cse@just.edu.bd"
              className="hover:text-yellow-300 transition"
              aria-label="Email"
            >
              📧
            </a>
            <span className="text-base text-slate-200">auto.docs.cse@just.edu.bd</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="tel:+8801123456789" className="hover:text-yellow-300 transition" aria-label="Phone">
              📞
            </a>
            <span className="text-base text-slate-200">+8801123456789</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-2 text-yellow-400">Quick Links</h2>
          <div className="flex flex-col space-y-1">
            <p><a href="/" className="text-base text-slate-200 hover:text-yellow-300 transition font-medium">
              <u>Home</u>
            </a></p>
            <p><a href="/services" className="text-base text-slate-200 hover:text-yellow-300 transition font-medium">
              <u>Services</u>
            </a></p>
            <p><a href="/contact" className="text-base text-slate-200 hover:text-yellow-300 transition font-medium">
              <u>Contact</u>
            </a></p>
            <p><a href="/about" className="text-base text-slate-200 hover:text-yellow-300 transition font-medium">
              <u>About</u>
            </a></p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-yellow-400/20 mx-4"></div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-center items-center py-4 space-y-2 md:space-y-0 md:space-x-4 text-slate-300 text-sm">
        <span>
          &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-bold">Auto Docs</span>. All rights reserved.
        </span>
        <span className="hidden md:inline-block">|</span>
        <a
          href="/credits"
          className="hover:text-yellow-300 transition font-medium"
        >
          <u>Credits</u>
        </a>
        <span className="hidden md:inline-block">|</span>
        <a
          href="/founders"
          className="hover:text-yellow-300 transition font-medium"
        >
          <u>Founders</u>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
