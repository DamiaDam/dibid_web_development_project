import React from "react";
import "../css/chat.css"
import { Message } from "../interfaces";


const RecMessage: React.FC<Message> = ({ messageText }) => {
    return (<React.Fragment>
        <div className="message">
            <div className="message__outer">
                <div className="message__avatar"></div>
                <div className="message__inner">
                    <div className="message__spacer"></div>
                    <div className="message__actions"></div>
                    <div className="message__bubble">
                        {messageText}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>);

}

export default RecMessage;