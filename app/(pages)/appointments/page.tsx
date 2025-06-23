"use client"
import { useSession } from "next-auth/react";
import AppointmentList from "@/components/AppointmentList";

export default function AppointmentsPage() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.id) return <p>Please sign in to view appointments.</p>;

    return  <>
    
          <div className="h-[24vh] bg-[url('https://res.cloudinary.com/dyikkz1ur/image/upload/v1750248490/kun/Doctor_frame_g7o8bo.png')] bg-no-repeat rounded-lg p-6 mb-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-white">Appointments</h2>
            <p className="mb-6 text-sm text-white">
              See your scheduled events from your calendar events links.
            </p>
      </div>
      
      <AppointmentList userId={session.user.id} />;
      
      </>
    
    
}