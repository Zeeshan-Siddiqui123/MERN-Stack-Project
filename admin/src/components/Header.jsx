import React from 'react';

const Header = () => {
  const logout = () => {
    localStorage.removeItem('admin');
    location.reload();
  };
  return (
    <div className="w-full fixed  top-0 flex justify-between items-center p-4 shadow-md bg-white">
      <h2 className="text-lg font-bold ml-60">Welcome, Admin</h2>
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
};
export default Header;