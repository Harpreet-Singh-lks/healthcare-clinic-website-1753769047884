import React, { useState } from 'react';

export interface Testimonial {
  name: string;
  text: string;
  avatarUrl?: string;
}

export interface ClinicTestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

export const ClinicTestimonialCarousel: React.FC<ClinicTestimonialCarouselProps> = ({ testimonials, className = '' }) => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  
  if (testimonials.length === 0) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-500">No testimonials available</p>
        </div>
      </section>
    );
  }
  
  const currentTestimonial = testimonials[idx];
  
  if (!currentTestimonial) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-500">No testimonials available</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="relative bg-blue-50 rounded-xl p-8 shadow flex flex-col items-center">
          {currentTestimonial.avatarUrl && (
            <img src={currentTestimonial.avatarUrl} alt={currentTestimonial.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
          )}
          <blockquote className="text-lg text-blue-900 mb-4">"{currentTestimonial.text}"</blockquote>
          <div className="font-semibold text-blue-700">- {currentTestimonial.name}</div>
          <div className="flex space-x-4 mt-6 justify-center">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >&larr;</button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}; 