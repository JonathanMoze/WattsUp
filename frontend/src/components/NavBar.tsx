import ProtectedRoute from "./ProtectedRoute";
import Button from "./Button";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState<boolean|null>(null);

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        try {
            const decoded = jwtDecode(token).exp;
            const now = Date.now() / 1000;
            if (decoded && decoded > now) {
                setIsAuthorized(true);
            }
        } catch (error) { }
    }

    const handleAuthButtonClick = () => {
        if (isAuthorized) {
            navigate("/logout");
        } else {
            if (location.pathname === "/login") {
                navigate("/register");
            } else {
                navigate("/login");
            }
        }
    }

    const getGoodButton = () => {
        if (isAuthorized) {
            return <Button onClick={handleAuthButtonClick} variant="gray">Logout</Button>
        }
        const label = location.pathname === "/login" ? "Register" : "Login";
        return <Button>{label}</Button>
    }



    return (

        <nav className="bg-white/90 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
            <div className="flex pl-8 gap-15">
                <a href="/" className="text-green-700 font-bold text-xl">WattsUp 🚴</a>
                <ProtectedRoute>   
                <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
                    <li><a href="/dashboard" className="hover:text-green-700">Dashboard</a></li>
                    <li><a href="#" className="hover:text-green-700">My Rides</a></li>
                    <li><a href="#" className="hover:text-green-700">Profile</a></li>
                </ul>
                </ProtectedRoute>
            </div>
            <div className="pr-8">
                {getGoodButton()}
            </div>
        </nav>
    );
};

export default Navbar;