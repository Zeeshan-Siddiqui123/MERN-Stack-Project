import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { routes } from '../../Routes';
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { CartContext } from '../screens/CartContext'; // Adjust path if needed

const Header = () => {
  const { cart } = useContext(CartContext);

  // Get total quantity
  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className='fixed w-full z-50 top-0 flex items-center justify-around h-[100px] bg-[#1c1d22]'>
      {/* Navigation Links */}
      <div className='flex items-center text-sm justify-center gap-7 mr-16'>
        {routes.map(({ path, label }, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              isActive ? 'text-[#795b50] nav-link' : 'text-white nav-link'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Logo */}
      <div>
        <img src="/images/logo.png" alt="Logo" className='w-[140px]' />
      </div>

      {/* Right Icons */}
      <div className='flex gap-4 items-center relative'>
        <IoSearch color='white' size={30} />

        <NavLink
          to='/create-account'
          className={({ isActive }) =>
            isActive ? 'text-amber-900 nav-link' : 'text-black nav-link'
          }
        >
          <button className='bg-white p-2 w-25 rounded-lg hover:bg-black hover:text-white border border-white transition duration-300'>
            Sign Up
          </button>
        </NavLink>

        {/* Cart Icon with Badge */}
        <Link to='/cart' className="relative">
          <IoCartOutline color='white' size={30} />
          {totalQuantity >= 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
