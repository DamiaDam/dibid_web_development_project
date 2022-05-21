import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserResponseDTO, UserInfoDTO } from 'src/dto/create-user.dto';
import { User } from './user.entity';
import { ValidateDTO, ValidateResponseDTO } from 'src/dto/user-dto.interface';
import { AdminAuthGuard } from 'src/adminAuth/adminAuth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post('validateUser')
  @UseGuards(AdminAuthGuard)
  async getUser(@Body() user: ValidateDTO): Promise<ValidateResponseDTO> {
    if (user.username === undefined)
      return { success: false }
    return this.usersService.validateUser(user);
  }

  @Get('getuser/:username')
  // TODO: Decide if getuser has a guard
  // Optimal guard: only getuser if you are logged in as that user OR you are admin.
  async getUserByUsrname(
    @Param('username') username: string
  ): Promise<GetUserResponseDTO> {

    // skip empty query
    if (username === "" || username === undefined) {
      return { "exists": false }
    }

    const user: User = await this.usersService.findByUsername(username);
    if (!user) {
      return { "exists": false };
    }
    else {
      return { "exists": true, "info": this.usersService.getInfoFromUser(user) }
    }
  }

  // 'getAllInfo()' returns the list of all the existing users' info in the database
  @Get('allUsers')
  @UseGuards(AdminAuthGuard)
  async getAllInfo() {
    const users: User[] = await this.usersService.findAll();
    const usersInfo: UserInfoDTO[] = [];
    users.forEach(user => {
      usersInfo.push(this.usersService.getInfoFromUser(user));
    });
    return usersInfo;
  }

  // 'getAdminUsers()' returns the list of all the existing Admin users' info in the database
  @Get('adminUsers')
  @UseGuards(AdminAuthGuard)
  async getAdminUsers() {
    const users: User[] = await this.usersService.findAdmins();
    const usersInfo: UserInfoDTO[] = [];
    users.forEach(user => {
      usersInfo.push(this.usersService.getInfoFromUser(user));
    });
    return usersInfo;
  }

  // 'getValidatedUsers()' returns the list of all the existing validated users' info in the database
  @Get('validatedUsers')
  @UseGuards(AdminAuthGuard)
  async getValidatedUsers() {
    const users: User[] = await this.usersService.findValidatedUsers();
    const usersInfo: UserInfoDTO[] = [];
    users.forEach(user => {
      usersInfo.push(this.usersService.getInfoFromUser(user));
    });
    return usersInfo;
  }

  // 'getNonValidatedUsers()' returns the list of all the existing non validated users' info in the database
  @Get('nonValidatedUsers')
  @UseGuards(AdminAuthGuard)
  async getNonValidatedUsers() {
    const users: User[] = await this.usersService.findNonValidatedUsers();
    const usersInfo: UserInfoDTO[] = [];
    users.forEach(user => {
      usersInfo.push(this.usersService.getInfoFromUser(user));
    });
    return usersInfo;
  }

  // 'getAllInfo()' returns the full list of all the existing users entities in the database
  @Get('allinfofull')
  @UseGuards(AdminAuthGuard)
  getAllInfoFull() {
    return this.usersService.findAll();
  }

}