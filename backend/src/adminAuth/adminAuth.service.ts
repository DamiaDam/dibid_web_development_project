import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);
  constructor(private jwtService: JwtService) { }

  signJwt(payload) {
    return this.jwtService.sign(payload);
  }

  verifyJwt(payload) {
    return this.jwtService.verify(payload);
  }

  
}
