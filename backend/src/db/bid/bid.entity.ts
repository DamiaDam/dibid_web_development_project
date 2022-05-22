import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { ProductItem } from '../productItem/productItem.entity';
import { BidsTable } from '../bids/bids.entity';

@Entity({ name: 'bid', synchronize: true })
export class Bid {
    @PrimaryColumn()
    bidId: number;

    @Column('float')
    price: number;

    @ManyToOne(() => BidsTable, (bidsTable) => bidsTable.bids)
    bidsTable: BidsTable;

    @ManyToOne(() => User, (user) => user.bids)
    user: User;

    @Column()
    timeOfBid: number;

    @Column()
    location: string;
}
