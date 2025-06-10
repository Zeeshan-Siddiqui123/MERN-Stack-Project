import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../Routes';


const Header = () => {


    return (
        <div>
            <div className='flex items-center justify-around w-[full] h-[80px] bg-gray-900'>
                <div className='ml-16'>
                    <img src="../public/images/logo.png" alt="" className='w-[100px]'/>
                </div>
                <div className='flex items-center text-sm justify-center gap-7 mr-16'>
                    {routes.map(({ path, label }, index) => (
                        <NavLink key={index} to={path} className={({ isActive }) =>
                            isActive ? 'text-[#b7b9bb]   nav-link' : 'text-white  nav-link '
                        }>
                            {label}
                        </NavLink>
                    ))}
                </div>
                <NavLink to='/create-account' className={({ isActive }) =>
                    isActive ? 'text-[#5d5d5e]   nav-link' : 'text-black  nav-link '
                }>
                    <button className='bg-white p-2 w-25 rounded-lg cursor-pointer'>Sign Up</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Header;