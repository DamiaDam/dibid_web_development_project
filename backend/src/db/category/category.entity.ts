import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';

@Entity({name: 'categories', synchronize: false})
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => ProductItem, productItem => productItem.categories)
  products: ProductItem[]
}
