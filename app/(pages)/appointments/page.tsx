"use client"
import { useEffect, useState } from 'react';

interface Appointment {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    status: string; // e.g., 'upcoming', 'completed'
}

interface AppointmentListProps {
    userId: string;
}

export default function AppointmentList({ userId }: AppointmentListProps) {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/appointments/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data.appointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setError('Failed to load appointments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        const interval = setInterval(fetchAppointments, 30000); // Poll every 30 seconds

        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Appointments</h2>
            {loading && <p>Loading appointments...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {appointments.length === 0 && !loading ? (
                <p>No upcoming appointments</p>
            ) : (
                <ul className="space-y-2">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="p-2 border rounded">
                            <h3 className="font-semibold">{appointment.title}</h3>
                            <p>{`${appointment.date} at ${appointment.time}`}</p>
                            <p>{appointment.location}</p>
                            <p className="text-sm text-gray-500">{appointment.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}