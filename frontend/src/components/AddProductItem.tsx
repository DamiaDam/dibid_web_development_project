import React, { useRef, useState } from "react";
import '../css/lux/bootstrap.min.css'
import VerticalCard from "./VerticalCard";
import { Button, Container, Form, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { ProductProps, ProductResponse, UserInfoDTO } from '../interfaces';
import axios from "axios";
import { WALLET_BACKEND } from "../config";
import PopUpSuccess from "./PopUpSuccess";
import { userInfo, UserInfo } from "os";
import jwtDecode from "jwt-decode";

const POST_URL = `${WALLET_BACKEND}/products/addproduct`;

const AddProductItem: React.FC = () => {

  const name = useRef<HTMLInputElement>(null);
  const imgUrl = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const productUrl = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async () => {
    const nam = name.current?.value;
    const imgurl = imgUrl.current?.value;
    const pricee = price.current?.value;
    const descriptionn = description.current?.value;
    const producturl = productUrl.current?.value;

    if (nam === undefined || nam === "")
      throw new Error('No product name was given');
    if (imgurl === undefined || imgurl === "")
      throw new Error('No image was given');
    if (pricee === undefined || pricee === "")
      throw new Error('No price was given');
    if (descriptionn === undefined || descriptionn === "")
      throw new Error('No description was given');
    if (producturl === undefined || producturl === "")
      throw new Error('No product url was given');

    var apptoken: string = (localStorage.getItem('apptoken') || '').toString()

    var decodedApptoken: any = jwtDecode(apptoken);

    const productRequest: ProductProps = {
      imgUrl: imgurl,
      name: nam,
      price: +pricee,
      description: descriptionn,
      productUrl: producturl,
      user: decodedApptoken.username
    }

    await axios.post(POST_URL, productRequest
    ).then(res => {
      console.log(res);
      if (res.data.success) {
        console.log('productAdded created')
        handleShow();
        // goToWallet();
      }
      else
        console.log('error')
    });
  };


  return (

    <React.Fragment>
      <Container className='container my-4'>
        <Form className='text-center'>
          <FormGroup className="form-group">
            <FormLabel><h3 className="form-label mt-4">Add Product</h3></FormLabel>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={name} className="form-control" id="name" placeholder="Username"></input>
              <FormLabel htmlFor="name">Name</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={imgUrl} className="form-control" id="imgUrl" placeholder="http://"></input>
              <FormLabel htmlFor="imgUrl">imgUrl</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={description} className="form-control" id="description" placeholder="description"></input>
              <FormLabel htmlFor="description">description</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="url" ref={productUrl} className="form-control" id="productUrl" placeholder="http://"></input>
              <FormLabel htmlFor="productUrl">productUrl</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={price} className="form-control" id="Price" placeholder="$"></input>
              <FormLabel htmlFor="Price">Price</FormLabel>
            </Form.Floating>
          </FormGroup>
          <button type="button" className="btn btn-primary rounded" onClick={submit}>Submit Item</button>
        </Form>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item successfully added!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="rounded" onClick={handleClose}>
            Add product
          </Button>
          <Button variant="primary" className="rounded" href="/">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default AddProductItem;