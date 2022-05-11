import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Navbar, Card } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';
import electronicsImg from '../images/electronics.png';
import homegardenImg from '../images/homegarden.png';
import fashionImg from '../images/fashion.png';
import sportsImg from '../images/sports.png';
import otherImg from '../images/other.png';

import './Home.css'

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
  const addProduct = async () => {
    navigate('/addproduct', { state: state });
  };
  return (
    <React.Fragment>
      <Navbar bg="light" style={{ height: '35px' }}>
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
              <div className='zoom'>
                <Card.Link onClick={electronics}><Card.Img variant="top" src={electronicsImg} /></Card.Link>
              </div>
              <Card.Body>
                <ul className="list-unstyled">
                  <Card.Title className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Electronics</Card.Link></Card.Title>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Smartphones</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Laptops</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Gaming</Card.Link></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ maxWidth: '15rem' }}>
              <div className='zoom'>
                <Card.Link onClick={homegarden}><Card.Img variant="top" src={homegardenImg} /></Card.Link>
              </div>
              <Card.Body>
                <ul className="list-unstyled">
                  <Card.Title className='underline-on-hover'><Card.Link onClick={homegarden} style={{ textDecoration: 'none' }}>Home and Garden</Card.Link></Card.Title>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Smartphones</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Laptops</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Gaming</Card.Link></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ maxWidth: '15rem' }}>
              <div className='zoom'>
                <Card.Link onClick={fashion}><Card.Img variant="top" src={fashionImg} /></Card.Link>
              </div>
              <Card.Body>
                <ul className="list-unstyled">
                  <Card.Title className='underline-on-hover'><Card.Link onClick={fashion} style={{ textDecoration: 'none' }}>Fashion</Card.Link></Card.Title>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Smartphones</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Laptops</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Gaming</Card.Link></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ maxWidth: '15rem' }}>
              <div className='zoom'>
                <Card.Link onClick={sports}><Card.Img style={{ border: '1px solid #ddd' }} variant="top" src={sportsImg} /></Card.Link>
              </div>
              <Card.Body>
                <ul className="list-unstyled">
                  <Card.Title className='underline-on-hover'><Card.Link onClick={sports} style={{ textDecoration: 'none' }}>Sports</Card.Link></Card.Title>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Smartphones</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Laptops</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Gaming</Card.Link></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: '15rem' }}>
              <div className='zoom'>
                <Card.Link onClick={other}><Card.Img variant="top" src={otherImg} /></Card.Link>
              </div>
              <Card.Body>
                <ul className="list-unstyled">
                  <Card.Title className='underline-on-hover'><Card.Link onClick={other} style={{ textDecoration: 'none' }}>Other Categories</Card.Link></Card.Title>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Smartphones</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Laptops</Card.Link></li>
                  <li className='underline-on-hover'><Card.Link onClick={electronics} style={{ textDecoration: 'none' }}>Gaming</Card.Link></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Button onClick={VerticalCard}>VerticalCard</Button>
        <Button onClick={addProduct}>New product</Button>
      </Container>
    </React.Fragment>
  );
}

export default Login;

