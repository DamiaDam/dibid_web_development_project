import { Module } from '@nestjs/common';
import { AppModule } from 'src/app/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { UAuthController } from './uauth.controller';
import { UAuthService } from './uauth.service';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [UAuthController],
  providers: [UAuthService],
  exports: [UAuthService]
})
export class UAuthModule { }