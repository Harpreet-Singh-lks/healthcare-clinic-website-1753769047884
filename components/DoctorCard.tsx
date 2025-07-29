import React from 'react';

export interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  education: string;
  photoUrl?: string;
  rating?: number;
  availableSlots?: string[];
}

export interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
  showBooking?: boolean;
  onBookAppointment?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  className = '', 
  showBooking = false,
  onBookAppointment 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* Doctor Photo */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          {doctor.photoUrl ? (
            <img 
              src={doctor.photoUrl} 
              alt={doctor.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Rating Badge */}
        {doctor.rating && (
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md flex items-center space-x-1">
            {renderStars(doctor.rating)}
            <span className="text-sm font-medium text-gray-700 ml-1">{doctor.rating}</span>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="p-6">
        {/* Name - prominently displayed below photo */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{doctor.name}</h3>
        
        {/* Specialty */}
        <p className="text-blue-600 font-semibold text-center mb-3">{doctor.specialty}</p>
        
        {/* Experience */}
        <div className="flex items-center justify-center mb-3">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">{doctor.experience}</span>
        </div>
        
        {/* Education */}
        <div className="flex items-center justify-center mb-4">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-.857.429a1 1 0 00.416 1.927l2.5.5a1 1 0 00.416-1.927l-.857-.429a1 1 0 01.788-1.838l4 1.714a1 1 0 01.356.257l2.25 1.131a1 1 0 001.84 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          <span className="text-sm text-gray-600">{doctor.education}</span>
        </div>

        {/* Available Slots */}
        {doctor.availableSlots && doctor.availableSlots.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium"
                >
                  {slot}
                </span>
              ))}
              {doctor.availableSlots.length > 3 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  +{doctor.availableSlots.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Book Appointment Button */}
        {showBooking && onBookAppointment && (
          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
};

// Default export for the component
export default DoctorCard; 