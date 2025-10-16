import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EventFormDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    total_seats: number;
}