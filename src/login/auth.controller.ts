import { Register } from './../register/auth.schema';
// auth.controller.ts
import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() login: any): Promise<any> {
    console.log(login);

    return this.authService.login(login);        
  }

   @Post('register')
  async register(@Body() body: any) {
    console.log('Register payload:', body);

    return this.authService.register(body);
  }

  @Post('refresh')
  async refresh(
    @Body() body: { userId: string; refresh_token: string }
  ) {
    if (!body.userId || !body.refresh_token) {
      throw new UnauthorizedException('Missing payload credentials');
    }
    
    return this.authService.refreshTokens(body.userId, body.refresh_token);
  }

} 
