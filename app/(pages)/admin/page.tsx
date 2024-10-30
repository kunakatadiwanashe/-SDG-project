import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DoctorApprovalList from "@/components/DoctorApprovalList";

export default async function Page() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }
  const pendingDoctors = await prisma.doctor.findMany({
    where: { status: "pending" },
  });
  
  if (session?.user?.role === "admin") {
    return (
      <div className="flex">
        <div className="DocList w-1/5 bg-blue-500 h-[100vh] text-white p-10 flex flex-col justify-items-start">

          <Link href="/admin/doctors" className="text-2xl font-bold">Doctors Approval</Link>

          <Link href="/admin/doctors" className="text-2xl font-bold">Pharmacy Approval</Link>

          <form action={handleSignOut}>
                    <Button variant="default" type="submit" className="text-2xl font-black">
                        Sign Out
                    </Button>
                </form>
        </div>


        <div className="">
        
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Applications</h1>
      <DoctorApprovalList doctors={pendingDoctors} />
    </div>



        </div>


      </div>
    );
  }

  return <p>You are not authorized to view this page!</p>;
}
