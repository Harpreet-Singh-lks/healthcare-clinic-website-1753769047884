import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
}

export interface ClinicTeamSectionProps {
  members: TeamMember[];
  className?: string;
}

export const ClinicTeamSection: React.FC<ClinicTeamSectionProps> = ({ members, className = '' }) => {
  return (
    <section className={`py-16 bg-blue-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              {member.photoUrl && (
                <img src={member.photoUrl} alt={member.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
              )}
              <div className="text-xl font-semibold text-blue-800">{member.name}</div>
              <div className="text-blue-600 mb-2">{member.role}</div>
              <p className="text-blue-900 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 