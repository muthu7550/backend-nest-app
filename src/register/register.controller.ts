// auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { registerService } from './register.service';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: registerService) {}

  @Post('register')
  async registerUser(@Body() register: any): Promise<any> {
    console.log(register);
      console.log("REGISTER CONTROLLER HIT");

    return this.registerService.register(register);
  }
} 
