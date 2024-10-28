import { Link } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>

      <div className='fle flex-col bg-[#005EFF;] w-1/4'>
          <Link>Home</Link>
          <Link>Appointments</Link>
          <Link>Book A Doctor</Link>
          <button>LogOut</button>
      </div>

      <div className='main'>
        <div className='topNav'></div>
        <div className=''></div>
      </div>




    </div>
  )
}

export default page