import React from "react";

const AppointmentListMain = () => {
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
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-[11px] text-gray-700 font-semibold max-w-[160px] border border-gray-200 rounded-md px-3 py-1 select-none">
          <span>June 2023</span>
          <button
            aria-label="Previous month"
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            aria-label="Next month"
            className="text-gray-700 hover:text-gray-900"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <button
            aria-label="Toggle dropdown"
            className="ml-auto text-gray-700 hover:text-gray-900"
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
      </div>

      {/* <!-- Appointment 1 --> */}

      <div className="flex items-center bg-[#FFE6E6] rounded-lg p-3 mb-3 cursor-pointer">
        <div className="flex flex-col items-center justify-center bg-[#FFD9D9] rounded-lg w-12 h-12 flex-shrink-0 mr-3">
          <span className="text-[11px] font-semibold text-[#B33A3A]">Fri</span>
          <span className="text-[15px] font-bold text-[#B33A3A] leading-none">
            14
          </span>
        </div>
        <div className="flex-1 text-[12px]">
          <p className="font-semibold text-gray-900 leading-tight">
            Dr. Ashton Cleve
          </p>
          <p className="text-gray-400 leading-tight">10:00am - 10:30am</p>
        </div>
        <i className="fas fa-chevron-right text-gray-400"></i>
      </div>
      {/* <!-- Appointment 2 --> */}

      <div className="flex items-center rounded-lg p-3 mb-3 cursor-pointer">
        <div className="flex flex-col items-center justify-center bg-[#E6F0D9] rounded-lg w-12 h-12 flex-shrink-0 mr-3">
          <span className="text-[11px] font-semibold text-[#4B6B1A]">Sat</span>
          <span className="text-[15px] font-bold text-[#4B6B1A] leading-none">
            15
          </span>
        </div>
        <div className="flex-1 text-[12px]">
          <p className="font-semibold text-gray-900 leading-tight">
            Dr. Ashton Cleve
          </p>
          <p className="text-gray-400 leading-tight">10:00am - 10:30am</p>
        </div>
        <i className="fas fa-chevron-right text-gray-400"></i>
      </div>


      <div className="flex items-center rounded-lg p-3 mb-3 cursor-pointer">
        <div className="flex flex-col items-center justify-center bg-[#E6F0D9] rounded-lg w-12 h-12 flex-shrink-0 mr-3">
          <span className="text-[11px] font-semibold text-[#4B6B1A]">Sat</span>
          <span className="text-[15px] font-bold text-[#4B6B1A] leading-none">
            16
          </span>
        </div>
        <div className="flex-1 text-[12px]">
          <p className="font-semibold text-gray-900 leading-tight">
            Dr. Ashton Cleve
          </p>
          <p className="text-gray-400 leading-tight">10:00am - 10:30am</p>
        </div>
        <i className="fas fa-chevron-right text-gray-400"></i>
      </div>














    </div>
  );
};

export default AppointmentListMain;
