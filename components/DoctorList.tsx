"use client"

import { Doctor, Appointment } from "@prisma/client";
import AppointmentBookingForm from "./AppointmentBookingForm";
import { useState, useEffect } from "react";

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Fetch pending appointments for the logged-in doctor
    const fetchPendingAppointments = async () => {
      const response = await fetch("/api/appointments/pending");
      const data = await response.json();
      setPendingAppointments(data.appointments);
    };

    fetchPendingAppointments();
  }, []);

  const handleAppointmentAction = async (appointmentId: string, action: "approved" | "declined") => {
    const response = await fetch(`/api/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action }),
    });

    if (response.ok) {
      setPendingAppointments(pendingAppointments.filter(app => app.id !== appointmentId));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{doctor.name} {doctor.lastName}</h2>
            <p>Specialization: {doctor.specialization}</p>
            <p>Experience: {doctor.experience}</p>
            <p>Email: {doctor.email}</p>
            <div className="mt-4">
              <AppointmentBookingForm doctorId={doctor.id} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pending Appointments Section (only visible to doctors) */}
      {pendingAppointments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Pending Appointments</h3>
          {pendingAppointments.map((appointment) => (
            <div key={appointment.id} className="border p-4 rounded mb-4">
              <p>Date: {appointment.date.toString()}</p>
              <p>User ID: {appointment.userId}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleAppointmentAction(appointment.id, "approved")}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAppointmentAction(appointment.id, "declined")}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}