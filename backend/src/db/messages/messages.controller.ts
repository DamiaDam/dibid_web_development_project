import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { chatDTO, chatResponseDTO, sendMessagesDTO, sendMessagesResponseDTO } from "src/dto/messages.dto";
import { UserService } from "../user/user.service";
import { Message } from "./messages.entity";
import { MessageService } from "./messages.service";

@Controller('messages')
export class MessageController {
    constructor(private readonly messagesService: MessageService, private readonly userService: UserService) { }

    @Post('getUsersChat')
    @UseGuards(AuthGuard)
    async getChat(@Body() users: chatDTO): Promise<chatResponseDTO[]> {
        const sendermesssges = await this.messagesService.findMessages(users.senderUsername, users.receiverUsername);
        const receivermessages = await this.messagesService.findMessages(users.receiverUsername, users.senderUsername);
        var messages = sendermesssges.concat(receivermessages);
        var returnList: chatResponseDTO[] = [];
        messages.forEach((element) => {
            returnList.push({
                messageId: element.id,
                messageText: element.messageText,
                timeStamp: element.timeStamp,
                sent: (users.senderUsername === element.senderUsername)
            });
        });
        returnList.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime())
        return returnList;
    }

    @Post('sendMessage')
    @UseGuards(AuthGuard)
    async sendMessage(@Body() messageInfo: sendMessagesDTO): Promise<sendMessagesResponseDTO> {
        console.log(messageInfo);
        var newMessage: Message = new Message;
        newMessage.messageText = messageInfo.messageText;
        newMessage.senderUsername = messageInfo.senderUsername;
        newMessage.receiverUsername = messageInfo.receiverUsername;
        newMessage.sender = await this.userService.findByUsername(messageInfo.senderUsername);
        newMessage.receiver = await this.userService.findByUsername(messageInfo.receiverUsername);
        newMessage.timeStamp = new Date();
        console.log(newMessage.timeStamp);

        await this.messagesService.insertMessage(messageInfo.senderUsername, messageInfo.senderUsername, newMessage);


        return { success: true };
    }

    @Get('getUsersChats/:username')
    @UseGuards(AuthGuard)
    async getUsersChats(
        @Param('username') username: string
    ): Promise<string[]> {
        return await this.messagesService.getChats(username);
    }
}