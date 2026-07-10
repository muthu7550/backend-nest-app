import { AuthController } from './../login/auth.controller';
// auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { registerService } from './auth.service'; 
import { Register, RegisterSchema  } from './auth.schema'; 
import { UsersModule } from '../users/users.module'; 
import { RegisterController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Register.name, schema: RegisterSchema  }]),
  ], 
  controllers: [RegisterController],  
  providers: [registerService],
    exports: [registerService],
  
})
export class AuthRegisterModule {}
