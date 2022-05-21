import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

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

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}