import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {


  return (
    <div className='flex justify-between items-center bg-black/5 shadow-md p-4 px-8 fixed top-0 left-0 w-full'>
        <div className='flex gap-5'>
          <Link to='/' className='links p-2'>Home</Link>
          <Link to='/create' className='links p-2'>Create</Link>
          <Link to='/about' className='links p-2'>About</Link>
        </div>

        <div>
          <Link to='/auth' className='links p-2'>Login</Link>
        </div>
    </div>
  )
}

export default Navbar