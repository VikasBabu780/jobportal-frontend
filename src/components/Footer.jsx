import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[#0f172a] to-[#1e293b] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">JobHunt</h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Helping candidates find the right opportunity and recruiters hire faster.
          </p>

          <div className="flex gap-4 mt-5">
            <a className="p-2 bg-slate-800 rounded-full hover:bg-indigo-500 hover:text-white transition">
              <Facebook size={18} />
            </a>
            <a className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition">
              <Twitter size={18} />
            </a>
            <a className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition">
              <Linkedin size={18} />
            </a>
            <a className="p-2 bg-slate-800 rounded-full hover:bg-pink-500 hover:text-white transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Candidates */}
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Candidates</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-indigo-400 transition">Find Jobs</a></li>
            <li><a className="hover:text-indigo-400 transition">Saved Jobs</a></li>
            <li><a className="hover:text-indigo-400 transition">Applied Jobs</a></li>
            <li><a className="hover:text-indigo-400 transition">Profile</a></li>
          </ul>
        </div>

        {/* Recruiters */}
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Recruiters</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-indigo-400 transition">Post a Job</a></li>
            <li><a className="hover:text-indigo-400 transition">Manage Jobs</a></li>
            <li><a className="hover:text-indigo-400 transition">Find Candidates</a></li>
            <li><a className="hover:text-indigo-400 transition">Dashboard</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Contact</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-indigo-400" /> support@jobhunt.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-indigo-400" /> +91 82996 53269
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
