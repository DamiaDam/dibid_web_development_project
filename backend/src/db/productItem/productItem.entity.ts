import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products', synchronize: true })
export class ProductItem {

  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  productUrl: string;
}