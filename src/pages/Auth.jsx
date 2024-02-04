import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {auth} from '../firebase'

const Auth = ({header, setHeader}) => {
   const [signUp, setSignUp]  = useState(false)
   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  return (
    <div className='max-w-md mx-auto mt-8 shadow-lg p-4 rounded-md bg-blue-800/5'>
      {
        signUp ? 
        <h1 className='font-semibold text-center text-2xl'>Sign Up</h1> : 
        <h1 className='font-semibold text-center text-2xl'>Sign In</h1>
      }
    
      <form  className='mt-4'>
        {signUp && (
            <div className='flex flex-col sm:flex-row gap-4'>
            <div className="mb-4 ">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 ">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
          />
        </div>

       {
        signUp && (
          <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Comfirm Password
          </label>
          <input
            type="password"
            id="comfirmPassword"
            name="comfirmPassword"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
          />
        </div>
        )
       }


        <div className="mt-4 flex justify-center items-center">
          {
           signUp ? (
            <button
               type="submit"
               className="bg-[#3232ad] text-white p-2 rounded-md hover:bg-blue-600 w-[100%]"
            >
             Sign Up
           </button>
          ) 
          :
          (
            <button
            type="submit"
            className="bg-[#3232ad] text-white p-2 rounded-md hover:bg-blue-600 w-[100%]"
          >
            Login
          </button>
          ) }
          
        </div>

        <div className='mt-4'>
          {signUp ? 
          (
           <div className='text-sm flex gap-1 items-center justify-center'>
             <p>Already have an account ?</p> 
             <Link to='/auth' onClick={() => setSignUp(false)} className='underline text-[#3232ad] font-bold'>
                Sign In
              </Link>
           </div>
          ) 
          : 
          (
            <div className='text-sm flex gap-1 items-center justify-center'>
             <p>Don't have an account ? </p>  {' '}
             <Link to='/auth' onClick={() => setSignUp(true)} className='underline text-[#3232ad] font-bold'>
                Sign Up
              </Link>
           </div>
          )}
        </div>
      </form>
      
    </div>
  )
}

export default Auth