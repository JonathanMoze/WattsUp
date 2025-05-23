import { redirectIfAuthenticated } from "../hooks/useRedirectIfAutenticated";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthCard from "../components/AuthCard";
import background from "../assets/bg.jpg"

function Login() {
    redirectIfAuthenticated();
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${background})`, // ou une URL directe
            }}
        >
            <AuthCard title="Login to WattsUp">
                <form className="space-y-4">
                    <InputField id="email" label="Email" />
                    <InputField id="password" label="Password" type="Password" />
                    <Button type="submit">Login</Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-green-700 hover:underline">Register here</a>
                </p>
            </AuthCard>
        </div>
    );
};

export default Login;