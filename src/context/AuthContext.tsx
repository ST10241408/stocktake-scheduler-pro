
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "../types";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  companyId: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - replace with your actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll set a mock user based on email
      if (email.includes("admin")) {
        setUser({
          id: "1",
          firstName: "Admin",
          lastName: "User",
          email,
          role: "admin" as UserRole,
          companyId: "1",
        });
      } else if (email.includes("coordinator")) {
        setUser({
          id: "2",
          firstName: "Coordinator",
          lastName: "User",
          email,
          role: "coordinator" as UserRole,
          companyId: "1",
        });
      } else if (email.includes("scanner")) {
        setUser({
          id: "3",
          firstName: "Scanner",
          lastName: "User",
          email,
          role: "scanner" as UserRole,
          companyId: "1",
        });
      } else if (email.includes("client")) {
        setUser({
          id: "4",
          firstName: "Client",
          lastName: "User",
          email,
          role: "client" as UserRole,
          companyId: "1",
        });
      } else if (email.includes("supervisor")) {
        setUser({
          id: "5",
          firstName: "Supervisor",
          lastName: "User",
          email,
          role: "supervisor" as UserRole,
          companyId: "1",
        });
      } else if (email.includes("receptionist")) {
        setUser({
          id: "6",
          firstName: "Receptionist",
          lastName: "User",
          email,
          role: "receptionist" as UserRole,
          companyId: "1",
        });
      } else {
        throw new Error("Invalid email or password");
      }
      
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After registration, we would normally log them in
      // For this example, we'll just redirect to login
      console.log("User registered:", userData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
