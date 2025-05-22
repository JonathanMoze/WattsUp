import { redirectIfAuthenticated } from "../hooks/redirectIfAutenticated";

function Register() {
    redirectIfAuthenticated();
    return (
        <div>   
            <h1>Register</h1>
        </div>
    );
};

export default Register;