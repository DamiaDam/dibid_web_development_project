import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductProps } from 'src/dto/product.interface';
import { ProductItem } from './productItem.entity';
import { ProductItemService } from './productItem.service';
// import { Country } from './country.entity';

@Controller('products')
export class ProductItemController {
  constructor(private readonly ProductItemService: ProductItemService) {}

  // /products/addproduct creates a product in the db with what is provided in the request body
  @Post('addproduct')
  addProduct( @Body() productInfo: ProductProps) {

    // Check if all parameters are given
    if(!productInfo.name || !productInfo.imgUrl || !productInfo.price || !productInfo.description || !productInfo.productUrl)
    {
        console.log('Missing parameter');
        return {"success": false};
    }
    
    var productItem: ProductItem = new ProductItem();
    productItem.productUrl= productInfo.productUrl;
    productItem.name = productInfo.name;
    productItem.price = productInfo.price;
    productItem.description = productInfo.description;
    productItem.imgUrl = productInfo.imgUrl;
    return this.ProductItemService.insertProduct(productItem);


  }


}