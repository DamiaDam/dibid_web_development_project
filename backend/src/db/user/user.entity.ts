import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';
import { Bid } from '../bid/bid.entity';

@Entity({ name: 'users', synchronize: true })
export class User {

  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  tin: string;

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column('float', { default: 0.0 })
  longitude: number;

  @Column('float', { default: 0.0 })
  latitude: number;

  @Column('bool', { default: 0 })
  admin: boolean;

  @Column('bool', { default: 0 })
  validated: boolean;

  @Column('float', { default: 0 })
  sellerRating: number;

  @Column('float', { default: 0 })
  bidderRating: number;

  @OneToMany(() => ProductItem, (products) => products.seller)
  products: ProductItem[];

  @OneToMany(() => Bid, (bids) => bids.user)
  bids: Bid[];

}