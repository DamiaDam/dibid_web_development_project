// import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
// import { User } from '../user/user.entity';
// import { ProductItem } from '../productItem/productItem.entity';
// import { Bid } from '../bid/bid.entity';

// @Entity({ name: 'bidstable', synchronize: true })
// export class BidsTable {
//     @PrimaryColumn()
//     bidsTableId: number;

//     @OneToOne(()=> ProductItem,(product)=>product.bidsTable)
//     product: ProductItem;

//     @OneToMany(() => Bid, (bids) => bids.bidsTable)
//     bids: Bid[];
// }