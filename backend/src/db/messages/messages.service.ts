import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatDTO, chatResponseDTO } from "src/dto/messages.dto";
import { Repository } from "typeorm";
import { Message } from "./messages.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) { }

    async findMessages(senderUsername: string, receiverUsername: string): Promise<Message[]> {
        return this.messagesRepository
            .createQueryBuilder('messages')
            .where('messages.sender = :usrnm', { usrnm: senderUsername })
            .andWhere('messages.receiver = :usrnm', { usrnm: receiverUsername })
            .getMany();


    }
}