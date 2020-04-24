import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName : string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'Password is too weak'}
        )
    password : string;
}