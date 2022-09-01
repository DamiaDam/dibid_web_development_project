import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationProps } from '../interfaces';

const ManageAuctions: React.FC = () => {
  
  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const viewAllProducts = async () => {
    navigate('/products', { state: state });
  };
  const viewMyProducts = async () => {
    navigate('/myproducts', { state: state });
  };
  const addProduct = async () => {
    navigate('/addproduct', { state: state });
  };

  return(
    <React.Fragment>
      <Button onClick={viewAllProducts}>View All Products</Button>
      <Button onClick={viewMyProducts}>View My Products</Button>
      <Button onClick={addProduct}>New product</Button>
    </React.Fragment>
  )

}

export default ManageAuctions;