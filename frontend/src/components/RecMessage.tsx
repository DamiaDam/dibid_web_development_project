import React from "react";
import "../css/chat.css"
import { Message } from "../interfaces";

interface MessageCardInterface {
    message: Message;
}
const RecMessage: React.FC<MessageCardInterface> = ({ message }) => {
    return (
        <React.Fragment>
            <div className="message my-2">
                <div className="message__outer">
                    <div className="message__avatar"></div>
                    <div className="message__inner">
                        <div className="message__spacer"></div>
                        <div className="message__actions"></div>
                        <div className="message__bubble  message__bubble__receive">
                            <div className="px-2">{message.messageText}</div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}

export default RecMessage;