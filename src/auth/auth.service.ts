import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/authUser';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
    constructor(
        private jwtService : JwtService,
        @InjectRepository
        (UserRepository) private userRepository: UserRepository) { }


    async signUp(authUser: AuthUserDto): Promise<User> {
        return await this.userRepository.saveUser(authUser);
    }

    async signIn(authUser: AuthUserDto): Promise<{accessToken: string}> {
        let userName = await this.userRepository.validateUser(authUser);
        if (!userName) {
            throw new UnauthorizedException('User name or Password is Incorrect!!');
        }

        const payLoad: JwtPayload = {userName};
        const accessToken = this.jwtService.sign(payLoad);

        return {accessToken};
    }
}    
