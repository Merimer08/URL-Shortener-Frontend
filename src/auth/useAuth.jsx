import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi, register as registerApi, logout as logoutApi, getAuthenticatedUser } from "../api/auth";
import { getToken, setToken } from "../api/client";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    if (!getToken()) { setUser(null); setIsLoading(false); return; }
    try {
      const u = await getAuthenticatedUser();
      setUser(u);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = useCallback(async ({ email, password }) => {
    const u = await loginApi(email, password); // recibe {token,user} en auth.js y guarda token
    setUser(u);
  }, []);

  const register = useCallback(async ({ name, email, password, password_confirmation }) => {
    await registerApi({ name, email, password, password_confirmation });
    const u = await loginApi(email, password);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(() => ({ user, isLoading, login, register, logout, fetchUser }), [user, isLoading, login, register, logout, fetchUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
