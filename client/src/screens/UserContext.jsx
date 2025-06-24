import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/api/profile/${userId}`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
