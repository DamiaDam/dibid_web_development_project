import { Navigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

type AuthProps = {
  children: JSX.Element,
  loginGuard?: boolean,
  adminGuard?: boolean
};

// authguard
const AuthGuard: React.FC<AuthProps> = ({ children, loginGuard, adminGuard }) => {

  const location = useLocation();
  const apptoken = localStorage.getItem("apptoken");

  const isAuthenticated = () => {
    if (apptoken !== "undefined" && apptoken !== null) {
      const { exp } = decode<{ exp: number }>(apptoken);
      if (Date.now() >= exp * 1000) {
        console.log('is not authenticated')

        return false; // has expired
      }
      else {
        console.log('is authenticated')
        return true;
      }
    }
    else {
      console.log('false')
      return false;
    }
  }

  if ((loginGuard === undefined || loginGuard === null)) {
    return isAuthenticated() === true
      ? children
      : (
        <Navigate to="/login" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
      );
  }
  else {
    return isAuthenticated() === false
      ? children // always Login component
      : (
        <Navigate to="/" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
      );
  }
}

export default AuthGuard;