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
        exists: true,
        name: product.name,
        imgUrl: product.imgUrl,
        price: product.buyPrice,
        description: product.description
      }
    }
    else {
      return {
        productId: -1,
        exists: false,
        name: "",
        imgUrl: "",
        price: -1,
        description: ""
      }
    }
  }

  async insertProduct(product: ProductItem, username: string): Promise<{ 'success': boolean }> {
    console.log('test!!!');
    await this.productRepository.save(product);
    // await this.UserService.connectUserToProduct(username, product);
    return { "success": true }
  }

  // async getAllCountries(): Promise<string[]> {
  //   const countries: Country[] = await this.countriesRepository.find();

  //   const countryList: string[] = []

  //   countries.forEach(country => {
  //     countryList.push(country.name);
  //   });

  //   return countryList;//this.countriesRepository.find();
  // }
}