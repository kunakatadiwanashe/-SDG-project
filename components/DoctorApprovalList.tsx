// components/DoctorApprovalList.tsx

"use client";

import { useState } from "react";
import { Doctor } from "@prisma/client";

interface DoctorApprovalListProps {
  doctors: Doctor[];
}

export default function DoctorApprovalList({ doctors }: DoctorApprovalListProps) {
  const [pendingDoctors, setPendingDoctors] = useState(doctors);

  const handleApproval = async (doctorId: string, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
      });

      if (response.ok) {
        setPendingDoctors(pendingDoctors.filter(doctor => doctor.id !== doctorId));
      } else {
        console.error("Failed to update doctor status");
      }
    } catch (error) {
      console.error("Error updating doctor status:", error);
    }
  };

  return (
    <div>
      {pendingDoctors.map((doctor) => (
        <div key={doctor.id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-semibold">{doctor.name} {doctor.lastName}</h2>
          <p>Specialization: {doctor.specialization}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Email: {doctor.email}</p>
          <div className="mt-2">
            <button
              onClick={() => handleApproval(doctor.id, "approve")}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleApproval(doctor.id, "reject")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}