"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    } catch {
      // localStorage unavailable (e.g. Safari private mode)
    }
  }, []);

  function signIn() {
    try {
      localStorage.setItem("auth", "true");
    } catch {
      // localStorage unavailable — auth still works in-memory for this session
    }
    setIsAuthenticated(true);
  }

  function signOut() {
    try {
      localStorage.removeItem("auth");
    } catch {
      // localStorage unavailable
    }
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
