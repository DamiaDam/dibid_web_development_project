import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';
import { Bid } from './bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
  ) {}

  async submitBid(bid: Bid): Promise<void> {
    await this.bidsRepository.save(bid);
  }

  async findAllBidsOnProduct(product: ProductItem): Promise<Bid[]> {

    return await this.bidsRepository
      .createQueryBuilder('bid')
      .leftJoinAndSelect("bid.product", "products")
      .leftJoinAndSelect("bid.bidder", "user")
      .where('products.productId = :productId', {productId: product.productId})
      .getMany();
  }
}