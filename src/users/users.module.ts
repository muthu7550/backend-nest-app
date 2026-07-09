// users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { AuthLoginModule } from 'src/login/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },  
    ]),
    forwardRef(() => AuthLoginModule), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
