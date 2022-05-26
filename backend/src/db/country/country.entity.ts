import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({name: 'countries', synchronize: false})
export class Country {

  @PrimaryColumn()
  name: string;
}
