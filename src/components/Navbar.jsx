import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav className='bg-indigo-950   '>
        <div className="myContainer text-white flex justify-between items-center px-4 py-5 h-16 w-full">
        <div className="logo ">
            {/* <p className='font-bold text-lg text-amber-300'>Password</p>
            <p className='text-sm '>Manager</p> */}
            <span className="text-amber-300">&lt;</span>
          <span className="">Pass</span>
          <span className="text-amber-300 ">OP / &gt;</span>
            </div>
        <ul>
            {/* <li className='flex gap-10  cursor-pointer items-center justify-between mx-150 '>
            <a className='hover:font-bold ' href="/">home</a>
            <a className='hover:font-bold ' href="#">About</a>
            <a className='hover:font-bold ' href="#">contact</a>
            </li> */}
        </ul>
        </div>
        <div className="invert  absolute top-6 right-7 text-2xl cursor-pointer ml-auto flex gap-2" >
              <FaGithub /><span className='text-sm p-1'>GitHub</span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
