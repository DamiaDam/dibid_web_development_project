import React from "react";
import "../css/lux/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

export interface PopUpConfirmInterface {
    price: number;
    submitBid: (amount: number) => void;
    show: boolean;
    handleClose: () => void;
}

const PopUpConfirm: React.FC<PopUpConfirmInterface> = ({price, submitBid, show, handleClose}) => {

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to submit a bid for ${price}?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => submitBid(price)}>Submit Bid</Button>
                        <Button variant="primary" onClick={() => handleClose()}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </React.Fragment>
    );
};

export default PopUpConfirm;
