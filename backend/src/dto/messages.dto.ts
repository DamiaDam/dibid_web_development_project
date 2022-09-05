import { Message } from "src/db/messages/messages.entity";
import { User } from "src/db/user/user.entity";

export interface chatDTO {
    senderUsername: string;
    receiverUsername: string;
}

export interface chatResponseDTO {
    messages: Message[];
}