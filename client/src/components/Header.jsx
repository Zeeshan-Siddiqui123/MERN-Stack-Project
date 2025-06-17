import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../Routes'
import { IoCartOutline, IoSearch } from "react-icons/io5";

const Header = () => {
    return (
        <div>
            <div className='flex items-center justify-around h-[100px] bg-[#1c1d22]'>
                <div className='flex items-center text-sm justify-center gap-7 mr-16'>
                    {routes.map(({ path, label }, index) => (
                        <NavLink key={index} to={path} className={({ isActive }) =>
                            isActive ? 'text-[#795b50]   nav-link' : 'text-white  nav-link '
                        }>
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div>
                    <img src="../public/images/logo.png" alt="" className='w-[140px]'/>
                </div>
                <div className='flex gap-4 items-center'>
                    <IoSearch color='white' size={30}/>
                    <NavLink to='/create-account' className={({ isActive }) =>
                        isActive ? 'text-amber-900   nav-link' : 'text-black  nav-link '
                    }>
                        <button className='bg-white p-2 w-25 rounded-lg   hover:bg-black hover:text-white border border-white cursor-pointer transition duration-300'>Sign Up</button>
                    </NavLink>
                    <IoCartOutline color='white' size={30} className='hover:text-amber-900'/>
                </div>
            </div>
        </div>
    )
}

export default Header
