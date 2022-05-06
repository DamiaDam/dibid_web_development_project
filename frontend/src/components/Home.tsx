import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Navbar, Card } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';
import electronicsImg from '../images/electronics.png';

const Login: React.FC = () => {
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const electronics = async () => {
    navigate('/category/electronics', { state: state });
  };
  const homegarden = async () => {
    navigate('/category/homegarden', { state: state });
  };
  const fashion = async () => {
    navigate('/category/fashion', { state: state });
  };
  const sports = async () => {
    navigate('/category/sports', { state: state });
  };
  const other = async () => {
    navigate('/category/other', { state: state });
  };

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
  const VerticalCard = async () => {
    navigate('/VerticalCard', { state: state });
  };
  return (
    <React.Fragment>
      <Navbar bg="light" style={{ height: '35px'}}>
        <Container fluid >
          <Nav.Link onClick={electronics} >Electronics</Nav.Link>
          <Nav.Link onClick={homegarden} >Home and Garden</Nav.Link>
          <Nav.Link onClick={fashion} >Fashion</Nav.Link>
          <Nav.Link onClick={sports} >Sports</Nav.Link>
          <Nav.Link onClick={other}>Other Categories</Nav.Link>
        </Container>
      </Navbar>

    <Container fluid className="App py-2 overflow-hidden">

      <Row xs="auto">
      <Col>
          <Card style={{ width: '15rem' }}>
          <Card.Img variant="top" src={electronicsImg} />
          <Card.Body>
            <ListGroup>
              <Card.Link onClick={electronics} className='bg-image hover-zoom' style={{ maxWidth: '22rem' }}>
              <Card.Title  style={{textDecoration: 'underline'}}>Electronics</Card.Title>
              </Card.Link>
              <Card.Link>Smartphones</Card.Link>
              <Card.Link>Laptops</Card.Link>
              <Card.Link>Gaming</Card.Link>
            </ListGroup>
          </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          </Card>
        </Col>

        <Col xs="auto">
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={"../images/electronics.jpg"} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          </Card>
        </Col>

        <Col xs="auto">
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          </Card>
          </Col>

          <Col xs="auto">
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          </Card>
        </Col>
        </Row>
        <Button onClick={VerticalCard}>VerticalCard</Button>
    </Container>
    </React.Fragment>
  );
}

export default Login;

