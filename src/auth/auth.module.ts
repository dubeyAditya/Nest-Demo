import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports :[
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
    secret : 'MYsecret',
    signOptions :{
      expiresIn : 30
    }
  }),
  TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}