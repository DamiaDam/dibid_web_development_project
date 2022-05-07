import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { ProductResponse } from 'src/dto/product.interface';
import { ProductService } from './product.service';
import { NewUser } from 'src/db/newUser/newuser.entity';
import { NewUserService } from 'src/db/newUser/newuser.service';
import { ProductItemService } from 'src/db/productItem/productItem.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly NewUserService: NewUserService,
    private readonly productItemService: ProductItemService,
    ) {}
  
  @Get()
  getAllProducts() {
    return "Get All Products";
  }

  @Get('/:productId')
  async getProductById(
    @Param('productId') productId: string
  ): Promise<ProductResponse> {

      // return this.productService.getProductById(productId);
      return this.productItemService.getProductById(+productId);
  }

  // product new user
  @Post()
  async postProduct( @Body() userInfo: CreateUserDTO ) {
    
    // Check if all parameters are given
    if(!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone || !userInfo.tin || !userInfo.address || !userInfo.country)
    {
        console.log('Missing parameter');
        return;
    }

    // Check if username already exists
    const exists = await this.NewUserService.findByUsername(userInfo.username);
    console.log(exists)
    if (exists != null)
    // if(this.NewUserService.findByUsername(userInfo.username))
    {
        console.log('User', userInfo.username, 'already exists!');
        return {"success": false};
    }
    
    var user: NewUser = new NewUser();
    user.username = userInfo.username;
    user.password = userInfo.password;
    user.email = userInfo.email;
    user.name = userInfo.name;
    user.surname = userInfo.surname;
    user.phone = userInfo.phone;
    user.tin = userInfo.tin;
    user.address = userInfo.address;
    user.country = userInfo.country;
    this.NewUserService.insertUser(user);
    return {"success": true};
  }

}