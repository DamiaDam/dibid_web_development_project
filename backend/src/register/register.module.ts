import { Module } from '@nestjs/common';
import { NewUserService } from 'src/db/newUser/newuser.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [NewUserService],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
