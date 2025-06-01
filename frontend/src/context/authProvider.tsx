import { useEffect, useState, type ReactNode } from "react";
import { login, logout, is_authenticated, call_refresh } from "../api";
import { AuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{email : string, username:string} | null>(null);

  // Optionnel : vérifier si l'utilisateur est déjà connecté (ex: via cookie/session)
  useEffect(() => {
    const checkAuth = async () => {
      try{
        console.log("chech Auth");
        const data = await is_authenticated();
        if(data) {
          setUser({ email: data.email, username: data.username });
        }
      } catch(error) {
        if(axios.isAxiosError(error)) {
          const data = await call_refresh(error, is_authenticated)
          if(data) {
            setUser({ email: data.email, username: data.username });
          }
        }
      }
      
    };
    checkAuth();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    if (data) {
        setUser({ email: data.email, username: data.username });
        return true;
    }
    return false
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginUser, logoutUser  }}>
      {children}
    </AuthContext.Provider>
  );
};