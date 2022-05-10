import React, { Component, useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Container, Button, FormControl, Form, ListGroup, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';
import decode from 'jwt-decode';
import '../App.css'
import './Home.css'
import '../css/lux/bootstrap.min.css';

const Header: React.FC = () => {
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const apptoken = localStorage.getItem("apptoken");
  const isAuthenticated = () => {
    if (apptoken != "undefined" && apptoken != null) {
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

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(
    () => {
      setLoggedIn(isAuthenticated());
    }, []
  )

  function logout() {
    localStorage.removeItem('apptoken');
    window.location.reload();
    // navigate('/');
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
      <Navbar bg="light" expand="sm" sticky='top'>
        <Container fluid >
          <Navbar.Brand href="/"><img className="main-logo" src={dibidLogo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>

            <Col xs={5}>
              <Form.Control placeholder="Search anything" />
            </Col>
            <Col>
              <Button type="button" className="btn btn-secondary">
                <svg width="15px" height="15px">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                </svg>
              </Button>

            </Col>
            {!loggedIn
              ?
              <React.Fragment>
                <div className='underline-on-hover' ><a onClick={login} className='px-2 form-text' style={{ textDecoration: 'none' }}>login</a></div>
                /
                <div className='underline-on-hover' ><a onClick={register} className='ps-2 pe-4 form-text' style={{ textDecoration: 'none' }}>register</a></div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className='underline-on-hover' ><a href='#' className='px-2 form-text' style={{ textDecoration: 'none' }}>Welcome a</a></div>
                /
                <div className='underline-on-hover' ><a onClick={login} className='ps-2 pe-4 form-text' style={{ textDecoration: 'none' }}>logout</a></div>
              </React.Fragment>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: "100%", height: "1px", backgroundColor: "black" }} />
    </React.Fragment>
  );
};

export default Header;