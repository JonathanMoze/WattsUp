import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleAuthButtonClick = () => {
        if (isAuthenticated) {
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
        if (isAuthenticated) {
            return <Button onClick={handleAuthButtonClick} variant="gray">Logout</Button>
        }
        const label = location.pathname === "/login" ? "Register" : "Login";
        return <Button onClick={handleAuthButtonClick}>{label}</Button>
    }



    return (

        <nav className="bg-white/90 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
            <div className="flex pl-8 gap-15">
                <a href="/" className="text-green-700 font-bold text-xl">WattsUp 🚴</a> 
                {isAuthenticated && (
                    <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
                        <li><a href="/dashboard" className="hover:text-green-700">Dashboard</a></li>
                        <li><a href="#" className="hover:text-green-700">My Rides</a></li>
                        <li><a href="#" className="hover:text-green-700">Profile</a></li>
                    </ul>
                )}
            </div>
            <div className="pr-8">
                {getGoodButton()}
            </div>
        </nav>
    );
};

export default Navbar;