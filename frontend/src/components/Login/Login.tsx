import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup, Form, Container } from 'react-bootstrap';
import { WALLET_BACKEND } from '../../config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from '../../interfaces';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import '../../css/lux/bootstrap.min.css';


const POST_URL = `${WALLET_BACKEND}/uauth/login`;
const AUTH_URL = `${WALLET_BACKEND}/op/auth`;


const Login: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const goToWallet = useCallback(() => navigate(state?.path || "/", { replace: true }), [navigate]);

  const login = async () => {
    const user = username.current?.value
    const pass = password.current?.value;
    if (user === undefined || user === "")
      throw new Error('No username was given');
    if (pass === undefined || pass === "")
      throw new Error('No password was given');

    const loginRequest: LoginRequestDTO = {
      username: user,
      password: pass
    }

    await axios.post<LoginResponseDTO>(POST_URL, loginRequest
    ).then(res => {
      console.log(res);
      localStorage.setItem("apptoken", res.data.apptoken);

      console.log('state.path = ', state.path)
      goToWallet();
    });
  };

  return (
    <React.Fragment>
      <div className='container my-4'>
        <form className='text-center'>
          <div className="form-group">
            <h3 className="form-label mt-4">Log In</h3>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button type="button" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </React.Fragment >
  );
}

export default Login;