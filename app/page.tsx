"use client";
import React from 'react';
import { ClinicHero } from '../components/HeroSection'
import { ClinicContactForm } from '../components/ContactForm'
import { ClinicNavbar } from '../components/NavigationBar'
import { ClinicFooter } from '../components/Footer'
import { ClinicTestimonialCarousel } from '../components/TestimonialCarousel'
import { ClinicTeamSection } from '../components/TeamSection'
import { ClinicAppointmentBooking } from '../components/AppointmentBooking'
import { PricingPackages } from '../components/PricingPackages'
import { DoctorCard } from '../components/DoctorCard'
import { DoctorCardsGrid } from '../components/DoctorCardsGrid'
import { ProductCard } from '../components/ProductCard'
import { ProductsGrid } from '../components/ProductsGrid'
import { ProfileCard } from '../components/ProfileCard'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ClinicHero
        title="HealthCare Clinic"
        subtitle="Professional healthcare services for you and your family"
        ctaText="Book Appointment"
        ctaLink="#contact"
        className=""
      />
      <ClinicContactForm
        className=""
      />
      <ClinicNavbar
        logoText="HealthCare Clinic"
        links={[
        {
                "label": "Home",
                "href": "#home"
        },
        {
                "label": "Services",
                "href": "#services"
        },
        {
                "label": "About",
                "href": "#about"
        },
        {
                "label": "Contact",
                "href": "#contact"
        }
]}
        appointmentText="Book Now"
        appointmentHref="#contact"
        className=""
      />
      <ClinicFooter
        clinicName="HealthCare Clinic"
        address="123 Medical Center Dr, Healthcare City, HC 12345"
        links={[
        {
                "label": "Privacy Policy",
                "href": "/privacy"
        },
        {
                "label": "Terms of Service",
                "href": "/terms"
        },
        {
                "label": "Contact",
                "href": "/contact"
        }
]}
        social={[
        {
                "icon": "📧",
                "href": "mailto:contact@clinic.com",
                "label": "Email"
        },
        {
                "icon": "📞",
                "href": "tel:+1234567890",
                "label": "Phone"
        }
]}
        className=""
      />
      <ClinicTestimonialCarousel
        testimonials={[
        {
                "name": "Jane Doe",
                "text": "Great care and professional staff!"
        },
        {
                "name": "John Smith",
                "text": "Very professional and caring environment."
        },
        {
                "name": "Sarah Wilson",
                "text": "Excellent service and modern facilities."
        }
]}
        className=""
      />
      <ClinicTeamSection
        members={[
        {
                "name": "Dr. Alice Johnson",
                "role": "Physician",
                "bio": "Expert in family medicine with 10+ years experience."
        },
        {
                "name": "Nurse Bob Wilson",
                "role": "Nurse",
                "bio": "Caring and attentive healthcare professional."
        },
        {
                "name": "Dr. Carol Davis",
                "role": "Specialist",
                "bio": "Board-certified specialist in internal medicine."
        }
]}
        className=""
      />
      <ClinicAppointmentBooking
        className=""
      />
      <PricingPackages
         className=""

      />
      <DoctorCard
        doctor = {
    name: 'John Doe',
    specialty: 'Cardiologist',
    experience: '10 years',
    education: 'MD, Harvard University',
    photoUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM']
  }
         className=""
      />
      <DoctorCardsGrid  
        className=""

      />
      <ProductCard  
        className=""

      />
      <ProductsGrid  
        className=""

      />
      <ProfileCard  
        className=""

      />
    </main>
  );
}
