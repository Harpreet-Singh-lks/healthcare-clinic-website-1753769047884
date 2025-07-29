"use client";

import React, { useState } from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface ClinicNavbarProps {
  logoText: string;
  links: NavLink[];
  appointmentText: string;
  appointmentHref: string;
  className?: string;
}

export const ClinicNavbar: React.FC<ClinicNavbarProps> = ({
  logoText,
  links,
  appointmentText,
  appointmentHref,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`bg-white shadow px-4 py-3 flex items-center justify-between relative ${className}`}>
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-blue-700">{logoText}</span>
      </div>
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Toggle menu"
        onClick={() => setOpen(o => !o)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
      </button>
      <div className="hidden md:flex items-center space-x-6">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className="text-blue-900 hover:text-blue-600 font-medium transition-colors">{link.label}</a>
        ))}
        <a href={appointmentHref} className="ml-4 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">{appointmentText}</a>
      </div>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b z-20 flex flex-col items-center py-4 md:hidden">
          {links.map((link, idx) => (
            <a key={idx} href={link.href} className="block w-full text-center py-2 text-blue-900 hover:text-blue-600 font-medium transition-colors">{link.label}</a>
          ))}
          <a href={appointmentHref} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">{appointmentText}</a>
        </div>
      )}
    </nav>
  );
}; 