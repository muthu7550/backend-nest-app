import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from 'src/auth.interceptor';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(): Promise<User[]> {
    console.log("Controller Executed");
    return this.usersService.findAll();
  }

  @Post('filter')
  @UseInterceptors(LoggingInterceptor)

  async filterUser(@Body() filter: any): Promise<User[]> {
    console.log("Controller Executed");
    return this.usersService.filterUser(filter);
  }

  @Get('search')
  async searchUser(@Query('name') name: string): Promise<User[]> {
    console.log(name, 'name');
    return this.usersService.searchUser(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async updateFull(
    @Param('id') id: string,
    @Body() updateDto: any,
  ): Promise<User> {
    return this.usersService.updateFull(id, updateDto);
  }

  @Patch(':id')
  async updatePartial(
    @Param('id') id: string,
    @Body() updateDto: any,
  ): Promise<User> {
    return this.usersService.updatePartial(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.usersService.remove(id);
  }
}
