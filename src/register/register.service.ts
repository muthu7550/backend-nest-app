import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, registerUserDocument } from './register.schema';

@Injectable()
export class registerService {

  constructor(
    @InjectModel(Register.name)
    private readonly authRegisterModel: Model<registerUserDocument>,
  ) {

    console.log(
      "REGISTER CONNECTED DB:",
      this.authRegisterModel.db.name
    ); 

  }


  async register(userData: any): Promise<any> {
    const newUser = new this.authRegisterModel(userData);
    return await newUser.save();
  }
}