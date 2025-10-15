import { IBookingRepository } from "./booking.repository.interface";
import { Booking } from "../../../schema/booking/booking.schema";
import { db } from "../../../config/database.config";

export class EventRepository implements IBookingRepository {
    async findMany(): Promise<Booking[]> {
        const query = `SELECT * FROM bookings`;
        const bookings = await db.query(query);
        return bookings.rows;
    }

    async findUnique(uniqueInput: any): Promise<Booking | null> {
        const query = `SELECT * FROM bookings WHERE ${uniqueInput}`;
        const booking = await db.query(query);
        return booking.rows[0] || null;
    }

    async create(createParams: any): Promise<Booking> {
        const query = `INSERT INTO bookings (event_id, user_id, created_at) VALUE ($1, $2, NOW()) RETURNING *`;
        const newBooking = await db.query(query, [createParams]);
        return newBooking.rows[0];
    }

    async update(params: any): Promise<Booking> {
        const query = `UPDATE bookings SET event_id = $1, user_id = $2 WHERE id = $3 RETURNING *`;
        const updatedBooking = await db.query(query, [params.updateParams]);
        return updatedBooking.rows[0];
    }

    async delete(params: any): Promise<Booking> {
        const query = `DELETE FROM bookings WHERE id = ${params.uniqueInput} RETURNING *`;
        const deltedBooking = await db.query(query, [params.updateParams]);
        return deltedBooking.rows[0];
    }
}