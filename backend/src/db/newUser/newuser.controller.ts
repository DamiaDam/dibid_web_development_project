import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NewUserService } from './newuser.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { NewUser } from './newuser.entity';

@Controller('users')
export class NewUserController {
  constructor(private readonly usersService: NewUserService) {}

//'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() userInfo: CreateUserDTO) {

    // Check if all parameters are given
    if(!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone || !userInfo.tin || !userInfo.address || !userInfo.country)
    {
        console.log('Missing parameter');
        return;
    }

    // Check if username already exists
    if(this.usersService.findByUsername(userInfo.username))
    {
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
// // 'getAll()' returns the list of all the existing users in the database
//   @Get()
//   getAll() {
//     return this.usersService.getAllUsers();
//   }

// //'getBooks()' return all the books which are associated with the user 
// // provided through 'userID' by the request  
//   @Get('books')
//   getBooks( @Body('userID', ParseIntPipe) userID: number ) {
//     return this.usersService.getBooksOfUser(userID);
//   }
}
