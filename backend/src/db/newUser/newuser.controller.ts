import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NewUserService } from './newuser.service';
import { CreateUserDTO, GetUserResponseDTO, UserInfoDTO } from 'src/dto/create-user.dto';
import { NewUser } from './newuser.entity';
import { ValidateDTO, ValidateResponseDTO } from 'src/dto/user-dto.interface';

@Controller('users')
export class NewUserController {
  constructor(private readonly usersService: NewUserService) { }

  //'postUser()' will handle the creating of new User
  @Post('post')
  postUser(@Body() userInfo: CreateUserDTO) {

    // Check if all parameters are given
    if (!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone || !userInfo.tin || !userInfo.address || !userInfo.country) {
      console.log('Missing parameter');
      return;
    }

    // Check if username already exists
    if (this.usersService.findByUsername(userInfo.username)) {
      console.log('User', userInfo.username, 'already exists!');
      return;
    }

    var user: NewUser = new NewUser();
    user.username = userInfo.username;
    user.password = userInfo.password;
    user.email = userInfo.email;
    user.phone = userInfo.phone;
    user.tin = userInfo.tin;
    user.address = userInfo.address;
    user.country = userInfo.country;
    return this.usersService.insertUser(user);
  }

  @Post('validateUser')
  async getUser(@Body() user: ValidateDTO): Promise<ValidateResponseDTO> {


    if (user.username === undefined)
      return { success: false }
    console.log("mlkia1")
    return this.usersService.validateUser(user);
  }

  @Get('getuser/:username')
  async getUserByUsrname(
    @Param('username') username: string
  ): Promise<GetUserResponseDTO> {
    // skip empty query
    if (username === "" || username === undefined) {
      return { "exists": false }
    }

    const user: NewUser = await this.usersService.findByUsername(username);
    if (!user) {
      return { "exists": false };
    }
    else {
      return { "exists": true, "info": this.usersService.getInfoFromUser(user) }
    }
  }

  // 'getAllInfo()' returns the list of all the existing users' info in the database
  @Get('allinfo')
  async getAllInfo() {
    const users: NewUser[] = await this.usersService.findAll();
    const usersInfo: UserInfoDTO[] = [];
    users.forEach(user => {
      usersInfo.push(this.usersService.getInfoFromUser(user));
    });
    return usersInfo;
  }

  // 'getAllInfo()' returns the full list of all the existing users entities in the database
  @Get('allinfofull')
  getAllInfoFull() {
    return this.usersService.findAll();
  }

}
