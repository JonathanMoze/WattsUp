import { Navigate } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, type ReactNode } from "react";
import api from "../api";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      const decoded: JwtPayload = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now: number = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    };

    let isMounted: boolean = true;
    auth().catch(() => {
      if (isMounted) setIsAuthorized(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
