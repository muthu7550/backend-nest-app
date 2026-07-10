// auth.service.ts
import { UsersModule } from './../users/users.module';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, registerUserDocument } from 'src/register/register.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Register.name) private readonly authRegisterModule: Model<registerUserDocument>,
    private readonly JwtService: JwtService,
  ) {}

  async generateTokens(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.JwtService.signAsync(payload, { expiresIn: '8h' }), 
      this.JwtService.signAsync(payload, { expiresIn: '7d' }),  
    ]);

    await this.authRegisterModule.findByIdAndUpdate(user._id, { refreshToken });

    return { access_token: accessToken, refresh_token: refreshToken };  
  }

async refreshTokens(userId: string, incomingRefreshToken: string) {

  const user = await this.authRegisterModule.findById(userId).exec();
  
  if (!user || !user.refreshToken) {
    throw new UnauthorizedException('Access Denied: No refresh token found'); 
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new UnauthorizedException('Access Denied: Token mismatch');
  }

  try {
    await this.JwtService.verifyAsync(incomingRefreshToken);
    
    return await this.generateTokens(user);
  } catch (error) {
    throw new UnauthorizedException('Refresh token expired or invalid');
  }
}


  async login(userData: { email: string; password: string }) {
    const emailStr = userData?.email; 
    const passwordStr = userData?.password;
    console.log(emailStr)

    const user = await this.authRegisterModule.findOne({ email: emailStr }).exec();

    console.log(user,"fs")

    if (!user || user.password !== passwordStr) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    return await this.generateTokens(user);
  }

  async register(userData: { email: string; password: string }) {

  const existingUser = await this.authRegisterModule
    .findOne({ email: userData.email })
    .exec();

  if (existingUser) {
    throw new UnauthorizedException('Email already exists');
  }

  const user = await this.authRegisterModule.create({
    email: userData.email,
    password: userData.password,
    role: 'user',
  });

  return await this.generateTokens(user);
}
}


