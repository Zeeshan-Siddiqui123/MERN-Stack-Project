import React from 'react';

const Header = () => {
  const logout = () => {
    localStorage.removeItem('admin');
    location.reload();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#1c1d22] text-white px-6 py-4 shadow-lg z-50 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Auric Admin</h1>
      <button
        onClick={logout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
