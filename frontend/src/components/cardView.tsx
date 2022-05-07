import React from "react";
import '../css/lux/bootstrap.min.css'
import VerticalCard from "./VerticalCard";
import { Row } from 'react-bootstrap';

const cardView: React.FC = () => {

    return (
        <React.Fragment>
            <Row>
            <VerticalCard productId={1} />
            <VerticalCard productId={2} />
            <VerticalCard productId={3} />
            <VerticalCard productId={4} />
            </Row>
        </React.Fragment>
    );
}

export default cardView;