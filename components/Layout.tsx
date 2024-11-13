"use client"
import Link from "next/link"
import React from "react"
import { handleSignOut } from '@/app/actions/authActions';
import { Button } from "./ui/button";

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='sidebar w-full md:w-1/4 bg-[#005EFF] h-[100vh] text-white font-bold capitalize p-4'>
        <div className="menu flex flex-col space-y-4">
          <Link href="/" className='hover:underline'>Home</Link>
          <Link href="/appointments" className='hover:underline'>Appointments</Link>
          <Link href="/bookDoctor" className='hover:underline'>Book Doctor</Link>
          <Link href="/profile" className='hover:underline'>Profile</Link>

          <form action={handleSignOut}>
            <Button variant="default" type="submit" className='mt-4'>
              Sign Out
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