// components/DoctorList.tsx

import { Doctor } from "@prisma/client";
import AppointmentBookingForm from "./AppointmentBookingForm";

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
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
  );
}