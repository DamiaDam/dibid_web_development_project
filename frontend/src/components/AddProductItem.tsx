import React, { useRef, useState } from "react";
import '../css/lux/bootstrap.min.css'
import VerticalCard from "./VerticalCard";
import { Button, Container, Form, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { DropdownItemInterface, MapCoordsDTO, ProductProps, ProductResponse, UserInfoDTO } from '../interfaces';
import axios from "axios";
import { WALLET_BACKEND } from "../config";
import PopUpSuccess from "./PopUpSuccess";
import { userInfo, UserInfo } from "os";
import jwtDecode from "jwt-decode";
import LocationSelectionMap from "./LocationSelectionMap";
import DatePicker from 'react-datepicker';
import DatetimeDropdown from "./DatetimeDropdown";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const POST_URL = `${WALLET_BACKEND}/products/addproduct`;

const AddProductItem: React.FC = () => {

  const [position, setPosition] = useState<MapCoordsDTO | null>({lat: 37.9718, lng: 23.7264});

  const name = useRef<HTMLInputElement>(null);
  const imgUrl = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const startingprice = useRef<HTMLInputElement>(null);
  const buynowprice = useRef<HTMLInputElement>(null);
  const startingdate = useRef<HTMLInputElement>(null);
  const endingdate = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  // const longtitude = useRef<HTMLInputElement>(null);
  // const latitude = useRef<HTMLInputElement>(null);

  const [startInterval,setStartInterval] = useState<string>("now");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async () => {
    const nam = name.current?.value;
    const imgurl = imgUrl.current?.value;
    const startpricee = startingprice.current?.value;
    const descriptionn = description.current?.value;
    const buynowpricee = buynowprice.current?.value;
    const startingdatee = startingdate.current?.value;
    const locationn = location.current?.value;
    const endingdatee = endingdate.current?.value;
    // const longtitudee = longtitude.current?.value;
    // const latitudee = latitude.current?.value;


    const apptoken: string = (localStorage.getItem('apptoken') || '').toString()
    const decodedApptoken: any = jwtDecode(apptoken);

    if (nam === undefined || nam === "")
      throw new Error('No product name was given');
    if (imgurl === undefined || imgurl === "")
      throw new Error('No image was given');
    if (startpricee === undefined || startpricee === "")
      throw new Error('No price was given');
    if (buynowpricee === undefined || buynowpricee === "")
      throw new Error('No price was given');
    if (startingdatee === undefined || startingdatee === "")
      throw new Error('No price was given');
    if (endingdatee === undefined || endingdatee === "")
      throw new Error('No price was given');
    if (locationn === undefined || locationn === "")
      throw new Error('No price was given');
    // if (longtitudee === undefined || longtitudee === "")
    //   throw new Error('No price was given');
    // if (latitudee === undefined || latitudee === "")
    //   throw new Error('No price was given');
    if (descriptionn === undefined || descriptionn === "")
      throw new Error('No description was given');


    const productRequest: ProductProps = {
      imgUrl: imgurl,
      name: nam,
      description: descriptionn,
      user: decodedApptoken.username,
      startingPrice: +startpricee,
      buyNowPrice: +buynowpricee,
      startingDate: +startingdatee,
      endDate: +endingdatee,
      location: locationn,
      longitude: position?.lng,
      latitude: position?.lat,
    }

    await axios.post(POST_URL, productRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apptoken')}`
        }
      }
    ).then(res => {
      console.log(res);
      if (res.data.success) {
        console.log('productAdded created')
        handleShow();
      }
      else
        console.log('error')
    });
  };

  const handleSetPosition = (position: MapCoordsDTO | null) => {
    setPosition(position)
  }

    const [startDate, setStartDate] = useState(new Date());
  
    let handleColor = (time: any) => {
      return time.getHours() > 12 ? "text-success" : "text-error";
    };

    const startDatetimeOptions: DropdownItemInterface[] = [
      {key: 'now', value: 'now'},
      {key: '1h', value: 'In an hour'},
      {key: '24h', value: 'In 24 hours'},
      {key: 'custom', value: 'Choose a custom date'}
    ];

    const endDatetimeOptions: DropdownItemInterface[] = [
      {key: '1h', value: 'In an hour'},
      {key: '24h', value: 'In 24 hours'},
      {key: 'custom', value: 'Choose a custom date'}
    ];


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
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={startingprice} className="form-control" id="name" placeholder="$$"></input>
              <FormLabel htmlFor="name">Starting bid price</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={buynowprice} className="form-control" id="name" placeholder="$$"></input>
              <FormLabel htmlFor="name">Buy it now price</FormLabel>
            </Form.Floating>
            <p>Starting Date</p>
              <Form.Floating className="mb-3">
                <DatetimeDropdown setInterval={setStartInterval} options={startDatetimeOptions} />
                {
                  (startInterval === 'custom') &&

                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    timeClassName={handleColor}
                  />

                }
              </Form.Floating>
              <p>Ending Date</p>
              <Form.Floating className="mb-3">
                <DatetimeDropdown setInterval={setStartInterval} options={endDatetimeOptions} />
                {
                  (startInterval === 'custom') &&

                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    timeClassName={handleColor}
                  />

                }
              </Form.Floating>

                {/* TODO: If user has selected "custom" starting date, then show react-datepicker with time */}
                {/* Example: https://reactdatepicker.com/#example-custom-time-class-name */}
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={endingdate} className="form-control" id="name" placeholder="Ending Date"></input>
              <FormLabel htmlFor="name">Ending Date</FormLabel>
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
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={location} className="form-control" id="name" placeholder="Location"></input>
              <FormLabel htmlFor="name">Location</FormLabel>
            </Form.Floating>
            <LocationSelectionMap position={position} setPosition={handleSetPosition}/>
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