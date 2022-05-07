import Card from "react-bootstrap/Card";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import '../css/lux/bootstrap.min.css';
import dildoImg from '../images/dildo.png';
import { WALLET_BACKEND } from '../config';

interface VerticalCardProps {
    productId: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ productId }) => {

    useEffect(() => {
        await axios.get(WALLET_BACKEND + "/product/" + +productId)
    }, [])



    let MAX_LENGTH: number = 20;
    const [showMore, setShowMore] = useState(false);
    const text: string = "Large realistic penis dummy with vibration. Super elastic texture and intense relief that fascinates! With strong suction cup in the base for hands-free situations and adjustable vibrations with a dimmer. Material: TPE / ABS / PVC. Total length 26cm, penetrating length 21.5cm, diameter 5cm. We operate 2 AA batteries (not included).";
    const price: number = productId;
    const currency: string = "EUR";
    let currencySymbol: string = '';
    if (currency == "EUR") {
        currencySymbol = '\u20AC';
    }
    return (
        <React.Fragment>
            <Card style={{ width: '18rem' }} className="rounded-lg">
                <Card.Img variant="top" src={dildoImg} />
                <Card.Body>
                    <Card.Title>
                        <Card.Link href="#" style={{ textDecoration: 'none' }}>NATURE SKIN - REALISTIC VIBE 26CM</Card.Link>
                    </Card.Title>
                    <Card.Text>{currency} {price}{currencySymbol}</Card.Text>
                    <Card.Text>
                        <Card.Link href="#" style={{ textDecoration: 'none' }}>
                            {showMore ? text : `${text.substring(0, 100)}`}
                            <Card.Link onClick={() => setShowMore(!showMore)}>
                                <Card.Text>{showMore ? "Show less..." : "Show more..."}</Card.Text>
                            </Card.Link>


                        </Card.Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment >
    );
}

export default VerticalCard;