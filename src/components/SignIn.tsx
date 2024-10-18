import React from 'react'

const SignIn = () => {
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
            Email Address
            <input
              type="email"
              id="user_email"
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
              id="user_password"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md   focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </label>





            <button   type="submit"    className="w-full px-4 py-2 text-white  bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"  >
                SignIn
            </button>

        </form>


    </div>
  )
}

export default SignIn
