import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Bid } from '../bid/bid.entity';
import { Category } from '../category/category.entity';
// import { BidsTable } from '../bids/bids.entity';

@Entity({ name: 'products', synchronize: true })
export class ProductItem {

  @PrimaryGeneratedColumn()
  productId!: number;

  @Column()
  name: string;

  @Column('float')
  currentBid: number;

  @Column()
  imgUrl: string;

  @Column('float',{ nullable: true, default: null })
  buyPrice: number | null;

  @Column('float')
  firstBid: number;

  @Column()
  numberOfBids: number;

  @Column('bigint')
  startingDate: number;

  @Column('bigint')
  endingDate: number;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column('float', { nullable: true })
  longitude: number | null;

  @Column('float', { nullable: true})
  latitude: number | null;

  // @OneToOne(() => BidsTable, (bidsTable) => bidsTable.product)
  // bidsTable: Bid[];
  @OneToMany(() => Bid, bid => bid.product)
  bids: Bid[];

  @ManyToOne(() => User, (seller) => seller.products)
  seller: User;

  @ManyToMany(() => Category, category => category.products)
  @JoinTable()
  categories: Category[]
}