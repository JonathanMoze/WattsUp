import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

function Register() {
    useRedirectIfAuthenticated();
    return (
        <div>   
            <h1>Register</h1>
        </div>
    );
};

export default Register;