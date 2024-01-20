import React, { useState } from 'react'

const Auth = () => {
   const [signin, setSignIn]  = useState(false)
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

   const handleSignIn = () => {
    setSignIn(prev => !prev)
   }


   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className='max-w-md mx-auto mt-8 shadow-lg p-4 rounded-md bg-blue-800/5'>
      {
        signin ? <h1>Sign In</h1>: <h1>Sign Up</h1>
      }
    
    <form  className='mt-4'>
      <div className='flex flex-col sm:flex-row gap-4'>
      <div className="mb-4 ">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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


      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>



      
    </div>
  )
}

export default Auth