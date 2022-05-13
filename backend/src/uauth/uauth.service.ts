import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { NewUser } from 'src/db/newUser/newuser.entity';
import { NewUserService } from 'src/db/newUser/newuser.service';

export interface PrivateData {
  key: string;
}




@Injectable()
export class UAuthService {
  private readonly logger = new Logger(UAuthService.name);
  keystorePath: string;

  constructor(
    // private userService: UserService,
    // private jwtService: JwtService,
    // private configService: ConfigService,
    private authService: AuthService,
    private userSchemaService: NewUserService
    // private walletService: WalletService,
  ) {
    // this.keystorePath = configService.get('keystore_path');
  }

  // login with existing wallet
  async loginWallet(username: string, password: string) {
    console.log('entered LoginWallet');
    console.log('params: username = ', username, ' password = ', password);

    try {
      const user: NewUser = await this.userSchemaService.findByUsername(username)

      console.log('found user: ', user);

      if (password === user.password) {
        console.log('success!');
      }
      else {
        throw new Error('Wrong password');
      }
    }
    catch (error) {
      console.log(error);
      return { username: 'access-denied', apptoken: '' };
    }

    const apptoken = this.authService.signJwt({ username: username })
    return { username: username, apptoken: apptoken };
  }

}