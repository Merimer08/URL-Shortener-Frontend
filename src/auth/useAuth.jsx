import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, register as registerApi, logout as logoutApi, getAuthenticatedUser } from '../api/auth';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Usa el token del localStorage (lo inyecta apiFetch)
          const userData = await getAuthenticatedUser(); // GET /api/v1/user
          setUser(userData);
        } catch (error) {
          console.error('Session expired or invalid', error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
          navigate('/login');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token, navigate]);

  const handleAuthSuccess = async (receivedToken) => {
    // Guarda token; luego pide el usuario y navega
    localStorage.setItem('authToken', receivedToken);
    setToken(receivedToken);
    try {
      const userData = await getAuthenticatedUser();
      setUser(userData);
    } catch (e) {
      console.error('Failed to fetch user after login', e);
      // si falla, limpiamos
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      throw e;
    }
    navigate('/');
  };

  const login = async ({ email, password }) => {
    const tok = await loginApi(email, password); // devuelve token
    await handleAuthSuccess(tok);
  };

  const register = async ({ email, password }) => {
    // registerApi espera un objeto; ajusta si tu backend necesita name/password_confirmation, etc.
    await registerApi({ email, password });
    // opcional: auto-login tras registro:
    const tok = await loginApi(email, password);
    await handleAuthSuccess(tok);
  };

  const logout = async () => {
    try {
      // Si tu backend tiene /api/logout, puedes llamarlo; si no, basta con limpiar local
      if (typeof logoutApi === 'function') {
        await logoutApi();
      }
    } catch (error) {
      console.error('Logout failed:', error);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
