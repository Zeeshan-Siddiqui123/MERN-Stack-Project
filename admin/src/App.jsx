import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import ProtectedRoute from './utils/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import React from 'react';

const App = () => {
  const isLoggedIn = localStorage.getItem('admin');
  return (
    <div className="flex">
      {isLoggedIn && <Sidebar />}
      <div className="flex-1">
        {isLoggedIn && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/products"
            element={<ProtectedRoute><Products /></ProtectedRoute>}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute><Orders /></ProtectedRoute>}
          />
          <Route
            path="/users"
            element={<ProtectedRoute><Users /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;