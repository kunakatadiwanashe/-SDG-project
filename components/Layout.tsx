"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { handleSignOut } from "@/app/actions/authActions";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faUser,
  faStethoscope,
  faPills,
  faClipboardList,
  faUsers,
  faChartLine,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../app/assets/logo.png";
import DateTimeDisplay from "./DateTimeDisplay";

interface LayoutProps {
  children: React.ReactNode;
  user?: { role?: string; name?: string };
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const userRole = user?.role;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="sidebar w-full md:w-1/4 bg-[#005EfF] h-[100vh] text-white font-bold capitalize p-4">
        <div className="menu flex flex-col space-y-8 pl-16 ">
          <div>
            <Image src={logo} alt="alt" width={200} height={300} />
          </div>

          <Link href="/" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
          </Link>
          <Link
            href="/appointments"
            className="flex items-center hover:underline"
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />{" "}
            Appointments
          </Link>
          <Link href="/helpList" className="flex items-center hover:underline">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Help People in
            Need
          </Link>

          {userRole === "doctor" && (
            <>
              <Link
                href="/managePatients"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faStethoscope} className="mr-2" /> Manage
                Patients
              </Link>
              <Link
                href="/prescriptions"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faPills} className="mr-2" />{" "}
                Prescriptions
              </Link>
            </>
          )}
          {userRole === "user" && (
            <>
              <Link
                href="/doctors"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Book
                Doctor
              </Link>
              <Link
                href="/pharmacy"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faPills} className="mr-2" /> Go To
                Pharmacy
              </Link>
              <Link
                href="/viewPrescriptions"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> View
                Prescriptions
              </Link>
            </>
          )}
          {userRole === "admin" && (
            <>
              <Link
                href="/admin/doctors"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Manage Users
              </Link>
              <Link
                href="/reports"
                className="flex items-center hover:underline"
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Reports
              </Link>
            </>
          )}

          <form action={handleSignOut}>
            <Button
              variant="default"
              type="submit"
              className="mt-4 flex items-center"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
            </Button>
          </form>
        </div>
      </div>
















      <div className="content flex-1 p-4">
        <header className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div>
            <p className="text-xs font-semibold">
              hi, {user?.name ? user.name : "Guest"}
              {user?.role && (
              <span className="ml-2 text-gray-300">
                ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
              </span>
              )}
              !
            </p>
            
            <h3 className="font-extrabold text-lg leading-none">
              Welcome Back
            </h3>
          </div>
          <div className="flex-1 max-w-lg mx-6">
            <div className="flex items-center bg-gray-300 rounded-xl px-4 ">
              <input
                className="bg-transparent flex-grow text-sm placeholder-gray-600 focus:outline-none "
                placeholder="Find Doctors,Pharmacy,Tutorials"
                type="text"
              />
              <Button aria-label="Search">
                <i className="fas fa-search text-black text-sm"></i>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <img
              alt="Profile picture of a person wearing a blue suit and white shirt"
              className="w-8 h-8 rounded-full object-cover"
              height="32"
              src="https://storage.googleapis.com/a1aa/image/7a84bd8a-2666-417a-6f63-1cb5b718085d.jpg"
              width="32"
            />
            <div className="text-xs leading-tight">
              <p className="flex items-center space-x-1 font-semibold">
                <span className="text-black capitalize">{user?.name ? user.name : "Guest"}</span>
                <i className="fas fa-bell text-xs text-black"></i>
              </p>
              <p className="text-gray-600"><DateTimeDisplay /></p>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
