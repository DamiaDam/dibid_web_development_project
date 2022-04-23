import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { WALLET_BACKEND } from './config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from './interfaces';



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
  
  
  const register = async () => {
    // In the case where user is redirected to /login
    // but the user selects to create a new wallet (/register route)
    // then the state must be stored
    navigate('/register', {state: state});
  };

  return (
    <React.Fragment>
      <div id = "home-content">
        <div className = "gunet-container">
          <h1>EBSI Wallet</h1>
          <span>Welcome to the EBSI Wallet application</span>
          <div>
          &nbsp; &nbsp; &nbsp;

            {/* <Button text = "Use an existing Wallet" functionCall = {onUseExistingWallet}/> */}
            
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
                username
              </InputGroup.Text>
              <FormControl ref={username} id="username" aria-describedby="basic-addon3" />
              <InputGroup.Text id="basic-addon3">
                password
              </InputGroup.Text>
              <FormControl ref={password} id="password" aria-describedby="basic-addon3" />
            </InputGroup>
            {/* <input ref={password} type="password" id="pw_box"/> */}

            <Button onClick={login} variant="primary"> 
              Login with existing wallet 
            </Button>
            
            <Button  onClick={register} variant="link">
              Create a new wallet
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;