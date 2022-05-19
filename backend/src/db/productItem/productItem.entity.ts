import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { NewUser } from '../newUser/newuser.entity';

@Entity({ name: 'products', synchronize: true })
export class ProductItem {

  @PrimaryGeneratedColumn()
  productId!: number;

  @PrimaryColumn()
  name: string;

  @Column()
  imgUrl: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  productUrl: string;

  @ManyToOne(() => NewUser, (user) => user.products)
  user: NewUser;
}