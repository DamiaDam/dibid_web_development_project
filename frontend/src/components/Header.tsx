import React, { Component, useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Container, Button, FormControl, Form, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';
import decode from 'jwt-decode';
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
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/"><img className="main-logo" src={dibidLogo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title="Shop by category" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Home and garden
                <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-6"
                aria-label="Search"
                style={{ width: 800 }}
                size='sm'
              />
              <Button className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>

              </Button>
            </Form>

            {!loggedIn
            ?
              <React.Fragment>
                <Button onClick={login}>Log in</Button>
                <Button onClick={register}> Register </Button>
              </React.Fragment>
            :
              <Button onClick={logout}> Logout </Button>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{width:"100%", height:"1px", backgroundColor:"black" }}/>
    </React.Fragment>
  );
};

export default Header;