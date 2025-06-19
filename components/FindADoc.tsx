import React from "react";
import Image from "next/image";

const FindADoc = () => {
  return (
    <div className="p-4">
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 flex-1">
          <div className="relative rounded-xl flex-1 min-w-[280px] max-w-[600px] h-[140px] md:h-[160px]  bg-[url('https://res.cloudinary.com/dyikkz1ur/image/upload/v1750248490/kun/Doctor_frame_g7o8bo.png')] bg-no-repeat bg-cover overflow-hidden flex items-center px-6">
            <div className="flex flex-col justify-center flex-1 max-w-[280px]">
              <h2 className="text-white text-[15px] font-semibold leading-tight mb-2">
                Find Your Perfect Doctor
              </h2>
              <p className="text-white text-[13px] font-normal leading-snug mb-6">
                Discover healthcare professionals tailored to your needs.
              </p>
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://storage.googleapis.com/a1aa/image/062e1e01-586a-4d9c-9ddd-313aa96881a0.jpg"
                    alt="Doctor 1 "
                    width={24}
                    height={24}
                  />

                  <img
                    alt="Doctor 2 profile picture, female doctor with short hair"
                    className="w-6 h-6 rounded-full border-2 border-white"
                    height="24"
                    src="https://storage.googleapis.com/a1aa/image/c341285c-3be5-4c87-5bbf-5dc60cbfa20b.jpg"
                    width="24"
                  />
                  <img
                    alt="Doctor 3 profile picture, male doctor with beard"
                    className="w-6 h-6 rounded-full border-2 border-white"
                    height="24"
                    src="https://storage.googleapis.com/a1aa/image/90bedca8-1f97-4263-cf76-6d32f16c51b4.jpg"
                    width="24"
                  />
                </div>
                <span className="text-white text-[11px] font-normal leading-none">
                  Professionals ready to work
                </span>
              </div>
            </div>
            <img
              alt="Two healthcare professionals, a male doctor with glasses and a female nurse in blue scrubs"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl max-h-[140px] md:max-h-[160px] object-cover"
              height="160"
              src="https://storage.googleapis.com/a1aa/image/57938a7e-2468-4e8f-83ec-2f332ebf59dc.jpg"
              width="160"
            />
          </div>
        </div>
      </div>








<div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 rounded-xl">



        <div className="flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-lg w-full sm:w-1/3">
          <div className="flex">
            <div className="w-[68px] h-[60px]">
              {" "}
              <img
                alt="Indoor plant in a modern bright room with white walls and wooden floor"
                className="rounded-md object-cover w-[100%] h-[100%]"
                src="https://storage.googleapis.com/a1aa/image/a3167404-d9f8-4ac9-77bc-237cde8253fa.jpg"
              />
            </div>
            <div className="pl-2">
              <h3 className="text-gray-900 font-semibold text-[14px]">Aline Carvalho</h3>
              <p className="text-gray-600 text-[12px]">Heart health</p>
            </div>
          </div>

          <div className="text-sm">
            <div className=" text-gray-400 text-xs">
            
              <p>1 km</p>
              <p className="text-gray-400 text-xs mt-1">Rua São Salvador 57, Braga </p>
            </div>
          </div>
        </div>


                <div className="flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-lg w-full sm:w-1/3">
          <div className="flex">
            <div className="w-[68px] h-[60px]">
              {" "}
              <img
                alt="Indoor plant in a modern bright room with white walls and wooden floor"
                className="rounded-md object-cover w-[100%] h-[100%]"
                src="https://storage.googleapis.com/a1aa/image/a3167404-d9f8-4ac9-77bc-237cde8253fa.jpg"
              />
            </div>
            <div className="pl-2">
              <h3 className="text-gray-900 font-semibold text-[14px]">Aline Carvalho</h3>
              <p className="text-gray-600 text-[12px]">Heart health</p>
            </div>
          </div>

          <div className="text-sm">
            <div className=" text-gray-400 text-xs">
            
              <p>1 km</p>
              <p className="text-gray-400 text-xs mt-1">Rua São Salvador 57, Braga </p>
            </div>
          </div>
        </div>


        <div className="flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-lg w-full sm:w-1/3">
          <div className="flex">
            <div className="w-[68px] h-[60px]">
              {" "}
              <img
                alt="Indoor plant in a modern bright room with white walls and wooden floor"
                className="rounded-md object-cover w-[100%] h-[100%]"
                src="https://storage.googleapis.com/a1aa/image/a3167404-d9f8-4ac9-77bc-237cde8253fa.jpg"
              />
            </div>
            <div className="pl-2">
              <h3 className="text-gray-900 font-semibold text-[14px]">Aline Carvalho</h3>
              <p className="text-gray-600 text-[12px]">Heart health</p>
            </div>
          </div>

          <div className="text-sm">
            <div className=" text-gray-400 text-xs">
            
              <p>1 km</p>
              <p className="text-gray-400 text-xs mt-1">Rua São Salvador 57, Braga </p>
            </div>
          </div>
        </div>








 </div>









    </div>
  );
};

export default FindADoc;
