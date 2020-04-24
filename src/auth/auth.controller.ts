import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthUserDto } from './dto/authUser';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signUp')
    @UsePipes(ValidationPipe)
    signUp(@Body() authUser: AuthUserDto): Promise<User> {
        return this.authService.signUp(authUser);
    }

    @Post('/signIn')
    @UsePipes(ValidationPipe)
    signIn(@Body() authUser: AuthUserDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authUser);
    }   
}
