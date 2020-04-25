import { Controller, Post, Body, UsePipes, ValidationPipe, UseFilters, HttpException } from '@nestjs/common';
import { AuthUserDto } from './dto/authUser';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { ResponseDto } from '../response.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signUp')
    @UsePipes(ValidationPipe)
    async signUp(@Body() authUser: AuthUserDto): Promise<ResponseDto<number>>{
        const response = new ResponseDto<number>();
        response.data = await this.authService.signUp(authUser);
        return response;
    }

    @Post('/signIn')
    async signIn(@Body() authUser: AuthUserDto): Promise<ResponseDto<{accessToken: string}>>{
        const response = new ResponseDto<{accessToken: string}>();
        response.data = await this.authService.signIn(authUser);
        return response;
    }   
}
