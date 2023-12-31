import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { LocationProps, RegisterDTO, RegisterResponseDTO, LoginRequestDTO, LoginResponseDTO, SelectInterface, MapCoordsDTO } from '../interfaces';
import '../css/lux/bootstrap.min.css';
import CountryDropdown from './CountryDropdown';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import LocationSelectionMap from './LocationSelectionMap';

const POST_URL = `${BACKEND_URL}/register`;

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rptpassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const tin = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<number>(0);
  const [position, setPosition] = useState<MapCoordsDTO | null>({ lat: 37.9718, lng: 23.7264 });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const register = async () => {
    const user = username.current?.value
    const pass = password.current?.value;
    const rptpass = rptpassword.current?.value;
    const nam = name.current?.value;
    const surnam = surname.current?.value;
    const emailaddr = email.current?.value;
    const phoneno = phone.current?.value;
    const tinno = tin.current?.value;
    const countryy = country;
    const addresss = address.current?.value;
    const locationn = location.current?.value;

    if (user === undefined || user === "") {
      handleError('No username was given');
      return;
    }
    if (pass === undefined || pass === "") {
      handleError('No password was given');
      return;
    }
    if (rptpass === undefined || rptpass === "") {
      handleError('No repeat password was given');
      return;
    }
    if (nam === undefined || nam === "") {
      handleError('No name was given');
      return;
    }
    if (surnam === undefined || surnam === "") {
      handleError('No surname was given');
      return;
    }
    if (emailaddr === undefined || emailaddr === "") {
      handleError('No email address was given');
      return;
    }
    if (phoneno === undefined || phoneno === "") {
      handleError('No phone number was given');
      return;
    }
    if (tinno === undefined || tinno === "") {
      handleError('No TIN was given');
      return;
    }
    if (country === 0) {
      handleError('No country was given');
      return;
    }
    if (addresss === undefined || addresss === "") {
      handleError('No address was given');
      return;
    }
    if (locationn === undefined || locationn === "") {
      handleError('No location was given');
      return;
    }
    if (position === undefined || position === null) {
      handleError('No position was given');
      return;
    }
    if (pass !== rptpass) {
      handleError('Passwords do not match');
      return;
    }

    const registerRequest: RegisterDTO = {
      username: user,
      password: pass,
      name: nam,
      surname: surnam,
      email: emailaddr,
      phone: phoneno,
      tin: tinno,
      countryId: country,
      address: addresss,
      location: locationn,
      longitude: position.lng,
      latitude: position.lat
    }

    await axios.post<RegisterResponseDTO>(POST_URL, registerRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apptoken')}`
        }
      }
    ).then(async res => {
      console.log(res);
      if (res.data.success) {
        console.log('user created');
        try {
          await login(user, pass);
        }
        catch {
          navigate('/', { state: state });
        }
      }
      else {
        console.log('error');
        handleError('Username already exists!');
      }
    });
  };

  const login = async (username: string, pass: string) => {

    const loginRequest: LoginRequestDTO = {
      username: username,
      password: pass
    }

    console.log('loginRequest:', loginRequest)

    await axios.post<LoginResponseDTO>(BACKEND_URL + '/login', loginRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apptoken')}`
        }
      }
    ).then(res => {
      console.log(res);
      if (!res.data || (res.data.username === "access-denied" && res.data.apptoken === "")) {
        console.log('Access Denied - wrong username and/or password');
        throw new Error();
      }
      else {
        localStorage.setItem("apptoken", res.data.apptoken);
        navigate('/pending', { state: state });
      }
    });
  }

  const handleCountry = (selection: SelectInterface | any) => {
    setCountry(selection.value);
  }

  // Map set coords
  const handleSetPosition = (position: MapCoordsDTO | null) => {
    setPosition(position)
  }

  const handleError = (err: string) => {
    setError(err);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setError("");
    }, 5000)
  }

  return (
    <React.Fragment>
      <Container className='container my-4'>
        <Form className='text-center'>
          <FormGroup >
            <Form.Label className="form-label mt-4"><h3>Register</h3></Form.Label>
            {error &&
              <p className='err'>
                {error}
              </p>
            }
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={username} className="form-control rounded" id="username" placeholder="Username" required />
              <label htmlFor="username">Username</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="password" ref={password} className="form-control rounded" id="password" placeholder="Password" required />
              <label htmlFor="password">Password</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="password" ref={rptpassword} className="form-control rounded" id="confirm-password" placeholder="Password" required />
              <label htmlFor="confirm-password">Confirm Password</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={name} className="form-control rounded" id="name" placeholder="Name" required />
              <label htmlFor="name">Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={surname} className="form-control rounded" id="surname" placeholder="Surname" required />
              <label htmlFor="surname">Surname</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="email" ref={email} className="form-control rounded" id="email" placeholder="name@example.com" required />
              <label htmlFor="email">Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={phone} className="form-control rounded" id="phone" placeholder="" />
              <label htmlFor="phone">Phone Number</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={tin} className="form-control rounded" id="tin" placeholder="" />
              <label htmlFor="tin">TIN</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={address} className="form-control rounded" id="address" placeholder=""></input>
              <label htmlFor="address">Address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={location} className="form-control rounded" id="location" placeholder=""></input>
              <label htmlFor="location">Location</label>
            </Form.Floating>
            <LocationSelectionMap position={position} setPosition={handleSetPosition} />
            <Form.Floating className="mb-3">
              <CountryDropdown setCountry={handleCountry} />
            </Form.Floating>
          </FormGroup>
          <Button type="button" className="btn btn-primary rounded" onClick={register}>Register</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Register;