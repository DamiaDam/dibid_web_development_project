import { Module } from '@nestjs/common';
import { UserService } from 'src/db/user/user.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [UserService],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
