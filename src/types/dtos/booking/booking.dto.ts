import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookingFormDto {
    @IsNotEmpty({ message: "event_id is required" })
    @IsNumber()
    event_id: number;

    @IsNotEmpty({ message: "user_id is required" })
    @IsNumber()
    user_id: number;
}