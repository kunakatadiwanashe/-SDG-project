// app/(pages)/admin/doctors/page.tsx

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DoctorApprovalList from "@/components/DoctorApprovalList";

export default async function AdminDoctorsPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const pendingDoctors = await prisma.doctor.findMany({
    where: { status: "pending" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Applications</h1>
      <DoctorApprovalList doctors={pendingDoctors} />
    </div>
  );
}