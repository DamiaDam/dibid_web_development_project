import { Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getHello(): string {
    return this.loginService.getHello();
  }

  @Post()
  postHello(): string {
    return this.loginService.getHello();
  }
}
