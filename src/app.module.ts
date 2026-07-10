import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthLoginModule } from './login/auth.module';
import { RegisterController } from './register/auth.controller';
import { AuthRegisterModule } from './register/auth.module';
import { LoggerMiddleware } from './logger.middleware';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://mecmarimuthuit:marimuthu@cluster0.sfbeg.mongodb.net/my_users_db"),
    UsersModule,
    AuthRegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

}