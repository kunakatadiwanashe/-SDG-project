"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";

const Login = () => {
  // const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [id]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  const validateInput = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (userData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (userData.password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
        const response = await axios.post('/api/users', { action: 'login', ...userData });
        if (response.data.success) {
          toast.success(response.data.message);
          console.log({ userData });
        } else {
          toast.error(response.data.message);
        }
        console.log(response);
      } catch(err) {
        toast.error("Something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-wrap justify-center">

      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Login
      </h2>

      <form className="space-y-4 w-full" onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Email Address
          <input
            type="email"
            id="email"
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label className="block mb-2 text-sm font-medium text-gray-600">
          Password
          <input
            type="password"
            id="password"
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <button  type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"  >
            Login
        </button>
       </form>
       </div>
  );
};


export default Login;