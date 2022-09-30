import React from "react";
import "../css/lux/bootstrap.min.css";
import VerticalCard from "./VerticalCard";
import { Button, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationProps } from "../interfaces";

const PopUpSuccess: React.FC = () => {

    const { state } = useLocation() as unknown as LocationProps;
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your product has been submitted.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => navigate('/', { state: state })}>OK</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </React.Fragment>
    );
};

export default PopUpSuccess;
