"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaCheckCircle } from "react-icons/fa";

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
    <div className="max-w-4xl mx-auto ">
      <div className="h-[24vh] bg-gradient-to-r from-[#005EFF] to-[#005eff7c] rounded-lg p-6 mb-6 w-full">
            <h2 className="text-xl font-bold mb-4 text-white">Appointments</h2>
            <p className="mb-6 text-sm text-white">
              See your scheduled events from your calendar events links.
            </p>
      </div>

      <nav className="inline-flex space-x-4 bg-gray-50 rounded-lg p-1 text-sm font-medium text-gray-600 mb-6 select-none">
        <Button
          aria-current="page"
          className="bg-white shadow-sm rounded-lg px-4 py-2 text-gray-900"
        >
          Upcoming
        </Button>
        <Button className="px-4 py-2 rounded-lg hover:text-gray-900">
          Pending
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
            <li
              key={appointment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6"
              role="listitem"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-start text-orange-600 font-semibold sm:mr-6 mb-4 sm:mb-0 min-w-[72px]">
                {(() => {
                  const dateObj = new Date(appointment.date);
                  const days = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ];
                  const months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  const dayName = days[dateObj.getDay()];
                  const dayNum = dateObj.getDate();
                  const monthName = months[dateObj.getMonth()];
                  // Format time as HH:MM AM/PM
                  let hours = dateObj.getHours();
                  const minutes = dateObj
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12 || 12;
                  const timeStr = `${hours}:${minutes} ${ampm}`;
                  return (
                    <>
                      <span className="text-base font-normal sm:text-lg">
                        {dayName}
                      </span>
                      <span className="text-3xl leading-none font-bold">
                        {dayNum}
                      </span>
                      <span className="text-xs font-normal sm:text-sm">
                        {monthName}
                      </span>
                    </>
                  );
                })()}
              </div>

              <div className="flex flex-col space-y-1 text-gray-600 text-sm min-w-[110px] sm:min-w-[140px] mr-6">
                <div className="flex items-center space-x-2">
                  <i className="far fa-clock text-gray-400 text-xs"></i>
                  {(() => {
                    const dateObj = new Date(appointment.date);
                    let hours = dateObj.getHours();
                    const minutes = dateObj
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    const ampm = hours >= 12 ? "PM" : "AM";
                    hours = hours % 12 || 12;
                    const timeStr = `${hours}:${minutes} ${ampm}`;
                    return <>{timeStr}</>;
                  })()}
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-gray-400 text-xs"></i>
                  <span>Online</span>
                  <p>{appointment.location}</p>
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

              

              <span className={`flex items-center ${appointment.status === "approved" ? "text-green-600" : ""}`}  >
                {appointment.status === "approved" && (
                  <FaCheckCircle style={{ marginRight: 4 }} />
                )}
                {appointment.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
