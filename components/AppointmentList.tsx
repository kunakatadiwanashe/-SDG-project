"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
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
      try {
        const response = await fetch(`/api/appointments?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data.appointments || []);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Error fetching appointments");
        setLoading(false);
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <p className="text-gray-500 mb-6 text-sm">
        See your scheduled events from your calendar events links.
      </p>

      <nav className="inline-flex space-x-4 bg-gray-50 rounded-lg p-1 text-sm font-medium text-gray-600 mb-6 select-none">
        <Button  aria-current="page"  className="bg-white shadow-sm rounded-lg px-4 py-2 text-gray-900" >
          Upcoming
        </Button>
        <Button className="px-4 py-2 rounded-lg hover:text-gray-900">
          Pending
        </Button>

        <Button className="px-4 py-2 rounded-lg hover:text-gray-900">
          Recurring
        </Button>

        <Button className="px-4 py-2 rounded-lg hover:text-gray-900">
          Past
        </Button>

        <Button className="px-4 py-2 rounded-lg hover:text-gray-900">
          Cancelled
        </Button>


      </nav>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {appointments.length === 0 && !loading ? (
        <p>No upcoming appointments</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appointment) => (
            <li key={appointment.id}  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6" role="listitem">

    <div className="flex flex-row sm:flex-col items-center sm:items-start text-orange-600 font-semibold sm:mr-6 mb-4 sm:mb-0 min-w-[72px]">
      <span className="text-base font-normal sm:text-lg">Wed</span>
      <span className="text-3xl leading-none font-bold">28</span>
    </div>


    <div className="flex flex-col space-y-1 text-gray-600 text-sm min-w-[110px] sm:min-w-[140px] mr-6">
      <div className="flex items-center space-x-2">
        <i className="far fa-clock text-gray-400 text-xs"></i>
        <span>09:00 - 09:30</span>
      </div>
      <div className="flex items-center space-x-2">
        <i className="fas fa-map-marker-alt text-gray-400 text-xs"></i>
        <span>Online</span>
      </div>
    </div>

    <div className="flex-1 text-sm text-gray-900">
      30min call meeting Peer &lt;&gt; Leslie
      <div className="flex -space-x-2 mt-1">
        <img
          alt="Avatar of a woman with red hair smiling"
          className="w-6 h-6 rounded-full border-2 border-white"
          height="24"
          src="https://storage.googleapis.com/a1aa/image/02316937-3ae8-4ff3-f234-4e28c62f8528.jpg"
          width="24"
        />

      </div>
    </div>




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
