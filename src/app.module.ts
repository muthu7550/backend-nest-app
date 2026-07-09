import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthLoginModule } from './login/auth.module';
import { RegisterController } from './register/auth.controller';
import { AuthRegisterModule } from './register/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_users_db'),
    UsersModule,
    AuthLoginModule,
    AuthRegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}