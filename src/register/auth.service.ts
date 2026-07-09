import { UsersModule } from './../users/users.module';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, registerUserDocument} from './auth.schema';

@Injectable()
export class registerService {
  constructor(
    @InjectModel(Register.name) private readonly authRegisterModel: Model<registerUserDocument>,
  ) {}

  async register(userData: any): Promise<any> {
    const newUser = new this.authRegisterModel(userData);
    return await newUser.save();
  }
}
