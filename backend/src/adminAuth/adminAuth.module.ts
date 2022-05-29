import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminAuthGuard } from './adminAuth.guard';
import { AdminAuthService } from './adminAuth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
         expiresIn: 100 // numerical => seconds, as string => milliseconds
      }
    })
  ],
  providers: [AdminAuthService, AdminAuthGuard],
  exports: [AdminAuthService, AdminAuthGuard]
})
export class AdminAuthModule {}
