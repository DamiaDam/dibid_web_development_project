import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDTO } from 'src/dto/user-dto.interface';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async login(@Body() LoginRequest: LoginRequestDTO) {
    console.log('Password = ', LoginRequest.password);
    const { username: username, apptoken: apptoken } =
      await this.loginService.loginUser(LoginRequest.username,
        LoginRequest.password);
    return { username: username, apptoken: apptoken };
  }
}
