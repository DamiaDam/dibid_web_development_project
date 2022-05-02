import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('apptoken');
        navigate('/');
    }

    return (
        <React.Fragment>
            <h1>Homepage</h1>
            <div>
                <button type="button" onClick={logout} >Logout</button>
            </div>
        </React.Fragment>
    );
}

export default Login;