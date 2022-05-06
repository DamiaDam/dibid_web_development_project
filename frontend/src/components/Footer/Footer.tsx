import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import dibidLogo from '../../images/dibid.png';
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <MDBFooter className="font-small pt-4 mt-4" >
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <img className="main-logo" src={dibidLogo} />
                    </MDBCol>
                    <MDBCol md="6">
                        <ul>
                            <li>
                                <h5 className="title">Links</h5>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!">Facebook</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!">Instagram</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!">LinkedIn</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="/"> dibid.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default Footer