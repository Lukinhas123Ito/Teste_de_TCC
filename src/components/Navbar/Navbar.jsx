import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi'
import { BiHome, BiUser, BiBell, BiShoppingBag } from 'react-icons/bi'

import {UserAuth} from '../../context/AuthContext'

const Navbar = () => {
  const {user, logOut} = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className='md:bg-white'>
      <div className="flex items-center justify-between md:justify-around">
        <div className='md:flex hidden p-3'>
          <Link to='/home' className='text-xl'>
            Logo
          </Link>
        </div>

      <ul className='md:flex hidden p-3 uppercase items-center gap-2 font-[Poppins]'>
        <li className='text-red-500 hover:bg-gray-100 rounded-xl'>
          <Link to='/account' className='px-7 py-3 inline-block'>
            <BiUser className='text-xl' />
          </Link>
        </li>
        <li className='text-red-500 hover:bg-gray-100 rounded-xl'>
          <Link to='/cart' className='px-7 py-3 inline-block'>
            <BiShoppingBag className='text-xl' />
          </Link>
        </li>
      </ul>
        
        {/* Mobile */}
        <ul className={`
          md:hidden fixed bottom-0 flex justify-between items-center bg-white w-full p-2 shadow
        `}>
          <li>
            <Link to='/home' className='px-7 py-3 text-red-500 text-2xl inline-block'>
              <BiHome />
            </Link>
          </li>
          <li>
            <Link to='/cart' className='px-7 py-3 text-red-500 text-2xl inline-block'>
              <BiShoppingBag />
            </Link>
          </li>
          <li>
            <Link to='/notification' className='px-7 py-3 text-red-500 text-2xl inline-block'>
              <BiBell />
            </Link>
          </li>
          <li>
            <Link to='/account' className='px-7 py-3 text-red-500 text-2xl inline-block'>
              <BiUser />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
  
}

export default Navbar