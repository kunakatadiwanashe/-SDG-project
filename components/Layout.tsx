"use client"
import Link from "next/link"
import React from "react"
// import { Link, useLocation } from 'react-router-dom'



const Layout = ({children}) => {

  const userMenu = [
    {
      name: "home",
      path: "/",

    },
    {
      name: "appointments",
      path: "/appointments",

    },
    {
      name: "apply doc",
      path: "/applydoc",

    },
  ];

  const adminMenu = [
    {
      name: "home",
      path: "/",

    },
    {
      name: "appointments",
      path: "/appointments",

    },
    {
      name: "apply to be a doc",
      path: "/applyToBeDoc",

    },
  ];





  return (
    <div className='main flex'>
        <div className='sidebar w-1/4 bg-[#005EFF] h-[100vh] text-white font-bold capitalize'>
          <div className="menu flex flex-col">
          <Link href="/">home</Link>
          <Link href="/appointments">Appointments</Link>
          <Link href="/bookDoctor">Book Doctor</Link>
          <Link href="/profile">Pro</Link>
          <button>LogOut</button>
          </div>
        </div>

        <div className='content'>
            <div className='header  h-12'>
                prof
            </div>

            <div className='body border w-[50vw] h-[50vh]'>
                {children}
            </div>

        </div>

    </div>
  )
}

export default Layout