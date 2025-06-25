import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { routes } from '../../Routes';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Top mobile nav (only visible on small devices) */}
      <div className="fixed top-7 left-0 w-full z-50  md:hidden px-4 py-3 flex items-center justify-between shadow-lg">
        <button onClick={toggleMenu} className="text-white">
          <FaBars size={22} />
        </button>
      </div>

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-xs bg-[#1f1f1f] z-50 transition-transform duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg border-r border-gray-700`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-600">
            <img src="/images/logo.png" alt="Logo" className="w-[90px]" />
            <button onClick={closeMenu} className="text-white">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-5 py-6 space-y-4 overflow-y-auto">
            {routes.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block text-lg font-medium rounded-md px-3 py-2 ${
                    isActive
                      ? 'bg-[#f49521] text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } transition`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
