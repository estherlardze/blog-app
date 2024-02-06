import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/av.png'
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";


const Navbar = ({user, setUser, handleLogout}) => {

  const [menu, setMenu] = useState(false)
  const userId = user?.uid
  //console.log("userId: " + user)

const handleMenu = () => {
  setMenu(!menu)
}

  return (
    <div>
    <nav className='flex justify-between items-center bg-black/5 shadow-md p-4 px-8 fixed top-0 left-0 w-full'>
        <div className='sm:flex gap-5 hidden'>
          <Link to='/' className='links p-2'>Home</Link>
          <Link to='/create' className='links p-2'>Create</Link>
          <Link to='/about' className='links p-2'>About</Link>
        </div>

        <div>
          {userId ?
           (
              <article className='flex gap-4 items-center justify-between'>
                <div className='sm:flex gap-2 items-center hidden'>
                  <img 
                     src={avatar} 
                     alt="profile photo" 
                     className='w-[30px] h-[30px] rounded-full '
                  />
                  <small>{user?.email}</small>
                </div>
                 <p  onClick={handleLogout} className='links p-2'>
                   Logout
                  </p>
              </article>
            )
             :         
             (
              <>
                <Link to='/auth' className='links p-2'>
                  Login
                </Link>

              </>
              )  
            }
        </div>

       <div className='block sm:hidden' onClick={handleMenu}>
        {menu ? <IoMdClose size={23}/> : <RiMenu3Fill size={23}/>}
       </div>
    </nav>
     
     {
      menu && (

        <div className='fixed top-0 left-0 w-[50%] bg-white h-screen z-50 gap-5 sm:hidden'>
         <article className='flex flex-col gap-5'>
          <Link to='/' className='links p-2'>Home</Link>
          <Link to='/create' className='links p-2'>Create</Link>
          <Link to='/about' className='links p-2'>About</Link>
          <p className='links p-2'>{user?.email}</p>
         </article>
      </div>
      )
     }

    </div>
  )
}

export default Navbar