import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAutenticated";

function Register() {
    useRedirectIfAuthenticated();
    return (
        <div>   
            <h1>Register</h1>
        </div>
    );
};

export default Register;