import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({name: 'countries', synchronize: true})
export class Country {

  @PrimaryColumn()
  name: string;
}
