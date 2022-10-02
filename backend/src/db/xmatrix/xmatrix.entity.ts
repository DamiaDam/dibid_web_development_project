import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'xmatrix', synchronize: true })
export class xMatrix {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    productId: number;

    @Column()
    rating: number;

}