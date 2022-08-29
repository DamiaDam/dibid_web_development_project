import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductProps, ProductResponse, SearchProps } from 'src/dto/product.interface';
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

    const result = await this.productItemService.insertProduct(productItem, productInfo.user);

    if(result.success)
      await this.usersService.increaseSellerRating(productItem.seller);

    return result;
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

  // Get active products from category with id categoryId
  @Get('/cat/:categoryId')
  async getProductsInCategory(
    @Param('categoryId') categoryId: string
  ): Promise<number[]> {

    await this.productItemService.updateAllActiveProducts();
    return await this.productItemService.getActiveCategoryProducts(+categoryId);

  }

  // Get all products added by user with id userId
  @Get('/user/:userId')
  async getProductsByUserWithId(
    @Param('userId') userId: string
  ): Promise<number[]> {

    // return this.productService.getProductById(productId);
    return await this.productItemService.getProductsByUserWithId(userId);
  }

  // Search for products with a search string
  @Post('/search')
  async searchProducts(@Body() props: SearchProps): Promise<number[]> {

    console.log('saer: ', props.searchText)

    return await this.productItemService.searchProducts(props);
  }

}