"use client";

import React from "react";
import AppointmentShortList from "./AppointmentShortList";
import { useSession } from "next-auth/react";


const AppointmentListMain = () => {
      const { data: session, status } = useSession();
  
      if (status === "loading") return <p>Loading...</p>;
      if (!session?.user?.id) return <p>Please sign in to view appointments.</p>;

      
  return (
    <div className="p-5 max-w-[360px] w-full bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[15px] text-gray-900">
          Upcoming Appointments
        </h3>
        <a
          className="text-[11px] font-semibold text-[#00B14F] hover:underline flex items-center space-x-1 pl-6"
          href="#"
        >
          <span>View All</span>
          <i className="fas fa-chevron-right text-[10px]"></i>
        </a>
      </div>


    

      <div className="flex items-center bg-[#FFE6E6] rounded-lg pt-2 pb-2 mb-3 cursor-pointer">
  
           <AppointmentShortList userId={session.user.id} />
      </div>












    </div>
  );
};

export default AppointmentListMain;
