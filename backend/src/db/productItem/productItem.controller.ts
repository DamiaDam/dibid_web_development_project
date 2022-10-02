import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductProps, ProductResponse, SearchProductResponse, SearchProps } from 'src/dto/product.interface';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { ProductItem } from './productItem.entity';
import { ProductItemService } from './productItem.service';

@Controller('products')
export class ProductItemController {
  authService: any;
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

    if (result.success)
      await this.usersService.increaseSellerRating(productItem.seller);

    return result;
  }

  @Post('/edit/:productId')
  @UseGuards(AuthGuard)
  async editProduct(
    @Body() productInfo: ProductProps,
    @Param('productId') productId: string,
    @Headers('authorization') headers
  ): Promise<{ 'success': boolean }> {

    if (!this.productItemService.isSeller(+productId, headers)) {
      return { 'success': false }
    }

    var oldProduct: ProductItem = await this.productItemService.getProductEntityById(+productId);

    if (!oldProduct) {
      return { 'success': false }
    }

    // await this.productItemService.deleteProductById(+productId);

    var productItem: ProductItem = new ProductItem();
    productItem.productId = +productId;
    productItem.name = productInfo.name;
    productItem.categories = await this.categoryService.getCategoriesById(productInfo.categories),
      productItem.imgUrl = oldProduct.imgUrl;
    productItem.buyPrice = productInfo.buyNowPrice;
    productItem.firstBid = productInfo.startingPrice;
    productItem.currentBid = productInfo.startingPrice;
    productItem.numberOfBids = 0;
    productItem.description = productInfo.description;
    productItem.startingDate = oldProduct.startingDate;
    productItem.endingDate = oldProduct.endingDate;
    productItem.location = productInfo.location;
    productItem.longitude = productInfo.longitude;
    productItem.latitude = productInfo.latitude;
    productItem.seller = await this.usersService.findByUsername(productInfo.user);

    const result = await this.productItemService.editProduct(productItem);

    return result;
  }

  @Get('/id/:productId')
  async getProductById(
    @Param('productId') productId: string
  ): Promise<ProductResponse> {

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

  // 'getcount/id returns the number of products in a category with given id
  @Get('catcount/:catid')
  async getCategoryCount(
    @Param('catid') catid: string
  ): Promise<{ total: number, active: number }> {
    return await this.productItemService.getCategoryProductCount(+catid)
  }

  // Get all products added by user with id userId
  @Post('/user/:userId')
  async getProductsByUserWithId(
    @Body() props: SearchProps,
    @Param('userId') userId: string
  ): Promise<SearchProductResponse> {

    const products: number[] = await this.productItemService.getProductsByUserWithId(userId);
    console.log(products);
    const total: number = products.length;

    const startIndex: number = props.pageSize * (props.pageNumber - 1);
    const endIndex: number = props.pageSize * props.pageNumber;
    const page: number[] = products.slice(startIndex, endIndex);

    return { products: page, total: total }
  }

  // Search for products with a search string
  @Post('/search')
  async searchProducts(@Body() props: SearchProps): Promise<SearchProductResponse> {

    const products: number[] = await this.productItemService.searchProducts(props);
    const total: number = products.length;

    const startIndex: number = props.pageSize * (props.pageNumber - 1);
    const endIndex: number = props.pageSize * props.pageNumber;
    const page: number[] = products.slice(startIndex, endIndex);

    return { products: page, total: total };
  }

  @Get('/delete/:productId')
  @UseGuards(AuthGuard)
  async deleteProduct(
    @Param('productId') productId: string,
    @Headers('authorization') headers
  ) {

    if (this.productItemService.isSeller(+productId, headers))
      return this.productItemService.deleteProductById(+productId);
    else
      return { 'success': false, 'info': 'Deletion not requested by seller' };
  }

}