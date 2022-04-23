import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) { }

  signJwt(payload) {
    return this.jwtService.sign(payload);
  }

  verifyJwt(payload) {
    return this.jwtService.verify(payload);
  }

  
}
