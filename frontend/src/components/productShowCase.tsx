import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../css/App.css'
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