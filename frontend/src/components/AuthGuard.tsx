import { Navigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

type AuthProps = {
  children: JSX.Element,
  loginGuard?: boolean,
  adminGuard?: boolean
};

export const isAuthenticated = () => {
  const apptoken = localStorage.getItem("apptoken");
  if (apptoken !== undefined && apptoken !== null) {
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
};

export const isSelfOrAdmin = (username: string) => {
  const apptoken = localStorage.getItem("apptoken");
  if (apptoken !== undefined && apptoken !== null) {
    const decodedApptoken: any = jwtDecode(apptoken);
    if (Date.now() >= decodedApptoken.exp * 1000) {
      console.log('is not authenticated')

      return false; // has expired
    }
    else {

      if (decodedApptoken.admin === true) {
        console.log('is Admin')
        return true;
      }
      if (decodedApptoken.username === username) {
        console.log('is correct user')
        return true;
      }
      else {
        console.log('is another user')
        return false;
      }
    }
  }
  else {
    console.log('no Apptoken')
    return false;
  }
};

export const isValidated = () => {
  const apptoken = localStorage.getItem("apptoken");
  if (apptoken !== undefined && apptoken !== null) {
    const decodedApptoken: any = jwtDecode(apptoken);
    if (decodedApptoken.validated === true) {
      console.log('is Validated')
      return true;
    }
    else {
      console.log('is not Validated')
      return false;
    }
  } else {
    console.log('no Apptoken')
    return false;
  }
}

export const isAdmin = () => {
  const apptoken = localStorage.getItem("apptoken");
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
};

// authguard
const AuthGuard: React.FC<AuthProps> = ({ children, loginGuard, adminGuard }) => {

  const location = useLocation();

  if(loginGuard === true) {
    return isAuthenticated() === false
        ? children
        : (
          <Navigate to="/" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
        );
  }

  if(adminGuard === true) {
    return isAuthenticated() === true && isAdmin() === true
        ? children
        : (
          <Navigate to="/login" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
        );
  }

  // default
  if (isAuthenticated() === true) {

    return isValidated() === true
        ? children
        : (
          <Navigate to="/pending" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
        );
  }
  else {
    return <Navigate to="/login" replace state={{ path: window.location.href.substring(window.location.href.indexOf(location.pathname)) }} />
  }
}

export default AuthGuard;