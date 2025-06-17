"use client"
import { useSession } from "next-auth/react";
import AppointmentList from "@/components/AppointmentList";

export default function AppointmentsPage() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session?.user?.id) return <p>Please sign in to view appointments.</p>;

    return <AppointmentList userId={session.user.id} />;
}