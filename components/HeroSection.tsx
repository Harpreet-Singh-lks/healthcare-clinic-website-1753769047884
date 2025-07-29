import React from 'react';

export interface ClinicHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export const ClinicHero: React.FC<ClinicHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  className = ''
}) => {
  return (
    <section className={`relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-white px-4 py-16 ${className}`}>
      <div className="absolute inset-0 bg-[url('/public/medical image.png')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">{title}</h1>
        <p className="text-lg md:text-2xl text-blue-800 mb-8">{subtitle}</p>
        <a
          href={ctaLink}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={ctaText}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}; 