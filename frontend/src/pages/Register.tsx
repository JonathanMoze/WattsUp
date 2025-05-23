import { redirectIfAuthenticated } from "../hooks/useRedirectIfAutenticated";

function Register() {
    redirectIfAuthenticated();
    return (
        <div>   
            <h1>Register</h1>
        </div>
    );
};

export default Register;