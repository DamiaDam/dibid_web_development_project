import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { RegisterService } from './register.service';
import { NewUser } from 'src/db/newUser/newuser.entity';
import { NewUserService } from 'src/db/newUser/newuser.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly NewUserService: NewUserService,
    ) {}

  // register new user
  @Post()
  async postRegister( @Body() userInfo: CreateUserDTO ) {
    
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
    user.phone = userInfo.phone;
    user.tin = userInfo.tin;
    user.address = userInfo.address;
    user.country = userInfo.country;
    this.NewUserService.insertUser(user);
    return {"success": true};
  }

}