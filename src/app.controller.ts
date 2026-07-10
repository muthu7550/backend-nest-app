import { Controller, Get, Put, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('favicon.ico')
  favicon(@Res() res: Response) {
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Put()
  putHello(): string {
    return this.appService.getHello();
  }
}