import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { ProductItem } from '../productItem/productItem.entity';
import { Bid } from '../bid/bid.entity';

@Entity({ name: 'location', synchronize: true })
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('float',{nullable:true})
    longtitude: number;

    @Column('float',{nullable:true})
    latitude: number;
}