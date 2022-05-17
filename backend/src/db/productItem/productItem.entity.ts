import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products', synchronize: false })
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
}