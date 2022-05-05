import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup, Form, Container } from 'react-bootstrap';
import { WALLET_BACKEND } from '../../config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from '../../interfaces';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import '../../css/lux/bootstrap.min.css';
import '../../css/lux/bootstrap.css';

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
      <MDBContainer>
        <MDBRow>


          <MDBCol md="6">
            <form>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
              <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
              <div className="text-center mt-4">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}

export default Login;