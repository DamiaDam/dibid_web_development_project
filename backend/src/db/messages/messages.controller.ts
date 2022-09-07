import { Body, Controller, Post } from "@nestjs/common";
import { chatDTO, chatResponseDTO, sendMessagesDTO, sendMessagesResponseDTO } from "src/dto/messages.dto";
import { UserService } from "../user/user.service";
import { Message } from "./messages.entity";
import { MessageService } from "./messages.service";

@Controller('messages')
export class MessageController {
    constructor(private readonly messagesService: MessageService, private readonly userService: UserService) { }

    @Post('getUsersChat')
    async getChat(@Body() users: chatDTO): Promise<chatResponseDTO[]> {
        const sendermesssges = await this.messagesService.findMessages(users.senderUsername, users.receiverUsername);
        const receivermessages = await this.messagesService.findMessages(users.receiverUsername, users.senderUsername);
        var messages = sendermesssges.concat(receivermessages);
        var returnList: chatResponseDTO[] = [];
        messages.forEach((element) => {
            returnList.push({
                messageText: element.messageText,
                timeStamp: element.timeStamp,
                sent: (users.senderUsername === element.sender.username)
            });
        });
        return returnList;
    }

    @Post('sendMessage')
    async sendMessage(@Body() messageInfo: sendMessagesDTO): Promise<sendMessagesResponseDTO> {
        var newMessage: Message;
        newMessage.messageText = messageInfo.messageText;
        newMessage.senderUsername = messageInfo.senderUsername;
        newMessage.receiverUsername = messageInfo.receiverUsername;
        newMessage.sender = await this.userService.findByUsername(messageInfo.senderUsername);
        newMessage.receiver = await this.userService.findByUsername(messageInfo.receiverUsername);
        newMessage.timeStamp = new Date();
        console.log(newMessage.timeStamp);

        await this.messagesService.insertMessage(messageInfo.senderUsername, messageInfo.senderUsername, newMessage);


        return;
    }

}