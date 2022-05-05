import React, { useState, useCallback } from 'react'
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { LocationProps } from './types/LocationProps';
import '../css/lux/bootstrap.min.css';
import '../css/lux/bootstrap.css';

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
      <div>
        <button type="button" onClick={logout} >Logout</button>
      </div>

      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Button onClick={login}>Log in</Button>
            <Button onClick={register}> Register </Button>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Login;

