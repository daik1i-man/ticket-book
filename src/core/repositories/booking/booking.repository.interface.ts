import { Booking } from "../../../schema/booking/booking.schema";

export interface IBookingRepository {
    findMany(params?: any): Promise<Booking[]>
    findUnique(params: any): Promise<Booking | null>
    create(params: any): Promise<Booking>
    update(params: any): Promise<Booking>
    delete(params: any): Promise<Booking>
}