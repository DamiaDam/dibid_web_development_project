import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { Col, Row } from "react-bootstrap";
import MessageboardSideMenu from "./MessageBoardSideMenu";
import "../css/chat.css"
import RecMessage from "./RecMessage";
import SenMessage from "./SenMessage";
import { Message } from "../interfaces";

const MessageCard: React.FC<Message> = ({ messageText }) => { return (<React.Fragment></React.Fragment>) }

const MessageBoard: React.FC = () => {

    return (
        <React.Fragment>
            <h3>Messages</h3>
            <Row xs='auto'>
                <MessageboardSideMenu />
                <Col md={9}>
                    <SenMessage messageText="Sent message" />
                    <RecMessage messageText="Received message" />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MessageBoard;