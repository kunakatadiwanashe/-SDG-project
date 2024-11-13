import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import DoctorList from "@/components/DoctorList";
import NotificationList from "@/components/NotificationList";

export default async function DoctorsPage() {
  const session = await auth();
  
  if (!session?.user) {
    return <p>Please sign in to view this page.</p>;
  }

  const approvedDoctors = await prisma.doctor.findMany({
    where: { status: "approved" },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-20 mt-10 text-blue-500">Volunteer Doctors </h1>
      <DoctorList doctors={approvedDoctors} />
    </div>
  );
}