import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  toast } from 'react-toastify';


const Auth = ({header, setHeader}) => {
   const [signUp, setSignUp]  = useState(false)
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleAuth = async (e) => {
    e.preventDefault()

   
    if(!signUp){
      if (!formData.email && !formData.password) {
        return toast.error("All fields are required");
      }
      
      else {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          console.log(user);
          navigate("/");
        } catch (error) {
          if (error.code === "auth/user-not-found") {
            return toast.error("User does not exist");
          } else {
            return toast.error("An error occurred while signing in");
          }
        }
      }

    } 
    else 
    {
       if(formData.password !== formData.confirmPassword){
          return toast.error('Passwords do not match')
       }

      if (formData.firstName && formData.lastName && formData.email && formData.password){
         const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
         await updateProfile(user, {displayName: `${formData.firstName} ${formData.lastName}`})
         
         //console.log(user)
          navigate('/')
      }
      else {
        return toast.error("All fields are required")
      }

 }

}


  return (
    <div className='max-w-md mx-auto mt-8 shadow-lg p-4 rounded-md bg-blue-800/5'>
      {
        signUp ? 
        <h1 className='font-semibold text-center text-2xl'>Sign Up</h1> : 
        <h1 className='font-semibold text-center text-2xl'>Sign In</h1>
      }
    
      <form  className='mt-4' onSubmit={handleAuth}>
        {signUp && (
            <div className='flex flex-col sm:flex-row gap-4'>
             <div className="mb-4 ">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-blue-700/30"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastName"
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
          <div className='border p-2 border-gray-300 bg-white rounded-md w-full flex justify-between items-center outline-blue-700/30'>
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              id="password"
              name="password"
              value={formData.name}
              onChange={handleChange}
              className="outline-none bg-transparent"
            />

             {showPassword ? <FaEye onClick={toggleShowPassword}/> : <FaEyeSlash onClick={toggleShowPassword}/>}
             
          </div>
        </div>

       {
        signUp && (

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 bg-white">
              Confirm Password
            </label>
            <div className='border p-2 border-gray-300 rounded-md w-full flex justify-between items-center outline-blue-700/30'>
              <input
                type={`${showConfirmPassword ? 'text' : 'password'}`}
                id="confirmPassword"  
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                className="outline-none bg-transparent"
              />

              {showConfirmPassword ? <FaEye onClick={toggleShowConfirmPassword}/> : <FaEyeSlash onClick={toggleShowConfirmPassword}/>}
          </div>
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