import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Carousel, Col, Row } from 'react-bootstrap';
import { Navbar, Card } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CategoryInterface, LocationProps, SelectInterface } from '../interfaces';
import decode from 'jwt-decode';
import electronicsImg from '../images/categories/electronics.png';
import homegardenImg from '../images/categories/homegarden.png';
import fashionImg from '../images/categories/fashion.png';
import sportsImg from '../images/categories/sports.png';
import otherImg from '../images/categories/other.png';
import carousel1 from '../images/carousel/carousel1.png';
import carousel2 from '../images/carousel/carousel2.png';
import carousel3 from '../images/carousel/carousel3.png';
import '../css/App.css'
import { isAuthenticated } from './AuthGuard';
import LocationSelectionMap from './LocationSelectionMap';
import { getUsernameFromApptoken, convertToSelectInterface } from '../utils';
import CategorySelector from './CategorySelector';
import axios from 'axios';
import { WALLET_BACKEND } from '../config';
import Select from 'react-select';
import CategoriesListSmall from './CategoriesListSmall';

const Home: React.FC = () => {
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const electronics = async () => {
    navigate('/category/1', { state: state });
  };
  const homegarden = async () => {
    navigate('/category/2', { state: state });
  };
  const fashion = async () => {
    navigate('/category/3', { state: state });
  };
  const sports = async () => {
    navigate('/category/4', { state: state });
  };
  const other = async () => {
    navigate('/category/5', { state: state });
  };


  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(
    () => {

      const getAllCategories = async () => {
        await axios.get(WALLET_BACKEND+'/categories/getall'
        ).then(res => {
            setCategories(res.data);
        })
      }
    
      getAllCategories();

      setLoggedIn(isAuthenticated());
    }, []
  )

  const navigateToCategory = (selection: SelectInterface[] | any) => {
    console.log('selection: ', selection);
    navigate(`/category/${selection.value}`)
  }

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
  const viewCurrentAuctions = async () => {
    navigate('/auctions', { state: state });
  }
  const manageAuctions = async () => {
    navigate('/manage-auctions', { state: state });
  }
  return (
    <React.Fragment>

      <Navbar bg="light" style={{ height: '35px' }}>
        <Container fluid >
          <CategoriesListSmall categories={categories} count={4}/>
          <Select
                defaultValue={[]}
                name="categories"
                options={convertToSelectInterface(categories)}
                onChange={navigateToCategory}
                className="basic-select"
                classNamePrefix="select"
            />
        </Container>
      </Navbar>
      {loggedIn
        ?
        <h4 className="text-center pt-5">Welcome {getUsernameFromApptoken()}</h4>
        :
        <div></div>
      }
      <Row>
        <Carousel className="w-75 mx-auto py-5">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Buy and Sell anything</h3>
              <p>Here you can buy whatever are you looking for, and sell anything</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 style={{ color: 'white' }}>Combine best prices and quality</h3>
              <p>Find smartphones, laptops and other electronic products on the best price!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>FREE SHIPPING</h3>
              <p>Find selected items with free shipping, wherever you are!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </Row>

      <Row className="w-75 mx-auto">
        <Col>
          <Card style={{ width: '15rem', height: '20rem' }}>
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
          <Card style={{ maxWidth: '15rem', height: '20rem' }}>
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

        <Col  >
          <Card style={{ maxWidth: '15rem', height: '20rem' }}>
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
          <Card style={{ maxWidth: '15rem', height: '20rem' }}>
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
          <Card className="card h-70" style={{ width: '15rem', height: '20rem' }}>
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

      <h1 onClick={viewCurrentAuctions}>View Current Auctions</h1>
      {loggedIn &&
        <h1 onClick={manageAuctions}>Manage Auctions</h1>
      }

      {/* <LocationSelectionMap /> */}
    </React.Fragment>
  );
}

export default Home;

