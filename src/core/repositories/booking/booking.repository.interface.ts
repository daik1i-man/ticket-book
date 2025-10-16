import { BookingFormDto } from "../../../types/dtos/booking/booking.dto";
import { UniqueInputs } from "../../../types/unique.inputs.types";
import { Booking } from "../../../schema/booking/booking.schema";

export interface IBookingRepository {
    findMany(): Promise<Booking[]>
    findUnique(UniqueInputs: UniqueInputs['Booking']): Promise<Booking | null>
    create(params: BookingFormDto): Promise<Booking>
    update(UniqueInputs: UniqueInputs['Booking'], params: BookingFormDto): Promise<Booking>
    delete(UniqueInputs: UniqueInputs['Booking']): Promise<Booking>
}