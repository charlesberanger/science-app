"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CurrentUser {
  name: string;
  initials: string;
  role: string;
}

// Placeholder — replace with real user data once auth backend is connected
const MOCK_USER: CurrentUser = {
  name: "Alice S.",
  initials: "AS",
  role: "Researcher",
};

interface AuthContextValue {
  isAuthenticated: boolean;
  currentUser: CurrentUser;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  currentUser: MOCK_USER,
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
    <AuthContext.Provider value={{ isAuthenticated, currentUser: MOCK_USER, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
