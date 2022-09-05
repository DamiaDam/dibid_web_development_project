import { Body, Controller, Post } from "@nestjs/common";
import { chatDTO, chatResponseDTO } from "src/dto/messages.dto";
import { Message } from "./messages.entity";
import { MessageService } from "./messages.service";

@Controller('messages')
export class MessageController {
    constructor(private readonly messagesService: MessageService) { }

    @Post('getUsersChat')
    async getChat(@Body() users: chatDTO): Promise<chatResponseDTO> {
        const sendermesssges = await this.messagesService.findMessages(users.senderUsername, users.receiverUsername);
        const receivermessages = await this.messagesService.findMessages(users.receiverUsername, users.senderUsername);

        return { messages: sendermesssges.concat(receivermessages) };
    }

}