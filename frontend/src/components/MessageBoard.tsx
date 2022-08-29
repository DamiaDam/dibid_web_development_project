import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MessageboardSideMenu from "./MessageBoardSideMenu";
import "../css/chat.css"
import RecMessage from "./RecMessage";
import SenMessage from "./SenMessage";
import { Message } from "../interfaces";
import ScrollToBottom from 'react-scroll-to-bottom';
interface MesssageList {
    messages: Message[]
}

interface MessageCardInterface {
    message: Message;
}


const MessageCard: React.FC<MessageCardInterface> = ({ message }) => {
    return (
        <React.Fragment>
            {message.sent ? <SenMessage message={message} /> : <RecMessage message={message} />}
        </React.Fragment>
    );
}

const UserList: React.FC<MesssageList> = ({ messages }) => {



    const renderList = (): JSX.Element[] => {
        console.log(messages);
        return messages.map((message: Message, index: any) => {
            return (

                <MessageCard message={message} />
            );
        });
    }

    return (
        <React.Fragment>
            {renderList()}
        </React.Fragment>
    );

}


const MessageBoard: React.FC = () => {

    const mssgList: Message[] = [
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
        { sent: true, messageText: 'Sent Message!' },
        { sent: false, messageText: 'Received Message!' },
    ]
    return (
        <React.Fragment>
            <Row xs='auto'>
                <MessageboardSideMenu />
                <Col md={9}>
                    <Row className='rounded' style={{ backgroundColor: '#E2E2E2' }}>
                        <h5 className="my-2 mx-1">User Name</h5>

                    </Row>
                    {/* <ScrollToBottom className='root_css'></ScrollToBottom> */}
                    <Row className="" style={{
                        overflowY: 'scroll',
                        height: '500px',
                        position: "relative",
                        bottom: "0"
                    }}>
                        <UserList messages={mssgList} />
                    </Row>
                    <Row className="pb-2">
                        <Form.Control className="rounded" style={{ width: '95%' }} placeholder="Type a message..." />

                        <Col style={{ width: '5%' }}>
                            <Button type="button" className="btn btn-secondary rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                </svg>
                            </Button>

                        </Col>
                    </Row>
                </Col>
            </Row >
        </React.Fragment >
    );
};

export default MessageBoard;