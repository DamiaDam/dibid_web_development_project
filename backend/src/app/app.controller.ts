import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/adminAuth/adminAuth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/normaluser')
  @UseGuards(AuthGuard)
  getNormal(): string {
    return this.appService.getHello();
  }

  @Get('/adminuser')
  @UseGuards(AdminAuthGuard)
  getAdmin(): string {
    return this.appService.getHello();
  }
}

// axios.get(`${VC_STORAGE_ENDPOINT}/vid`, { headers : {
//   Authorization: `Bearer ${localStorage.getItem('apptoken')}`
// }})