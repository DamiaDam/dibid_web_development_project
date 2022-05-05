import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { WALLET_BACKEND } from '../config';
import { LocationProps, RegisterDTO, RegisterResponseDTO } from '../interfaces';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

const POST_URL = `${WALLET_BACKEND}/register`;

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rptpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const tin = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const goToWallet = useCallback(() => navigate(state?.path || "/", { replace: true }), [navigate]);

  const register = async () => {
    const user = username.current?.value
    const pass = password.current?.value;
    const rptpass = rptpassword.current?.value;
    const emailaddr = email.current?.value;
    const phoneno = phone.current?.value;
    const tinno = tin.current?.value;
    const countryy = country.current?.value;
    const addresss = address.current?.value;

    if (user === undefined || user === "")
      throw new Error('No username was given');
    if (pass === undefined || pass === "")
      throw new Error('No password was given');
    if (rptpass === undefined || rptpass === "")
      throw new Error('No repeat password was given');
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

    if (pass != rptpass)
      throw new Error('Passwords do not match');

    const registerRequest: RegisterDTO = {
      username: user,
      password: pass,
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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Confirm your email"
                  icon="exclamation-triangle"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                />
              </div>
              <div className="text-center">
                <Button color="primary">Register</Button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}

export default Register;