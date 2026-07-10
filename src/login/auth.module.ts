import { JwtStrategy } from './jwt.strategy';
// auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

import { Register, RegisterSchema  } from "../register/auth.schema";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // UsersModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Register.name, schema: RegisterSchema  }]),
    JwtModule.register({
      secret: 'MY_SUPER_SECRET_KEY_123',
      signOptions: { expiresIn: '1m' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthLoginModule {}
