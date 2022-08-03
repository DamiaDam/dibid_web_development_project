import React, { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LocationProps } from "../interfaces";
import { getUsernameFromApptoken } from "../utils";
import { isAuthenticated, isValidated } from "./AuthGuard";


const PendingValidation: React.FC = () => {

    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    useEffect(
        () => {
        setLoggedIn(isAuthenticated());
        }, []
    )

    const [validated, setValidated] = useState<boolean>(false);
    useEffect(
        () => {
        setValidated(isValidated());
        }, []
    )

    function logout() {
        localStorage.removeItem('apptoken');
        navigate('/home', { state: state });
      }

    return(

            (loggedIn && !validated)
            ?
            <React.Fragment>
                <h1>User Pending Validation</h1>
                <p>User {getUsernameFromApptoken()} must be validated by an administrator before proceeding.</p>
                <p> If this is taking too long, please contact an administrator.</p>
                <a onClick={logout}>Logout</a>
            </React.Fragment>
            :
            <Navigate to="/login" />
    );
}

export default PendingValidation;