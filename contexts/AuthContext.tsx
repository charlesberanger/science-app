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
    setIsAuthenticated(localStorage.getItem("auth") === "true");
  }, []);

  function signIn() {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  }

  function signOut() {
    localStorage.removeItem("auth");
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
