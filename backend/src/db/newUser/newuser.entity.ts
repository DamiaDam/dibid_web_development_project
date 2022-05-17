import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';

@Entity({ name: 'users', synchronize: true })
export class NewUser {

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

  @Column('float', { default: 0.0 })
  longitude: number;

  @Column('float', { default: 0.0 })
  latitude: number;

  @Column('bool', { default: 0 })
  admin: boolean;

  @Column({ type: 'bool', default: 0 })
  validated: boolean;

  @OneToMany(() => ProductItem, products => products.user)
  products: ProductItem[];
}