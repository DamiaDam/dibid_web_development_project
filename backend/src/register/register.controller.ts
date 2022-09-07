import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { RegisterService } from './register.service';
import { User } from 'src/db/user/user.entity';
import { UserService } from 'src/db/user/user.service';
import { CountryService } from 'src/db/country/country.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly UserService: UserService,
    private readonly countryService: CountryService
  ) { }

  // register new user
  @Post()
  async postRegister(@Body() userInfo: CreateUserDTO) {

    // Check if all parameters are given
    if (!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone || !userInfo.tin || !userInfo.address || !userInfo.countryId) {
      console.log('Missing parameter');
      return;
    }

    // Random coordinates, for now
    userInfo.longitude = 4.3;
    userInfo.latitude = 3.6544;

    // Check if username already exists
    console.log("hello")
    const exists = await this.UserService.findByUsername(userInfo.username);
    console.log(exists)
    if (exists != null)
    // if(this.UserService.findByUsername(userInfo.username))
    {
      console.log('User', userInfo.username, 'already exists!');
      return { "success": false };
    }
    var user: User = new User();
    user.username = userInfo.username;
    user.password = userInfo.password;
    user.email = userInfo.email;
    user.name = userInfo.name;
    user.surname = userInfo.surname;
    user.phone = userInfo.phone;
    user.tin = userInfo.tin;
    user.address = userInfo.address;
    user.validated = false;
    user.country = await this.countryService.getCountryById(userInfo.countryId);
    user.location = userInfo.location;
    user.latitude = userInfo.latitude;
    user.longitude = userInfo.longitude;
    user.admin = false;
    user.sellerRating = 0;
    user.bidderRating = 0;
    user.SentMessages = [];
    user.ReceivedMessages = []
    this.UserService.insertUser(user);
    return { "success": true };
  }

}