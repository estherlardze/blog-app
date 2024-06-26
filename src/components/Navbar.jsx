import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/av.png';
import { RiMenu3Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

const Navbar = ({ user, active, setActive, handleLogout }) => {
  const [menu, setMenu] = useState(false);
  const userId = user?.uid;
  console.log('userId: ' + user);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <nav className='flex justify-between items-center bg-white shadow-md p-4 px-8 fixed top-0 z-50 left-0 w-full'>
        <div className='sm:flex gap-5 hidden'>
          <Link
            to='/'
            className={`p-2 ${active === 'home' ? 'active' : ''}`}
            onClick={() => setActive('home')}
          >
            Home
          </Link>

          {userId && (
            <Link
              to='/create'
              className={`p-2 ${active === 'create' ? 'active' : ''}`}
              onClick={() => setActive('create')}
            >
              Create
            </Link>
          )}

          <Link
            to='/about'
            className={`p-2 ${active === 'about' ? 'active' : ''}`}
            onClick={() => setActive('about')}
          >
            About
          </Link>
        </div>

        <div>
          {userId ? (
            <article className='flex gap-4 items-center justify-between'>
              <div className='sm:flex gap-2 items-center hidden'>
                <img
                  src={avatar}
                  alt='profile photo'
                  className='w-[30px] h-[30px] rounded-full '
                />
                <small>{user?.displayName || user?.email}</small>
              </div>
              <p onClick={handleLogout} className='p-2 cursor-pointer'>
                Logout
              </p>
            </article>
          ) : (
            <Link
              to='/auth'
              className={`p-2 ${active === 'login' ? 'active' : ''}`}
              onClick={() => setActive('login')}
            >
              Login
            </Link>
          )}
        </div>

        <div className='block sm:hidden' onClick={handleMenu}>
          {menu ? <IoMdClose size={23} /> : <RiMenu3Fill size={23} />}
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-[50%] bg-white h-screen z-50 pl-5 sm:hidden ${
          menu ? 'slide-in' : 'slide-out'
        }`}
      >
        <article className='flex flex-col gap-5 pt-20'>
          <Link to='/' className='links p-2' onClick={handleMenu}>
            Home
          </Link>
          {userId && (
            <Link to='/create' className='links p-2' onClick={handleMenu}>
              Create
            </Link>
          )}
          <Link to='/about' className='links p-2' onClick={handleMenu}>
            About
          </Link>
          {userId && (
            <>
              <p className='links p-2'>{user?.email}</p>
              <Link onClick={handleLogout} className='active p-2'>
                Logout
              </Link>
            </>
          )}
        </article>
      </div>
    </div>
  );
};

export default Navbar;
