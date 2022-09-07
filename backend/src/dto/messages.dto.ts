import { Message } from "src/db/messages/messages.entity";
import { User } from "src/db/user/user.entity";

export interface chatDTO {
    senderUsername: string;
    receiverUsername: string;
}
export interface chatResponseDTO {
    messageText: string;
    timeStamp: Date;
    sent: boolean;
}

export interface sendMessagesDTO {
    messageText: string;
    senderUsername: string;
    receiverUsername: string;
}

export interface sendMessagesResponseDTO {
    success: boolean;
}