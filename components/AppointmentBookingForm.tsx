"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface AppointmentBookingFormProps {
  doctorId: string;
}

export default function AppointmentBookingForm({ doctorId }: AppointmentBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          date: data.appointmentDate,
        }),
        credentials: 'include', // Important for auth
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to book appointment");
      }

      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Appointment request sent successfully! Awaiting doctor's confirmation.
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Appointment Date</label>
          <input
            {...register("appointmentDate")}
            type="datetime-local"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Booking..." : "Request Appointment"}
        </button>
      </form>
    </div>
  );
}