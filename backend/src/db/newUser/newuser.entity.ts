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

  @Column({ default: false })
  validated: boolean;

  @Column({ default: 0.0 })
  longitude: number;

  @Column({ default: 0.0 })
  latitude: number;

  @Column({ default: false })
  admin: boolean;
}
