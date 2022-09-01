import React, { useEffect, useRef, useState } from "react";
import '../css/lux/bootstrap.min.css'
import VerticalCard from "./VerticalCard";
import { Button, Container, Form, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { AddProductItemI, DropdownItemInterface, MapCoordsDTO, ProductProps, ProductResponse, SelectInterface, UserInfoDTO } from '../interfaces';
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
import CategorySelector from "./CategorySelector";

const POST_URL = `${WALLET_BACKEND}/products/addproduct`;

const AddProductItem: React.FC<AddProductItemI> = ({productId}) => {

  useEffect(() => {
    
    // if productId is not null
    //     fetch product with such Id
    //     if product with productId exists
    //         prefill all fields
    
  }, [])
  

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async () => {
    const nam = name.current?.value;
    const imgurl = imgUrl.current?.value;
    const startpricee = startingprice.current?.value;
    const descriptionn = description.current?.value;
    const buynowpricee = buynowprice.current?.value;
    const locationn = location.current?.value;
    // const longtitudee = longtitude.current?.value;
    // const latitudee = latitude.current?.value;

    const startingdatee: number = extractTimeFromSelection(startInterval, startDate);
    const endingdatee: number = extractTimeFromSelection(endInterval, endDate);

    const apptoken: string = (localStorage.getItem('apptoken') || '').toString()
    const decodedApptoken: any = jwtDecode(apptoken);

    if (nam === undefined || nam === "")
      throw new Error('No product name was given');
    // if (imgurl === undefined || imgurl === "")
    //   throw new Error('No image was given');
    if (startpricee === undefined || startpricee === "")
      throw new Error('No price was given');
    if (buynowpricee === undefined || buynowpricee === "")
      throw new Error('No price was given');
    // if (startingdatee === undefined || startingdatee === "")
    //   throw new Error('No price was given');
    // if (endingdatee === undefined || endingdatee === "")
    //   throw new Error('No price was given');
    if (locationn === undefined || locationn === "")
      throw new Error('No price was given');
    // if (longtitudee === undefined || longtitudee === "")
    //   throw new Error('No price was given');
    // if (latitudee === undefined || latitudee === "")
    //   throw new Error('No price was given');
    if (descriptionn === undefined || descriptionn === "")
      throw new Error('No description was given');


    var productRequest: ProductProps = {
      imgUrl: "",
      categories: selectedCategories,
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


    let formData = new FormData();
    if(image !== undefined){
      formData.append('file', image);

      await axios.post(`${WALLET_BACKEND}/upload`, formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apptoken')}`
          }
        }
      ).then(res => {productRequest.imgUrl = res.data.name})
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


  // Map set coords
  const handleSetPosition = (position: MapCoordsDTO | null) => {
    setPosition(position)
  }

  // Datetimepicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const startDatetimeOptions: DropdownItemInterface[] =
  [
    {key: 0, value:'Now'},
    {key: 1, value:'In 1 hour'},
    {key: 24, value:'In 24 hours'},
    {key: -1, value:'Set a custom starting time'}
  ];

  const endDatetimeOptions: DropdownItemInterface[] =
  [
    {key: 1, value:'In 1 hour'},
    {key: 24, value:'In 24 hours'},
    {key: -1, value:'Set a custom starting time'}
  ];


    // Toggle buyNowPrice, Starting Date from appearing
    const [showBuyNow, setShowBuyNow] = useState<boolean>(false);
    const [showStartDate, setShowStartDate] = useState<boolean>(false);

    const toggleBuyNowPrice = () => {
      setShowBuyNow(!showBuyNow);
    }

    const toggleStartDate = () => {
      setShowStartDate(!showStartDate);
    }

    // Toggle actual startDate, endDate from dropdown + datetimepicker
    const [startInterval,setStartInterval] = useState<number>(0);
    const [endInterval,setEndInterval] = useState<number>(1);

    const extractTimeFromSelection = (interval: number, date: Date): number => {

      if(interval===0)
        return +new Date();
      
      if(interval===1)
        return +new Date() + (1*60*60*1000);

      if(interval===24)
        return +new Date() + (24*60*60*1000);
      
      if(interval===-1)
        return +date;

      // default = now
      return +new Date();
    }

  // Category selection

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (selection: SelectInterface[] | any) => {
    const selectedCategoryList: number[] = [];

    selection.map((category: SelectInterface) => {
      selectedCategoryList.push(+category.value)
    });

    setSelectedCategories(selectedCategoryList);
  }

  const [image, setImage] = useState<File>();

  const addPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null)
      setImage(e.target.files[0]);
  }


  return (

    <React.Fragment>
      <Container className='container my-4'>
        <Form className='text-center'>
          <FormGroup className="form-group">
            <FormLabel><h3 className="form-label mt-4">{productId ? "Add" : "Edit"} Product</h3></FormLabel>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={name} className="form-control" id="name" placeholder={productId ? "Name" : "Update"}></input>
              <FormLabel htmlFor="name">Name</FormLabel>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <CategorySelector onChange={handleCategoryChange}/>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={startingprice} className="form-control" id="name" placeholder="$$"></input>
              <FormLabel htmlFor="name">Starting bid price</FormLabel>
            </Form.Floating>

            <p className={"link-like-text"} onClick={toggleBuyNowPrice}>Set instant buy price</p>
            {
              showBuyNow &&
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && submit()} type="text" ref={buynowprice} className="form-control" id="name" placeholder="$$"></input>
              <FormLabel htmlFor="name">Buy it now price</FormLabel>
            </Form.Floating>
            }

            <p className={"link-like-text"} onClick={toggleStartDate}>Set starting date</p>
            {
              showStartDate &&
              <React.Fragment>
                <p>Starting Date</p>
                <Form.Floating className="mb-3">
                    <DatetimeDropdown setInterval={setStartInterval} options={startDatetimeOptions} name={"Starting Date"}/>
                    {
                      startInterval == -1 &&

                      <DatePicker
                        showTimeSelect
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        minDate={new Date()}
                        filterTime={filterPassedTime}
                      />

                    }
                  </Form.Floating>
                </React.Fragment>
            }

              <p>Ending Date</p>
              <Form.Floating className="mb-3">
                <DatetimeDropdown setInterval={setEndInterval} options={endDatetimeOptions} name={"Ending Date"} />
                {
                  endInterval == -1 &&

                  <DatePicker
                    showTimeSelect
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                    minDate={new Date()}
                    filterTime={filterPassedTime}
                  />

                }
              </Form.Floating>

                {/* TODO: If user has selected "custom" starting date, then show react-datepicker with time */}
                {/* Example:  https://reactdatepicker.com/#example-custom-time-class-name */}
                {/* Example2: https://reactdatepicker.com/#example-filter-times */}
            <Form.Floating className="mb-3">
              <input type="file" onChange={(e) => addPicture(e)}></input>
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
          <button type="button" className="btn btn-primary rounded" onClick={submit}>{productId? "Submit" : "Update"} Item</button>
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