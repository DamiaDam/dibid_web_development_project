import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import otherImg from '../images/categories/other.png';

interface CategoryProps {
    name?: string;
}

const Category: React.FC<CategoryProps> = ({name}) => {

    const params = useParams();

    return (
        <React.Fragment>
            <Container>

                <h1>{params.cat}</h1>
                <Row>
                    <Col>
                        <b style = {{fontSize: '18px'}}>Shop by category</b>
                        <ul>
                            <li style={{fontWeight: '1000'}} className='underline-on-hover'>Sub category 1</li>
                            <li style={{fontWeight: '1000'}} className='underline-on-hover'>Sub category 1</li>
                            <li style={{fontWeight: '1000'}} className='underline-on-hover'>Sub category 1</li>
                            <li style={{fontWeight: '1000'}} className='underline-on-hover'>Sub category 1</li>
                        </ul>
                    </Col>

                    <Col>
                        <Card style={{ width: '15rem' }}>
                            <Card.Link><Card.Img variant="top" src={otherImg}/></Card.Link>
                            <Card.Body>
                                <Card.Text style={{fontWeight: '1000'}} className='underline-on-hover' >Sub Category1</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card style={{ width: '15rem' }}>
                            <Card.Link><Card.Img variant="top" src={otherImg}/></Card.Link>
                            <Card.Body>
                                <Card.Text style={{fontWeight: '1000'}} className='underline-on-hover' >Sub Category1</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card style={{ width: '15rem' }}>
                            <Card.Link><Card.Img variant="top" src={otherImg}/></Card.Link>
                            <Card.Body>
                                <Card.Text style={{fontWeight: '1000'}} className='underline-on-hover' >Sub Category1</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card style={{ width: '15rem' }}>
                            <Card.Link><Card.Img variant="top" src={otherImg}/></Card.Link>
                            <Card.Body>
                                <Card.Text style={{fontWeight: '1000'}} className='underline-on-hover' >Sub Category1</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>

        
        </React.Fragment>

    );
}

export default Category