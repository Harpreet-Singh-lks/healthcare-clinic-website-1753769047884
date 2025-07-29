import React from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface ClinicFooterProps {
  clinicName: string;
  address?: string;
  links: FooterLink[];
  social: SocialLink[];
  className?: string;
}

export const ClinicFooter: React.FC<ClinicFooterProps> = ({
  clinicName,
  address,
  links,
  social,
  className = ''
}) => {
  return (
    <footer className={`bg-blue-50 text-blue-900 py-10 px-4 mt-12 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold mb-2">{clinicName}</div>
          {address && <div className="text-blue-700 text-sm">{address}</div>}
        </div>
        <nav className="flex space-x-6">
          {links.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-blue-600 transition-colors">{link.label}</a>
          ))}
        </nav>
        <div className="flex space-x-4">
          {social.map((s, idx) => (
            <a key={idx} href={s.href} aria-label={s.label} className="hover:text-blue-600 transition-colors text-2xl">{s.icon}</a>
          ))}
        </div>
      </div>
      <div className="text-center text-blue-700 text-xs mt-6">&copy; {new Date().getFullYear()} {clinicName}. All rights reserved.</div>
    </footer>
  );
}; 