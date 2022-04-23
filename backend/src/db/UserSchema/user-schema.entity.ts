import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({name: 'users', synchronize: false})
export class UserSchema {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column({unique: true})
  // did: string;

  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}