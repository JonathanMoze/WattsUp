import { useEffect, useState, type ReactNode } from "react";
import { login, logout, is_authenticated } from "../api";
import { AuthContext } from "../hooks/useAuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{email : string, username:string} | null>(null);

  // Optionnel : vérifier si l'utilisateur est déjà connecté (ex: via cookie/session)
  useEffect(() => {
    const checkAuth = async () => {
      const data = await is_authenticated();
      if(data) {
        setUser({ email: data.email, username: data.username });
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