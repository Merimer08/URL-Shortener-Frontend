import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const { user: fetchedUser } = await authApi.getAuthenticatedUser();
          setUser(fetchedUser);
        } catch (error) {
          console.error('Session expired or invalid', error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token, navigate]);

  const handleAuthSuccess = (data) => {
    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    setUser(data.user);
    navigate('/');
  };

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    handleAuthSuccess(data);
  };

  const register = async (userData) => {
    const data = await authApi.register(userData);
    handleAuthSuccess(data);
  };

  const logout = async () => {
    try {
        if(token) await authApi.logout();
    } catch(error) {
        console.error("Logout failed:", error);
    } finally {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        navigate('/login');
    }
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    register,
    logout,
    isLoading
  }), [user, token, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};