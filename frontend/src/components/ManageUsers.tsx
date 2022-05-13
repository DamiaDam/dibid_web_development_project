import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import profile from '../images/profile.png';

const ManageUsers: React.FC = () => {


    return (
        <React.Fragment>

    <Card style={{display: 'flex', flexDirection: 'row', width: '12rem'}}>
    <Card.Img variant="top" src={profile} style= {{backgroundAttachment: 'fixed'}}/>
    <Card.Body>
        
        <Card.Title>Bilis Markopoulos</Card.Title>
        <Card.Text>Email: sefhsifhfehu@gmail.com</Card.Text>
        <Card.Text>Phone number: 6957349857</Card.Text>
        <Row>
            <Button href="#" className="accept">ACCEPT <span className="fa fa-check"></span></Button>
        </Row>
        <Row>
            <Button href="#" className="accept">ACCEPT <span className="fa fa-check"></span></Button>
        </Row>

    </Card.Body>
    </Card>

    <Card style={{display: 'flex', flexDirection: 'row', width: '12rem'}}>
    <Card.Img variant="top" src={profile} style= {{backgroundAttachment: 'fixed'}}/>
    <Card.Body>
        
        <Card.Title>Bilis Markopoulos</Card.Title>
        <Card.Text>Email: sefhsifhfehu@gmail.com</Card.Text>
        <Card.Text>Phone number: 6957349857</Card.Text>
        <Row>
            <Button href="#" className="accept">ACCEPT <span className="fa fa-check"></span></Button>
        </Row>
        <Row>
            <Button href="#" className="accept">ACCEPT <span className="fa fa-check"></span></Button>
        </Row>

    </Card.Body>
    </Card>
        </React.Fragment>

    );
}


export default ManageUsers


