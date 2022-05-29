import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { isNil } from 'lodash';
import { AuthService } from './auth.service';

export interface AppTokenI {
  username: string;
  identifier: string;
}
@Injectable()
export class AuthGuard implements CanActivate {
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
    let decoded: AppTokenI;
    try {
      console.log(token)
      decoded = this.authService.verifyJwt(token);
      console.log(decoded)
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token provided');
    }
    request.username = decoded.username;
    return true;
  }
}
