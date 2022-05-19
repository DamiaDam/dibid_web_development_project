import { Navigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

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
      console.log('no Apptoken')
      return false;
    }
  }

  const isAdmin = () => {
    if (apptoken !== undefined && apptoken !== null) {
      const decodedApptoken: any = jwtDecode(apptoken);
      if (decodedApptoken.admin === true) {
        console.log('is Admin')
        return true;
      }
      else {
        console.log('is not Admin')
        return false;
      }
    } else {
      console.log('no Apptoken')
      return false;
    }

  }
  if ((loginGuard === undefined || loginGuard === null)) {
    if (adminGuard)
      return isAuthenticated() === true && isAdmin() === true
        ? children
        : (
          <Navigate to="/login" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
        );
    else
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