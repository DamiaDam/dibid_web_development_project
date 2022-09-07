import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatDTO, chatResponseDTO, sendMessagesResponseDTO } from "src/dto/messages.dto";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { Message } from "./messages.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        private readonly userServices: UserService
    ) { }

    async findMessages(senderUsername: string, receiverUsername: string): Promise<Message[]> {
        return this.messagesRepository
            .createQueryBuilder('messages')
            .where('messages.sender = :usrnm', { usrnm: senderUsername })
            .andWhere('messages.receiver = :usrnm', { usrnm: receiverUsername })
            .getMany();


    }

    async insertMessage(senderUsername: string, receiverUsername: string, message: Message): Promise<sendMessagesResponseDTO> {
        await this.messagesRepository.save(message);
        await this.userServices.connectUserToMessage(senderUsername, receiverUsername, message);
        return { success: true };
    }

    // async getMessageById(messageId: number): Promise<Message> {
    //     return await this.messagesRepository
    //         .createQueryBuilder('messages')
    //         .where('messages.id = :id', { id: messageId })
    //         .getOne();
    // }
}