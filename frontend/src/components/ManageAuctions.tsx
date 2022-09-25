import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationProps } from '../interfaces';
import viewAllImg from '../images/searchimg.png';
import viewMyImg from '../images/myproductsimg.png';
import addImg from '../images/addimg.png';
import ActionCard from './ActionCard';

const ManageAuctions: React.FC = () => {
  
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const viewAllProducts = async () => {
    navigate('/auctions', { state: state });
  };
  const viewMyProducts = async () => {
    navigate('/myproducts', { state: state });
  };
  const addProduct = async () => {
    navigate('/addproduct', { state: state });
  };

  return(
    <div className="width-container">
      <Container>
        <Row>
          <h1>Manage Auctions</h1>
        </Row>
        <Row>
          <Col>
            <ActionCard 
              onClick={viewAllProducts}
              image={viewAllImg}
              title={"View All Products"}
              text={"View all active auctions, or filter to your needs"}
            />
          </Col>
          <Col>
            <ActionCard 
              onClick={viewMyProducts}
              image={viewMyImg}
              title={"View My Products"}
              text={"Show products you have listed, view other users' bids, and edit or delete"}
              />
          </Col>
          <Col>
            <ActionCard 
              onClick={addProduct}
              image={addImg}
              title={"Add New Product"}
              text={"Create an auction of a new product"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )

}

export default ManageAuctions;