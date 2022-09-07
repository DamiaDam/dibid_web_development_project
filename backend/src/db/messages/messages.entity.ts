import internal from "stream";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'messages', synchronize: false })
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    messageText: string;

    @Column()
    timeStamp: Date;

    @ManyToOne(() => User, (sender) => sender.username, { eager: true })
    @JoinColumn([{ name: "senderUsername", referencedColumnName: "username" }])
    sender: User;

    @Column()
    senderUsername: string;

    @ManyToOne(() => User, (receiver) => receiver.username, { eager: true })
    @JoinColumn([{ name: "receiverUsername", referencedColumnName: "username" }])
    receiver: User;

    @Column()
    receiverUsername: string;
}