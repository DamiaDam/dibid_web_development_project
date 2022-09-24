import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CategoryInterface, LocationProps, SelectInterface } from '../interfaces';
import electronicsImg from '../images/categories/electronics.png';
import homegardenImg from '../images/categories/homegarden.png';
import fashionImg from '../images/categories/fashion.png';
import sportsImg from '../images/categories/sports.png';
import otherImg from '../images/categories/other.png';
import '../css/App.css'
import { isAuthenticated } from './AuthGuard';
import { getUsernameFromApptoken, convertToSelectInterface } from '../utils';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Select from 'react-select';
import CategoriesListSmall from './CategoriesListSmall';
import CategoryPreviewCard from './CategoryPreviewCard';
import MainCarousel from './Carousel';

const Home: React.FC = () => {
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const images: any[] = [null, electronicsImg, homegardenImg, fashionImg, sportsImg, otherImg]

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(
    () => {

      const getAllCategories = async () => {
        await axios.get(BACKEND_URL+'/categories/getall'
        ).then(res => {
            setCategories(res.data);
        })
      }
    
      getAllCategories();

      setLoggedIn(isAuthenticated());
    }, []
  )

  const showCategoryPreviews = (): JSX.Element[] => {
    return categories.slice(0,4).map( (category) =>
      {return (
        <CategoryPreviewCard key={category.id} category={category} image={images[category.id]} />
      )}
    )
  }

  const navigateToCategory = (selection: SelectInterface[] | any) => {
    console.log('selection: ', selection);
    navigate(`/category/${selection.value}`)
  }
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

      <Row> <MainCarousel /> </Row>

      <div className='width-container'>
        {loggedIn ?
          <Container>
            <h4 className="text-center pt-5">Welcome {getUsernameFromApptoken()}</h4>
            <Row>
              <Col>
                {/* <h1 onClick={viewCurrentAuctions}>View Current Auctions</h1> */}
                <Button className={"hover-zoom"} onClick={viewCurrentAuctions}>View Current Auctions</Button>
              </Col>
              <Col>
                {/* <h1 onClick={manageAuctions}>Manage Auctions</h1> */}
                <Button className={"hover-zoom"} onClick={manageAuctions}>Manage Auctions</Button>
              </Col>
            </Row>
          </Container>
          :
        <h1 onClick={viewCurrentAuctions}>View Current Auctions</h1>
        }

        <Row className="w-75 mx-auto">
          <h1>Explore Popular Categories</h1>
          {categories && showCategoryPreviews()}
        </Row>
      </div>


    </React.Fragment>
  );
}

export default Home;