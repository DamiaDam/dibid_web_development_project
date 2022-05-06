import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WALLET_BACKEND } from '../config';
import { LocationProps, RegisterDTO, RegisterResponseDTO } from '../interfaces';
import '../css/lux/bootstrap.min.css';
import CountryDropdown from './CountryDropdown';

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
      address: addresss
    }

    await axios.post<RegisterResponseDTO>(POST_URL, registerRequest
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
      <div className='container my-4'>
        <form className='text-center'>
          <div className="form-group">
            <h3 className="form-label mt-4">Register</h3>
            <div className="form-floating mb-3">
              <input type="text" ref={username} className="form-control" id="username" placeholder="Username"></input>
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" ref={password} className="form-control" id="password" placeholder="Password"></input>
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" ref={rptpassword} className="form-control" id="confirm-password" placeholder="Password"></input>
              <label htmlFor="confirm-password">Confirm Password</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" ref={name} className="form-control" id="name" placeholder="Name"></input>
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" ref={surname} className="form-control" id="surname" placeholder="Surname"></input>
              <label htmlFor="surname">Surname</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" ref={email} className="form-control" id="email" placeholder="name@example.com"></input>
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" ref={phone} className="form-control" id="phone" placeholder=""></input>
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" ref={tin} className="form-control" id="tin" placeholder=""></input>
              <label htmlFor="tin">TIN</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" ref={address} className="form-control" id="address" placeholder=""></input>
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <CountryDropdown setCountry={setCountry}/>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={register}>Register</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Register;