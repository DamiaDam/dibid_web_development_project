import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Container } from 'react-bootstrap';

function header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    // <br />
    // <Navbar bg="primary" variant="dark">
    //   <Container>
    //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //   <Nav className="me-auto">
    //     <Nav.Link href="#home">Home</Nav.Link>
    //     <Nav.Link href="#features">Features</Nav.Link>
    //     <Nav.Link href="#pricing">Pricing</Nav.Link>
    //   </Nav>
    //   </Container>
    // </Navbar>

    // <br />
    // <Navbar bg="light" variant="light">
    //   <Container>
    //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //   <Nav className="me-auto">
    //     <Nav.Link href="#home">Home</Nav.Link>
    //     <Nav.Link href="#features">Features</Nav.Link>
    //     <Nav.Link href="#pricing">Pricing</Nav.Link>
    //   </Nav>
    //   </Container>
    // </Navbar>
  );
};

export default header;