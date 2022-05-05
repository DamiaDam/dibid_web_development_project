import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup, Form, Container } from 'react-bootstrap';
import { WALLET_BACKEND } from '../../config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from '../../interfaces';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const POST_URL = `${WALLET_BACKEND}/uauth/login`; 
const AUTH_URL = `${WALLET_BACKEND}/op/auth`;


const Login: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const goToWallet = useCallback(() => navigate(state?.path || "/", {replace: true}), [navigate]);

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

        await axios.post<LoginResponseDTO>(POST_URL,loginRequest
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
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </React.Fragment>
  );
}

export default Login;