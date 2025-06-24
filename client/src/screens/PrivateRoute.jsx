// screens/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Spin } from 'antd';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Spin size='large'/>; // OR add a loading spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
