import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductProps, ProductResponse } from 'src/dto/product.interface';
import { CategoryService } from '../category/category.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ProductItem } from './productItem.entity';
import { ProductItemService } from './productItem.service';
// import { Country } from './country.entity';

@Controller('products')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService,
              private readonly usersService: UserService,
              private readonly categoryService: CategoryService) { }

  // /products/addproduct creates a product in the db with what is provided in the request body
  @Post('/addproduct')
  @UseGuards(AuthGuard)
  async addProduct(@Body() productInfo: ProductProps): Promise<{ 'success': boolean }> {

    // // Check if all parameters are given
    // if (!productInfo.name || !productInfo.imgUrl || !productInfo.startingPrice || !productInfo.startingDate || !productInfo.endDate || !productInfo.location || !productInfo.description || !productInfo.user) {
    //   console.log('Missing parameter');
    //   return { "success": false };
    // }

    var productItem: ProductItem = new ProductItem();
    productItem.name = productInfo.name;
    productItem.categories = await this.categoryService.getCategoriesById(productInfo.categories),
    productItem.imgUrl = productInfo.imgUrl;
    productItem.buyPrice = productInfo.buyNowPrice;
    productItem.firstBid = productInfo.startingPrice;
    productItem.currentBid = productInfo.startingPrice;
    productItem.numberOfBids = 0;
    productItem.description = productInfo.description;
    productItem.startingDate = productInfo.startingDate;
    productItem.endingDate = productInfo.endDate;
    productItem.location = productInfo.location;
    productItem.longitude = productInfo.longitude;
    productItem.latitude = productInfo.latitude;
    productItem.seller = await this.usersService.findByUsername(productInfo.user);
    return await this.productItemService.insertProduct(productItem, productInfo.user);
  }

  @Get('/id/:productId')
  async getProductById(
    @Param('productId') productId: string
  ): Promise<ProductResponse> {

    // return this.productService.getProductById(productId);
    return this.productItemService.getProductById(+productId);
  }

  @Get('/getall')
  async getAllIds(): Promise<any> {
    return await this.productItemService.getAllProductIds();
  }

  @Get('active')
  async getAllActiveIds(): Promise<number[]> {

    await this.productItemService.updateAllActiveProducts();

    return await this.productItemService.getAllActiveIds();
  }

  // Get all products added by user with id userId
  @Get('/user/:userId')
  async getProductsByUserWithId(
    @Param('userId') userId: string
  ): Promise<number[]> {

    // return this.productService.getProductById(productId);
    return await this.productItemService.getProductsByUserWithId(userId);
  }

}