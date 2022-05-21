import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/db/user/user.entity';
import { UserService } from 'src/db/user/user.service';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);
  keystorePath: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  async loginUser(username: string, password: string) {
    console.log('params: username = ', username, ' password = ', password);
    var userAdmin: boolean;
    try {
      const user: User = await this.userService.findByUsername(username)

      console.log('found user: ', user);

      if (password === user.password) {
        console.log('success!');
        userAdmin = user.admin;
      }
      else {
        throw new Error('Wrong password');
      }
    }
    catch (error) {
      console.log(error);
      return { username: 'access-denied', apptoken: '' };
    }

    const apptoken = this.authService.signJwt({ username: username, admin: userAdmin })
    return { username: username, apptoken: apptoken };
  }

}