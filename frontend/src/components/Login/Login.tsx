import axios from 'axios';
import React, { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WALLET_BACKEND } from '../../config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from '../../interfaces';
import '../../css/lux/bootstrap.min.css';

const POST_URL = `${WALLET_BACKEND}/uauth/login`;

const Login: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;

  const goToWallet = useCallback(() => navigate(state?.path || "/", { replace: true }), [navigate, state?.path]);

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
      if(!res.data || (res.data.username==="access-denied" && res.data.apptoken===""))
      {
        console.log('Access Denied - wrong username and/or password');
      }
      else
      {
        localStorage.setItem("apptoken", res.data.apptoken);
        goToWallet();
      }
    });
  };

  return (
    <React.Fragment>
      <div className='container my-4'>
        <form className='text-center'>
          <div className="form-group">
            <h3 className="form-label mt-4">Log In</h3>
            <div className="form-floating mb-3">
              <input type="text" ref={username} className="form-control" id="username" placeholder="Username"></input>
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" ref={password} className="form-control" id="password" placeholder="Password"></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={login}>Log In</button>
        </form>
      </div>
    </React.Fragment >
  );
}

export default Login;