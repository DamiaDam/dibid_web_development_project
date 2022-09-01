import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { isNil } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { AppTokenI } from './auth.guard';
require("dotenv").config();

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) { }

  signJwt(payload) {
    return this.jwtService.sign(payload, {"secret": process.env.JWT_KEY});
  }

  verifyJwt(payload) {
    return this.jwtService.verify(payload, {"secret": process.env.JWT_KEY});
  }

  getUsername(jwt) {

    console.log('jwt:', jwt);

    if (jwt === null || jwt === undefined) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    const decoded: AppTokenI = this.verifyJwt(jwt);
    return decoded.username;
  }
  
}
