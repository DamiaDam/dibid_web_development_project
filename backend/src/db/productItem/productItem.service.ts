import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductResponse } from 'src/dto/product.interface';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ProductItem } from './productItem.entity';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private productRepository: Repository<ProductItem>,
    private readonly UserService: UserService
  ) { }

  async getProductById(id: number): Promise<ProductResponse> {
    const product: ProductItem = await this.productRepository.findOneBy({ productId: id })
    if (product) {
      return {
        productId: id,
        name: product.name,
        imgUrl: product.imgUrl,
        currentBid: product.currentBid,
        buyPrice: product.buyPrice,
        firstBid: product.firstBid,
        numberOfBids: product.numberOfBids,
        startingDate: product.startingDate,
        endingDate: product.endingDate,    
        description: product.description,
        location: product.location,
        longitude: product.longitude,
        latitude: product.latitude,
      }
    }
    else {
      return {
        productId: -1,
        name: "",
        imgUrl: "",
        currentBid: 0,
        buyPrice: 0,
        firstBid: 0,
        numberOfBids: 0,
        startingDate: 0,
        endingDate: 0,    
        description: "",
        location: "",
        longitude: 0,
        latitude: 0,
      }
    }
  }

  async getProductEntityById(id: number): Promise<ProductItem> {
    return await this.productRepository.findOneBy({ productId: id })
  }

  async getAllProductIds(): Promise<number[]> {
    const res: number[] = []
    const products: ProductItem[] =  await this.productRepository.find();
    products.forEach(product => {
      res.push(product.productId);
    });
    return res;
  }

  async insertProduct(product: ProductItem, username: string): Promise<{ 'success': boolean }> {
    console.log('test!!!');
    await this.productRepository.save(product);
    // await this.UserService.connectUserToProduct(username, product);
    return { "success": true }
  }

  async updateItemAfterBid(productId: number, bid: number): Promise<{ 'success': boolean }> {

    const product: ProductItem = await this.getProductEntityById(productId);
    const numberOfBids: number = product.numberOfBids + 1;

    await this.productRepository
      .createQueryBuilder()
      .update("products")
      .set({ numberOfBids: numberOfBids, currentBid: bid })
      .where("products.productId = :productId", { productId: productId })
      .execute();
    return { success: true };
  }
}