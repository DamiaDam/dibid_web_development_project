import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductProps, ProductResponse } from 'src/dto/product.interface';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ProductItem } from './productItem.entity';
import { ProductItemService } from './productItem.service';
// import { Country } from './country.entity';

@Controller('products')
export class ProductItemController {
  constructor(private readonly ProductItemService: ProductItemService, private readonly usersService: UserService) { }

  // /products/addproduct creates a product in the db with what is provided in the request body
  @Post('/addproduct')
  @UseGuards(AuthGuard)
  async addProduct(@Body() productInfo: ProductProps): Promise<{ 'success': boolean }> {

    // Check if all parameters are given
    if (!productInfo.name || !productInfo.imgUrl || !productInfo.price || !productInfo.description || !productInfo.productUrl) {
      console.log('Missing parameter');
      return { "success": false };
    }

    var productItem: ProductItem = new ProductItem();
    productItem.name = productInfo.name;
    productItem.buyPrice = productInfo.price;
    productItem.description = productInfo.description;
    productItem.imgUrl = productInfo.imgUrl;
    productItem.seller = await this.usersService.findByUsername(productInfo.user);
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