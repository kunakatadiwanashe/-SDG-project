"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface AppointmentShortListProps {
  userId: string;
}

export default function AppointmentShortList({ userId }: AppointmentShortListProps) {



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
    <div className="max-w-full mx-auto  ">




      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {appointments.length === 0 && !loading ? (
        <p>No upcoming appointments</p>
      ) : (
        <ul className="space-y-2 pl-2 pr-2">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-[19vw]"
              role="listitem"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-start text-orange-600 font-semibold sm:mr-6 mb-4 sm:mb-0 min-w-[20px]">
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
                      <span className="text-base font-normal sm:text-sm">
                        {dayName}
                      </span>
                      <span className="text-xl leading-none font-bold">
                        {dayNum}
                      </span>
                      <span className="text-xs font-normal sm:text-sm">
                        {monthName}
                      </span>
                    </>
                  );
                })()}
              </div>

              <div className="flex flex-col text-gray-600 text-sm">
                <div className="flex items-center ">
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
