import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ProductItem } from '../productItem/productItem.entity';
// import { BidsTable } from '../bids/bids.entity';

@Entity({ name: 'bid', synchronize: true })
export class Bid {
    @PrimaryGeneratedColumn()
    bidId: number;

    @Column('float')
    price: number;

    // @ManyToOne(() => BidsTable, (bidsTable) => bidsTable.bids)
    // bidsTable: BidsTable;

    // @ManyToOne(() => User, (user) => user.bids)
    // bidder: User;

    @ManyToOne(() => User, (user) => user.bids, { eager: true })
    @JoinColumn([{ name: "bidderUsername", referencedColumnName: "username" }])
    bidder: User;

    @Column()
    bidderUsername: string

    @ManyToOne(() => ProductItem, (product) => product.productId, { eager: true })
    @JoinColumn([{ name: "productId", referencedColumnName: "productId" }])
    product: ProductItem;

    @Column()
    productId: number

    @Column('bigint')
    timeOfBid: number;

    @Column()
    location: string;

    // @ManyToOne(type => ProductItem, product => product.productId) product: ProductItem;
}
