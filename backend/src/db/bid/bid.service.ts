import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';
import { ProductItemService } from '../productItem/productItem.service';
import { Bid } from './bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
    private readonly productService: ProductItemService
  ) { }

  async submitBid(bid: Bid): Promise<void> {
    await this.bidsRepository.save(bid);
  }

  async findAllBidsOnProduct(product: ProductItem): Promise<Bid[]> {

    return await this.bidsRepository
      .createQueryBuilder('bid')
      .leftJoinAndSelect("bid.product", "products")
      .leftJoinAndSelect("bid.bidder", "user")
      .where('products.productId = :productId', { productId: product.productId })
      .getMany();
  }

  async findAllBidsOnProductId(productId: string): Promise<Bid[]> {

    return await this.bidsRepository
      .createQueryBuilder('bid')
      .leftJoinAndSelect("bid.product", "products")
      .leftJoinAndSelect("bid.bidder", "user")
      .where('products.productId = :productId', { productId: +productId })
      .getMany();
  }

  async getAllBidedWonProducts(username: string): Promise<number[]> {
    return await this.productService.getAllBidedWonProducts(username);
  }

  async getAllBidedProducts(username: string): Promise<number[]> {
    const retprod = await this.bidsRepository
      .createQueryBuilder("bid")
      .where('bid.bidderUsername  = :username', { username: username })
      .getMany();
    var retprodId: number[] = [];
    retprod.forEach((elem) => {
      retprodId.push(elem.productId);
    });

    return [...new Set(retprodId)];
  }

  async getAllBidedStillActiveProducts(username: string): Promise<number[]> {
    const retprod = await this.bidsRepository
      .createQueryBuilder("bid")
      .where('bid.bidderUsername  = :username', { username: username })
      .getMany();
    var retprodId: number[] = [];
    for (const elem of retprod) {
      const product = await this.productService.getProductEntityById(elem.productId)
      if (product.active === true)
        retprodId.push(elem.productId);
    }
    return [...new Set(retprodId)];
  }
}