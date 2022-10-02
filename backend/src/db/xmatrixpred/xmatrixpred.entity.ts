import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'xmatrixpred', synchronize: true })
export class xMatrixPred {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    productId: number;

    @Column()
    rating: number;

}