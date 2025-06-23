import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../screens/CartContext';
import { routes } from '../../Routes';
import { UserContext } from '../screens/UserContext';
import axios from 'axios';
import { IoIosLogOut } from "react-icons/io";


const Header = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

 const handleLogout = async () => {
  try {
    await axios.post('http://localhost:3000/logout', {}, {
      withCredentials: true, 
    });
  } catch (err) {
    console.error('Logout failed:', err);
  }

  localStorage.removeItem('userId');
  setUser(null);
  navigate('/login');
};

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

      {/* Right Side */}
      <div className='flex gap-4 items-center relative'>
        {user ? (
          <div className='flex items-center gap-2'>
            <div className='flex flex-col text-white items-center'>
              <img
              src={user.image || '/images/default.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white object-cover"
            />
            <p>Hello, <span className='font-bold'>{user.name}</span></p>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-sm  px-3 py-1 rounded-md hover:bg-white "
            >
              <IoIosLogOut color='red' size={30}/>
            </button>
          </div>
        ) : (
          <NavLink to="/signup">
            <button className='bg-white p-2 w-25 rounded-lg hover:bg-black hover:text-white border border-white transition duration-300'>
              Sign Up
            </button>
          </NavLink>
        )}

        {/* Cart Icon */}
        <Link to='/cart' className="relative">
          <IoCartOutline color='orange' size={30} />
          {totalQuantity > 0 && (
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
