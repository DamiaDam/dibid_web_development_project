import React, { Component, useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Container, Button, FormControl, Form, ListGroup, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationProps } from './types/LocationProps';
import dibidLogo from '../images/dibid.png';
import decode from 'jwt-decode';
import '../App.css'
import '../css/lux/bootstrap.min.css';

const ProductShowCase: React.FC = () => {

    return (
        <React.Fragment>
            <Container className='mb-4'>
                <Row>
                    <Col>
                        <img></img>
                    </Col>
                    <Col className='info'>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );

}

export default ProductShowCase;