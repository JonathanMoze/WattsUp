import { redirectIfAuthenticated } from "../hooks/useRedirectIfAutenticated";

function Login () {
    redirectIfAuthenticated();
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login;