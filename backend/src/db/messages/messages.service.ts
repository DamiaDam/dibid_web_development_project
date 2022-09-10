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
        return await this.messagesRepository
            .createQueryBuilder('messages')
            .where('messages.senderUsername = :usrnm1', { usrnm1: senderUsername })
            .andWhere('messages.receiverUsername = :usrnm2', { usrnm2: receiverUsername })
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

    async getChats(username: string): Promise<string[]> {
        var sent = await this.messagesRepository
            .createQueryBuilder('messages')
            .where('messages.senderUsername = :usrnm1', { usrnm1: username })
            .getMany();
        var ret: string[] = [];
        sent.forEach(element => {
            ret.push(element.receiverUsername);
        });

        var rec = await this.messagesRepository
            .createQueryBuilder('messages')
            .where('messages.receiverUsername = :usrnm2', { usrnm2: username })
            .getMany();

        rec.forEach(element => {
            ret.push(element.senderUsername);
        });

        ret.sort(function (a, b) {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });

        var unique = ret.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        })
        console.log(unique);
        return unique;
    }
}