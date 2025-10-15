import { IBookingRepository } from "./booking.repository.interface";
import { Booking } from "../../../schema/booking/booking.schema";
import { db } from "../../../config/database.config";

export class BookingRepository implements IBookingRepository {
    async findMany(): Promise<Booking[]> {
        const query = `SELECT * FROM bookings`;
        const bookings = await db.query(query);
        return bookings.rows;
    }

    async findUnique(params: { event_id?: number, user_id?: number, id?: number }): Promise<Booking | null> {
        if (!params.id) {
            const query = `SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2`;
            const booking = await db.query(query, [params.event_id, params.user_id]);
            return booking.rows[0] || null;
        } else {
            const query = `SELECT * FROM bookings WHERE id = $1`;
            const booking = await db.query(query, [params.id]);
            return booking.rows[0] || null;
        }
    }

    async create(createParams: { event_id: number, user_id: number }): Promise<Booking> {
        const query = `INSERT INTO bookings (event_id, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *`;
        const newBooking = await db.query(query, [createParams.event_id, createParams.user_id]);
        return newBooking.rows[0];
    }

    async update(id: number, params: { event_id: number, user_id: number }): Promise<Booking> {
        const query = `UPDATE bookings SET event_id = $1, user_id = $2 WHERE id = $3 RETURNING *`;
        const updatedBooking = await db.query(query, [params.event_id, params.user_id, id]);
        return updatedBooking.rows[0];
    }

    async delete(id: number): Promise<Booking> {
        const query = `DELETE FROM bookings WHERE id = $1 RETURNING *`;
        const deltedBooking = await db.query(query, [id]);
        return deltedBooking.rows[0];
    }
}