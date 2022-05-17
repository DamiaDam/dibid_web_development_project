import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductProps, ProductResponse } from 'src/dto/product.interface';
import { NewUser } from '../newUser/newuser.entity';
import { NewUserService } from '../newUser/newuser.service';
import { ProductItem } from './productItem.entity';
import { ProductItemService } from './productItem.service';
// import { Country } from './country.entity';

@Controller('products')
export class ProductItemController {
  constructor(private readonly ProductItemService: ProductItemService, private readonly usersService: NewUserService) { }

  // /products/addproduct creates a product in the db with what is provided in the request body
  @Post('/addproduct')
  async addProduct(@Body() productInfo: ProductProps): Promise<{ 'success': boolean }> {

    // Check if all parameters are given
    if (!productInfo.name || !productInfo.imgUrl || !productInfo.price || !productInfo.description || !productInfo.productUrl) {
      console.log('Missing parameter');
      return { "success": false };
    }

    var productItem: ProductItem = new ProductItem();
    productItem.productUrl = productInfo.productUrl;
    productItem.name = productInfo.name;
    productItem.price = productInfo.price;
    productItem.description = productInfo.description;
    productItem.imgUrl = productInfo.imgUrl;
    productItem.user = await this.usersService.findByUsername(productInfo.user);
    return await this.ProductItemService.insertProduct(productItem, productInfo.user);
  }

  @Get('/:productId')
  async getProductById(
    @Param('productId') productId: string
  ): Promise<ProductResponse> {

    // return this.productService.getProductById(productId);
    return this.ProductItemService.getProductById(+productId);
  }

}