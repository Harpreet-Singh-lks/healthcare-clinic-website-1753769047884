"use client";

import React, { useState } from 'react';

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  reason: string;
}

export interface ClinicAppointmentBookingProps {
  onSubmit?: (data: AppointmentData) => Promise<void> | void;
  className?: string;
}

export const ClinicAppointmentBooking: React.FC<ClinicAppointmentBookingProps> = ({ onSubmit = () => Promise.resolve(), className = '' }) => {
  const [form, setForm] = useState<AppointmentData>({ name: '', email: '', phone: '', date: '', reason: '' });
  const [errors, setErrors] = useState<Partial<AppointmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const errs: Partial<AppointmentData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.date.trim()) errs.date = 'Date is required';
    if (!form.reason.trim()) errs.reason = 'Reason is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatus('idle');
    try {
      await onSubmit(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', date: '', reason: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow p-8 max-w-lg mx-auto space-y-6 ${className}`} aria-label="Appointment booking form">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-900 mb-1">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-blue-900 mb-1">Phone *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-blue-900 mb-1">Date *</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'date-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.date && <p id="date-error" className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-blue-900 mb-1">Reason *</label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          value={form.reason}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? 'reason-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.reason && <p id="reason-error" className="mt-1 text-sm text-red-600">{errors.reason}</p>}
      </div>
      {status === 'success' && <div className="text-green-700 bg-green-50 border border-green-200 rounded p-3">Appointment requested!</div>}
      {status === 'error' && <div className="text-red-700 bg-red-50 border border-red-200 rounded p-3">Failed to request. Please try again.</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}; 