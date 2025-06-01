import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuthContext"
import { useEffect } from "react";

export const useRedirectIfAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/dashboard");
    }, [isAuthenticated, navigate]);
}