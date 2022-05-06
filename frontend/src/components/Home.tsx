import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';

const Login: React.FC = () => {
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('apptoken');
    navigate('/');
  }
  const login = async () => {
    // In the case where user is redirected to /login
    // but the user selects to create a new wallet (/register route)
    // then the state must be stored
    navigate('/login', { state: state });
  };
  const register = async () => {
    // In the case where user is redirected to /login
    // but the user selects to create a new wallet (/register route)
    // then the state must be stored
    navigate('/register', { state: state });
  };
  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default Login;

