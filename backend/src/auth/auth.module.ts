import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
         expiresIn: 100 // numerical => seconds, as string => milliseconds
      }
    })
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard, JwtModule]
})
export class AuthModule {}
