import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { LocationProps, LoginRequestDTO, LoginResponseDTO } from '../interfaces';
import '../css/lux/bootstrap.min.css';
import { Alert, Button, Container, Form, FormGroup } from 'react-bootstrap';
import { isAdmin, isValidated } from './AuthGuard';

const POST_URL = `${BACKEND_URL}/login`;

const Login: React.FC = () => {

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const [error, setError] = useState<string>("");

  const goToMainPage = () => {

    if (isAdmin())
      navigate('/users/allusers');
    else if (!isValidated())
      navigate('/pending');
    else if (state?.path)
      navigate(state.path);
    else
      navigate('/');
  }

  const login = async () => {
    const user = username.current?.value
    const pass = password.current?.value;
    if (user === undefined || user === "") {
      handleError('No username was given')
      return;
    }
    if (pass === undefined || pass === "") {
      handleError('No password was given');
      return;
    }
    const loginRequest: LoginRequestDTO = {
      username: user,
      password: pass
    }

    await axios.post<LoginResponseDTO>(POST_URL, loginRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apptoken')}`
        }
      }
    ).then(res => {
      console.log(res);
      if (!res.data || (res.data.username === "access-denied" && res.data.apptoken === "")) {
        handleError("Access Denied! Wrong username-password combination.");
      }
      else {
        localStorage.setItem("apptoken", res.data.apptoken);
        goToMainPage();
      }
    });
  };

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
          <FormGroup className="form-group">
            <h3 className="form-label mt-4">Log In</h3>
            <Form.Floating className="form-floating mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && login()} type="text" ref={username} className="form-control" id="username" placeholder="Username" required />
              <label htmlFor="username">Username</label>
            </Form.Floating>
            <Form.Floating className="form-floating mb-3">
              <input onKeyPress={(e) => e.key === 'Enter' && login()} type="password" ref={password} className="form-control" id="password" placeholder="Password" required />
              <Alert variant="danger" show={false}>Passwords must match</Alert>
              <label htmlFor="password">Password</label>
            </Form.Floating>
          </FormGroup>
          {error && <p className="err">
            {error}
          </p>
          }
          <Button size='sm' type="button" className='btn button-primary rounded' onClick={login}>Log In</Button>
        </Form>
      </Container>
    </React.Fragment >
  );
}

export default Login;