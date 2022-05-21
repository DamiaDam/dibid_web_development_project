import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  
}
