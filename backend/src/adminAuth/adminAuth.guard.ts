import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { isNil } from 'lodash';
import { AuthService } from 'src/auth/auth.service';

interface AdminAppTokenI {
  username: string;
  admin: boolean;
}
@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (authHeader === null || authHeader === undefined) {

      throw new UnauthorizedException('Invalid Authrozation header');
    }
    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer') {
      throw new UnauthorizedException('No token provided');
    }
    if (isNil(token)) {
      throw new UnauthorizedException('Token not found');
    }
    let decoded: AdminAppTokenI;
    try {
      console.log(token)
      decoded = this.authService.verifyJwt(token);
      console.log(decoded)
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token provided');
    }
    request.username = decoded.username;
    return decoded.admin;
  }
}
