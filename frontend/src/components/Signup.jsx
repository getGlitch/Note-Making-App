// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
 const [signUpDetails, setSignUpDetails] = useState({
    username:"",
    email:"",
    password:""
 })
 const navigate = useNavigate();
 const handleChange=(e)=>{
    const {name, value} = e.target;
    setSignUpDetails({...signUpDetails,[name]:value});
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {username, email, password} = signUpDetails;
    if(!username || !email || !password){
       return  toast.error("All field are required...")
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
    
            },
            body:JSON.stringify(signUpDetails)
        })
        const data = await response.json();
        const {message, success, error} = data;
        if(success){
            toast.success(message);
            setTimeout(()=>{
    
                navigate("/login");
            },1000)
    
        }else if(error){
            toast.error(error.details[0].message);
        }else if(!success){
            toast.error(message)
        }
    } catch (error) {
        console.log(error);
    }
    
   
 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Sign Up</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={signUpDetails.username}
              onChange={handleChange}
              //required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signUpDetails.email}
              onChange={handleChange}
              //required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signUpDetails.password}
              onChange={handleChange}
              //required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
