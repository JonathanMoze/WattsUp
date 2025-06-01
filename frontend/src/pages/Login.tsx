import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthCard from "../components/AuthCard";
import background from "../assets/bg.jpg";
import { useAuth } from "../hooks/useAuthContext";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

function Login() {
    useRedirectIfAuthenticated();


    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const success = await loginUser(email, password);
        if (!success) {
            setError("Invalid credentials");
        }
        // Optionnel: tu peux rediriger ici si success
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <AuthCard title="Login to WattsUp">
                <form className="space-y-4" onSubmit={handleSubmitForm}>
                    <InputField id="email" label="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <InputField id="password" label="Password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <Button type="submit">Login</Button>
                </form>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-green-700 hover:underline">Register here</a>
                </p>
            </AuthCard>
        </div>
    );
};

export default Login;