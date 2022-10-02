import { Body, Headers, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { chatDTO, chatResponseDTO, recMessagesCountDTO, recMessagesCountResponseDTO, sendMessagesDTO, sendMessagesResponseDTO } from "src/dto/messages.dto";
import { UserService } from "../user/user.service";
import { Message } from "./messages.entity";
import { MessageService } from "./messages.service";

@Controller('messages')
export class MessageController {
    constructor(private readonly messagesService: MessageService, private readonly userService: UserService, private readonly authService: AuthService) { }

    @Post('getUsersChat')
    @UseGuards(AuthGuard)
    async getChat(@Body() users: chatDTO, @Headers('authorization') headers): Promise<chatResponseDTO[]> {
        let token: string = ""
        try {
            token = headers.split(" ")[1];
        }
        catch {
            return [];
        }
        const loggedUser = this.authService.getUsername(token);
        if (loggedUser === users.senderUsername) {

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
        return [];

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

    @Post('newMessagesCount')
    @UseGuards(AuthGuard)
    async newMessagesCount(@Body() userInfo: recMessagesCountDTO): Promise<recMessagesCountResponseDTO> {
        const receivedMessages = await this.messagesService.getReceivedMessages(userInfo.username);
        var retVal: Message[] = []
        const user = await this.userService.findByUsername(userInfo.username);
        receivedMessages.forEach(element => {
            if (element.timeStamp > user.lastAccessedMessages) {
                retVal.push(element);
            }
        })

        return { newMessages: retVal.length };
    }
}