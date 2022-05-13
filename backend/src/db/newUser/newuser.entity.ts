import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column("int")
  longitude: number;

  @Column("int")
  latitude: number;

  @Column('bool', { default: 0 })
  admin: boolean;

  @Column({ type: 'bool', default: 0 })
  validated: boolean;
}