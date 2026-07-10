// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async create(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async updateFull(id: string, userData: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userData, { new: true, overwrite: true })
      .exec();
    if (!updatedUser) throw new NotFoundException(`User with ID ${id} not found`);
    return updatedUser;
  }

  async updatePartial(id: string, userData: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: userData }, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException(`User with ID ${id} not found`);
    return updatedUser;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`User with ID ${id} not found`);
    return { deleted: true };
  }

async searchUser(filterDto: any): Promise<User[]> {
  console.log(filterDto, "searchdto");
  return this.userModel.find({ 
    fullName: { $regex: filterDto, $options: 'i' }  
  }).exec();
}

async loginUser(filterDto: any): Promise<User[]> {
  console.log(filterDto, "searchdto");
  return this.userModel.find({ 
    email: { $regex: filterDto, $options: 'i' }  
  }).exec();
}



async filterUser(filterDto: any): Promise<User[]> {
  const query: any = {};
  console.log('Incoming DTO:', filterDto); 

  // 1. Text Field Filtering
  if (filterDto?.name) { 
    query.name = { $regex: filterDto.name, $options: 'i' };
  } 
  
  if (filterDto?.email) {
    query.email = { $regex: filterDto.email, $options: 'i' };
  }

  if (filterDto?.phone) {
    query.phone = { $regex: filterDto.phone, $options: 'i' }; 
  }

  if (filterDto?.status) {
    const statusVal = typeof filterDto.status === 'object' ? filterDto.status.status : filterDto.status;
    
    if (statusVal === 'Blocked') {
      query.status = "Blocked"; 
    } else {
      query.status = statusVal; 
      query.blocked = { $ne: true }; 
    }
  }

  // 3. Role Filtering
  if (filterDto?.role && filterDto.role !== '') {
    query.role = filterDto.role;
  }

  console.log('Generated MongoDB Query:', query);
  return this.userModel.find(query).exec();
}



}
