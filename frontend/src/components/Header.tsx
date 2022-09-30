import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationProps, recMessagesCountDTO } from '../interfaces';
import dibidLogo from '../images/dibid.png';
import '../css/App.css'
import '../css/lux/bootstrap.min.css';
import { isAdmin, isAuthenticated } from './AuthGuard';
import { getUsernameFromApptoken } from '../utils';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const Header: React.FC = () => {

  const searchBar = useRef<HTMLInputElement>(null);

  const { state } = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(
    () => {
      setLoggedIn(isAuthenticated());
    }, []
  )

  const [isAdminFlag, setisAdmin] = useState<boolean>(false);
  useEffect(
    () => {
      setisAdmin(isAdmin());
    }, []
  )

  useEffect(
    () => {
      console.log('hiiiiiiiiii, state: ', state);
    }, []
  )

  function logout() {
    localStorage.removeItem('apptoken');
    navigate('/home', { state: state });
  }
  const login = async () => {
    navigate('/login', { state: state });
  };
  const register = async () => {
    navigate('/register', { state: state });
  };
  const users = async () => {
    navigate('/users/allUsers', { state: state });
  };
  const myAuctions = async () => {
    navigate('/manage-auctions', { state: state });
  };
  const messages = async () => {
    navigate('/messages/' + getUsernameFromApptoken() + '/unknown', { state: { flag: true } });
  }

  const searchAuctions = async () => {
    navigate('/auctions', {
      state: {
        searchTextParam: searchBar.current?.value,
        state: state
      }
    });
    window.location.reload();
  };

  const [numberOfNewMessages, setNumberOfNewMessages] = useState<number>(0);

  useEffect(() => {
    const getNumberOfReceivedMessages = async () => {
      if (loggedIn) {
        const infoUser: recMessagesCountDTO = {
          username: getUsernameFromApptoken()
        }
        await axios.post(BACKEND_URL + '/messages/newMessagesCount', infoUser, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apptoken')}`
          }
        }).then(res => {
          console.log(res.data);
          setNumberOfNewMessages(res.data.newMessages)
        }
        )
      }
    }

    getNumberOfReceivedMessages();

  }, [loggedIn])

  return (
    <React.Fragment>
      <Navbar bg="light" expand="sm" sticky='top'>
        <Container fluid >
          <Navbar.Brand href="/"><img className="main-logo" src={dibidLogo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>

            <Col xs={5}>
              <Form.Control className='rounded' onKeyPress={(e) => e.key === 'Enter' && searchAuctions()} placeholder="Search anything" ref={searchBar} />
            </Col>
            <Col className='ps-1'>
              <Button type="button" className="btn btn-secondary" onClick={searchAuctions}>
                <svg width="15px" height="15px">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                </svg>
              </Button>

            </Col>
            {!loggedIn
              ?
              <React.Fragment>
                <div className='underline-on-hover' ><a onClick={login} className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>login</a></div>
                /
                <div className='underline-on-hover' ><a onClick={register} className='ps-2 pe-4 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>register</a></div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className='underline-on-hover' ><a href='#' className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>Welcome {getUsernameFromApptoken()}</a></div>
                /
                <div className='underline-on-hover' >
                  <a onClick={messages} className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    My messages
                    <div className='badge'>
                      {numberOfNewMessages}
                    </div>
                  </a>
                </div>
                {isAdminFlag &&
                  <React.Fragment>
                    /
                    <div className='underline-on-hover' ><a onClick={users} className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>Manage Users</a></div>
                  </React.Fragment>
                }
                /
                <div className='underline-on-hover' ><a onClick={myAuctions} className='px-2 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>My Auctions</a></div>
                /
                <div className='underline-on-hover' ><a onClick={logout} className='ps-2 pe-4 form-text' style={{ textDecoration: 'none', cursor: 'pointer' }}>logout</a></div>
              </React.Fragment>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: "100%", height: "1px", backgroundColor: "black" }} />
    </React.Fragment>
  );
};

export default Header;