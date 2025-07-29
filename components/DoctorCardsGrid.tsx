import React from 'react';
import { DoctorCard, Doctor } from './DoctorCard';

export interface DoctorCardsGridProps {
  doctors: Doctor[];
  title?: string;
  subtitle?: string;
  className?: string;
  showBooking?: boolean;
  onBookAppointment?: (doctor: Doctor) => void;
}

export const DoctorCardsGrid: React.FC<DoctorCardsGridProps> = ({
  doctors,
  title = "Our Medical Team",
  subtitle = "Meet our experienced healthcare professionals",
  className = '',
  showBooking = false,
  onBookAppointment
}) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              doctor={doctor}
              showBooking={showBooking}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Doctors Available</h3>
            <p className="text-gray-500">Check back later for available medical professionals.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Default export for the component
export default DoctorCardsGrid; 