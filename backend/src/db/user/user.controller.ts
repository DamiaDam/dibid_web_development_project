import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }



  // @Post('/') // for testing
  // async createUser(@Body('did') did: string) {
  //   // this.userService.insertUser({did: did, identifier: ""} as User);
  //   console.log('send, ', did);
  //   return this.userService.deleteByHolderDID(did);
  // }

  @Post()
    async createUser(@Body('did') did: string) {
    // this.userService.insertUser({did: did, identifier: ""} as User);
      console.log('send, ', did);
      // return this.userService.insertUser({did: did, identifier: "ggg"} as User);
      // return this.userService.findByDid(did);
      return this.userService.deleteByHolderDID(did);
    }
}