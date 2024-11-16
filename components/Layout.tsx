"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image";
import { handleSignOut } from '@/app/actions/authActions';
import { Button } from "./ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarCheck, faUser , faStethoscope, faPills, faClipboardList, faUsers, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import  logo from '../app/assets/logo.png'

const Layout = ({ children, user }) => {
  const userRole = user?.role;

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='sidebar w-full md:w-1/4 bg-[#005EFF] h-[100vh] text-white font-bold capitalize p-4'>

        <div className="menu flex flex-col space-y-4 ">

          <div>
           <Image src={logo} alt="alt" width={200} height={300} />
          </div>

          <Link href="/" className='flex items-center hover:underline'>
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
          </Link>
          <Link href="/appointments" className='flex items-center hover:underline'>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> Appointments
          </Link>
          <Link href="/profile" className='flex items-center hover:underline'>
            <FontAwesomeIcon icon={faUser } className="mr-2" /> Help People in Need
          </Link>

          {userRole === 'doctor' && (
            <>
              <Link href="/managePatients" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faStethoscope} className="mr-2" /> Manage Patients
              </Link>
              <Link href="/prescriptions" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faPills} className="mr-2" /> Prescriptions
              </Link>
            </>
          )}
          {userRole === 'user' && (
            <>
              <Link href="/doctors" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Book Doctor
              </Link>
              <Link href="/pharmacy" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faPills} className="mr-2" /> Go To Pharmacy
              </Link>
              <Link href="/viewPrescriptions" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> View Prescriptions
              </Link>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Link href="/admin/doctors" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Manage Users
              </Link>
              <Link href="/reports" className='flex items-center hover:underline'>
                <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Reports
              </Link>
            </>
          )}

          <form action={handleSignOut}>
            <Button variant="default" type="submit" className='mt-4 flex items-center'>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
            </Button>
          </form>
        </div>
      </div>

      <div className='content flex-1 p-4'>
        <div className='header h-12 bg-gray-200 flex items-center justify-center'>
          Profile
        </div>

        <div className='body border mt-4 p-4 flex-1'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;