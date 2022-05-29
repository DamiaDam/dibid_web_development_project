import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import { LocationProps, RegisterDTO, RegisterResponseDTO } from '../interfaces';
import '../css/lux/bootstrap.min.css';
import CountryDropdown from './CountryDropdown';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';

const POST_URL = `${WALLET_BACKEND}/register`;

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
  const [country, setCountry] = useState<string>("");

  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const goToWallet = useCallback(() => navigate(state?.path || "/", { replace: true }), [navigate, state?.path]);

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

    if (user === undefined || user === "")
      throw new Error('No username was given');
    if (pass === undefined || pass === "")
      throw new Error('No password was given');
    if (rptpass === undefined || rptpass === "")
      throw new Error('No repeat password was given');
    if (nam === undefined || nam === "")
      throw new Error('No name was given');
    if (surnam === undefined || surnam === "")
      throw new Error('No surname was given');
    if (emailaddr === undefined || emailaddr === "")
      throw new Error('No email address was given');
    if (phoneno === undefined || phoneno === "")
      throw new Error('No phone number was given');
    if (tinno === undefined || tinno === "")
      throw new Error('No TIN was given');
    if (countryy === undefined || countryy === "")
      throw new Error('No country was given');
    if (addresss === undefined || addresss === "")
      throw new Error('No address was given');
    if (locationn === undefined || locationn === "")
      throw new Error('No location was given');

    if (pass !== rptpass)
      throw new Error('Passwords do not match');

    const registerRequest: RegisterDTO = {
      username: user,
      password: pass,
      name: nam,
      surname: surnam,
      email: emailaddr,
      phone: phoneno,
      tin: tinno,
      country: countryy,
      address: addresss,
      location: locationn
    }

    await axios.post<RegisterResponseDTO>(POST_URL, registerRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apptoken')}`
        }
      }
    ).then(res => {
      console.log(res);
      if (res.data.success) {
        console.log('user created')
        goToWallet();
      }
      else
        console.log('error')
    });
  };

  return (
    <React.Fragment>
      <Container className='container my-4'>
        <Form className='text-center'>
          <FormGroup >
            <Form.Label className="form-label mt-4"><h3>Register</h3></Form.Label>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={username} className="form-control" id="username" placeholder="Username" required />
              <label htmlFor="username">Username</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="password" ref={password} className="form-control" id="password" placeholder="Password" required />
              <label htmlFor="password">Password</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="password" ref={rptpassword} className="form-control" id="confirm-password" placeholder="Password" required />
              <label htmlFor="confirm-password">Confirm Password</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={name} className="form-control" id="name" placeholder="Name" required />
              <label htmlFor="name">Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={surname} className="form-control" id="surname" placeholder="Surname" required />
              <label htmlFor="surname">Surname</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="email" ref={email} className="form-control" id="email" placeholder="name@example.com" required />
              <label htmlFor="email">Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={phone} className="form-control" id="phone" placeholder="" />
              <label htmlFor="phone">Phone Number</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={tin} className="form-control" id="tin" placeholder="" />
              <label htmlFor="tin">TIN</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={address} className="form-control" id="address" placeholder=""></input>
              <label htmlFor="address">Address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && register()} type="text" ref={location} className="form-control" id="location" placeholder=""></input>
              <label htmlFor="location">Location</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <CountryDropdown setCountry={setCountry} />
            </Form.Floating>
          </FormGroup>
          <Button type="button" className="btn btn-primary rounded" onClick={register}>Register</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default Register;