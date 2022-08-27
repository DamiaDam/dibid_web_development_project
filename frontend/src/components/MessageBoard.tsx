import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { Col, Row } from "react-bootstrap";
import MessageboardSideMenu from "./MessageBoardSideMenu";
import "../css/chat.css"

const MessageBoard: React.FC = () => {

    return (
        <React.Fragment>
            <h3>Messages</h3>
            <Row xs='auto'>
                <MessageboardSideMenu />
                <Col md={9}>
                    <div className="message">
                        <div className="message__outer">
                            <div className="message__avatar"></div>
                            <div className="message__inner">
                                <div className="message__bubble">
                                    malakas
                                </div>
                                <div className="message__actions"></div>
                                <div className="message__spacer"></div>
                            </div>
                            <div className="message__status"></div>
                        </div>
                    </div>
                    <div className="message">
                        <div className="message__outer">
                            <div className="message__avatar"></div>
                            <div className="message__inner"><div className="message__spacer"></div>

                                <div className="message__actions"></div>
                                <div className="message__bubble">
                                    malakas
                                </div>
                            </div>
                            <div className="message__status"></div>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MessageBoard;