import { Injectable } from '@nestjs/common';
import { ProductResponse } from 'src/dto/product.interface';

@Injectable()
export class ProductService {
  getProductById(productId: string): ProductResponse {
    const returnData: ProductResponse =
    {
      name: "Malakia"+productId,
      description: "Auto einai ena item me product id "+productId,
      exists: true,
      imgUrl: "../src/images/dildo.png",
      price: 5,
      productId: +productId,
      productUrl: "#"
    };

    console.log('Get product data for product with ID '+productId);
    return returnData;
  }
}
