import { Message } from "src/db/messages/messages.entity";
import { User } from "src/db/user/user.entity";

export interface chatDTO {
    senderUsername: string;
    receiverUsername: string;
}
export interface chatResponseDTO {
    messageId: number;
    messageText: string;
    timeStamp: Date;
    sent: boolean;
}

export interface sendMessagesDTO {
    messageId: number;
    messageText: string;
    senderUsername: string;
    receiverUsername: string;
}

export interface sendMessagesResponseDTO {
    success: boolean;
}

export interface recMessagesCountDTO {
    username: string;
    lastSeen: Date;
}
export interface recMessagesCountResponseDTO {
    newMessages: number;

}