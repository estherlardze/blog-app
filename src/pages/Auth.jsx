import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  toast } from 'react-toastify';


const Auth = ({ setActive}) => {
   const [signUp, setSignUp]  = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

const navigate = useNavigate()

const {firstName, lastName, email, password, confirmPassword} = formData

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
      if (!email && !password) {
        return toast.error("All fields are required");
      }
      
      else {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          setActive("home")
          console.log('user', user);
          navigate('/')
          
        } catch (error) {
            return toast.error(error.code);   
        }
      }

    } 
    else 
    {
       if(password !== confirmPassword){
          return toast.error('Passwords do not match')
       }

      if (firstName && lastName && email && password){
         const { user } = await createUserWithEmailAndPassword(auth, email, password)
         await updateProfile(user, {displayName: `${firstName} ${lastName}`})
         setActive("home")
         console.log(user)
         navigate('/')
         
      }
      else {
        return toast.error("All fields are required")
      }

 }

}


  return (
    <div className='max-w-md mx-auto mt-8  p-4 rounded-md'>
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
                value={firstName}
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
                value={lastName}
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
            value={email}
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
              value={password}
              onChange={handleChange}
              className="outline-none bg-transparent"
            />

             {showPassword ? <FaEye onClick={toggleShowPassword}/> : <FaEyeSlash onClick={toggleShowPassword}/>}
             
          </div>
        </div>

       {
        signUp && (

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className='border p-2 border-gray-300 rounded-md w-full flex bg-white justify-between items-center outline-blue-700/30'>
              <input
                type={`${showConfirmPassword ? 'text' : 'password'}`}
                id="confirmPassword"  
                name="confirmPassword" 
                value={confirmPassword} 
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
               className="bg-[#3232ad] text-white p-2 rounded-md w-[100%]"
            >
             Sign Up
           </button>
          ) 
          :
          (
            <button
            type="submit"
            className="bg-[#3232ad] text-white p-2 rounded-md w-[100%]"
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