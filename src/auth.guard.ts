import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    if (token === '123456') {
      return true;
    }

    return false;
  }

}