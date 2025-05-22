import { Navigate } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, type ReactNode} from "react";
import type { AxiosResponse } from "axios";

type Props = {
    children : ReactNode;
};

function ProtectedRoute({ children } : Props) {
    const [isAuthorized, setIsAuthorized] = useState<boolean|null>(null);
    
    useEffect(() => {
        let isMounted : boolean = true;
        auth().catch(() => {
            if(isMounted) setIsAuthorized(false);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const refreshToken = async () => {
        const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res : AxiosResponse<any, any> = await api.post("/api/token/refresh/", { refresh: refreshToken, });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false);
            return
        }
        const decoded: JwtPayload = jwtDecode(token);
        const tokenExpiration: number | undefined = decoded.exp;
        const now: number = Date.now() / 1000;

        if (tokenExpiration && tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;