import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName : string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'Password is too weak! Should contain atleast [a-z] and [A-Z] and any of #,@,$,%,&,*'}
        )
    password : string;
}