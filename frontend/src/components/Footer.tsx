import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import dibidLogo from '../images/dibid.png';
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <React.Fragment>
        <div style={{width:"100%", height:"1px", backgroundColor:"black" }}/>
        <MDBFooter className="font-small pt-4 mt-4 style={{ position: 'absolute',left: 0,bottom: 0,right: 0}}" >
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol>
                        <img className="main-logo" src={dibidLogo} />
                    </MDBCol>
                    {/* <MDBCol md="6">
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
                    </MDBCol> */}
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="/"> dibid.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
        </React.Fragment>
    );
}

export default Footer