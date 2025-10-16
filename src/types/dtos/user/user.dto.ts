import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserFormDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}