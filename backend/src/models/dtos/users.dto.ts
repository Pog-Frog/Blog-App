import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    public email: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    public password: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public firstname: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public lastname: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public country: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)  
    public city: string | undefined;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    public picture: string | undefined;
}

export class LoginUserDto {
    @IsEmail()
    public email: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    public password: string | undefined;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public email: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    public password: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public firstname: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public lastname: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public country: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    public city: string | undefined;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    public picture: string | undefined;
}