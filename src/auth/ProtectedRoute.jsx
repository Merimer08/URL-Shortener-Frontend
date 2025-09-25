// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-center p-4">Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
