import React from "react";
import "../css/lux/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

export interface PopUpDeleteInterface {
    show: boolean;
    deleteProduct: () => void;
    handleClose: () => void;
}

const PopUpDelete: React.FC<PopUpDeleteInterface> = ({show, deleteProduct, handleClose}) => {

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this auction?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => deleteProduct()}>Delete</Button>
                        <Button variant="primary" onClick={() => handleClose()}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </React.Fragment>
    );
};

export default PopUpDelete;
