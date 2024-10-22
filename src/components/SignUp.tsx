"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'



const SignUp = () => {


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

// const  navigate = useNavigate();
// const location = useLocation();

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/api/users', {name, email , password})
        if (response.data.success) {
            toast.success(response.data.message);
            console.log({ name, email ,password});
        } else{
            toast.error(response.data.message);
        }
        console.log(response)
    } catch(err) {
        toast.error("something went wrong")
        console.log(err)
    }
}


  return (
    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-wrap justify-center'>
    
    <h2 className="text-2xl font-semibold text-center mb-6 mr-5 text-black">
          Register
        </h2>
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        sign
          {/* <Link href="/signIn">SignIn</Link> */}
        </h2>


       <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Full Name
            <input
              type="text"
              id="user_name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md   focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </label>

          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email Address
            <input
              type="email"
              id="user_email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </label>

          <label
            className="block mb-2 text-sm
                                          font-medium text-gray-600"
          >
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="user_password"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md   focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </label>





            <button   type="submit"    className="w-full px-4 py-2 text-white  bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"  >
              Register
            </button>
       
       



        </form>










    </div>
  )
}

export default SignUp
