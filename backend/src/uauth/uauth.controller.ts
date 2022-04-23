import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { loginRequestDTO, registrationRequestDTO } from 'src/dto/user-dto.interface';
import { UAuthService } from './uauth.service';
import axios from 'axios';

@Controller('uauth')
export class UAuthController {
    constructor(private readonly uAuthService: UAuthService) {}

  // @Get('/auth')
  // async authenticate(): Promise<any> {
  //   return await this.userWalletAuthService.siopAuth();
  // }

  // @Post('register')   // onboarding equals registration
  // async register(@Body() regRequest: registrationRequestDTO) {
  //   console.log('eos token = ', regRequest.eosToken)
  //   const {did: did, ebsi_access_token: token, apptoken: apptoken} = 
  //     await this.userWalletAuthService.registerWallet(regRequest.eosToken, 
  //                                                     regRequest.password);
  //   return {did: did, ebsi_access_token: token, apptoken: apptoken};
  // }

    // - browser uses local storage to get the did
    // - user is prompted for password
    @Post('login')
    async login(@Body() loginRequest: loginRequestDTO) {
        console.log('Password = ', loginRequest.password);
        const {username: username, apptoken: apptoken} = 
            await this.uAuthService.loginWallet(loginRequest.username,
                                                            loginRequest.password);
            return {username: username, apptoken: apptoken};
    }
}
