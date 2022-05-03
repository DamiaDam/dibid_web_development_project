import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { WALLET_BACKEND } from '../config';
import { LocationProps, RegisterDTO, RegisterResponseDTO } from '../interfaces';

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

  const goToWallet = useCallback(() => navigate(state?.path || "/", {replace: true}), [navigate]);

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

        await axios.post<RegisterResponseDTO>(POST_URL,registerRequest
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
      <div id = "home-content">
        <div className = "gunet-container">
          <h1>Register</h1>
          <span>Welcome to dibid</span>
          <div>
          &nbsp; &nbsp; &nbsp;
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                username
              </InputGroup.Text>
              <FormControl ref={username} id="username" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                password
              </InputGroup.Text>
              <FormControl ref={password} id="password" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                repeat password
              </InputGroup.Text>
              <FormControl ref={rptpassword} id="rpt-password" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                email
              </InputGroup.Text>
              <FormControl ref={email} id="email" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                phone
              </InputGroup.Text>
              <FormControl ref={phone} id="phone" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                tin
              </InputGroup.Text>
              <FormControl ref={tin} id="tin" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                country
              </InputGroup.Text>
              <FormControl ref={country} id="country" aria-describedby="basic-addon3" />

              <InputGroup.Text id="basic-addon3">
                Address
              </InputGroup.Text>
              <FormControl ref={address} id="address" aria-describedby="basic-addon3" />

            </InputGroup>

            <Button onClick={register} variant="primary"> 
              Register Wallet
            </Button>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;