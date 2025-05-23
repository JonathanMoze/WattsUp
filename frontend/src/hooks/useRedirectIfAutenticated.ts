import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

export const redirectIfAuthenticated = () => {
    const navigate : NavigateFunction = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const decoded = jwtDecode(token).exp;
                const now : number = Date.now() / 1000;
                if(decoded && decoded > now) {
                    navigate("/dashboard");
                }
            } catch (error) {}
        }
    }, [navigate]);
};
