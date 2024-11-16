
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import DoctorList from "@/components/DoctorList";

export default async function DoctorsPage() {
  const session = await auth();
  
  if (!session?.user) {
    return <p>Please sign in to view doctors.</p>;
  }

  const approvedDoctors = await prisma.doctor.findMany({
    where: { status: "approved" },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Doctors</h1>
      <DoctorList doctors={approvedDoctors} />
    </div>
  );
}