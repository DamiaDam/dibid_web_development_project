import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule { }