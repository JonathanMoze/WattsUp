import { createContext, useContext } from "react";

interface AuthContextType {
  user: {email : string, username:string} | null;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};