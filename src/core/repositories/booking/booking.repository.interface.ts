import { Booking } from "../../../schema/booking/booking.schema";

export interface IBookingRepository {
    findMany(): Promise<Booking[]>
    findUnique(params: { event_id?: number, user_id?: number, id?: number }): Promise<Booking | null>
    create(params: { event_id: number, user_id: number }): Promise<Booking>
    update(id: number, params: { event_id: number, user_id: number }): Promise<Booking>
    delete(id: number): Promise<Booking>
}