import { BookingFormDto } from "../../../types/dtos/booking/booking.dto";
import { IBookingRepository } from "./booking.repository.interface";
import { UniqueInputs } from "../../../types/unique.inputs.types";
import { Booking } from "../../../schema/booking/booking.schema";
import { db } from "../../../config/database.config";

export class BookingRepository implements IBookingRepository {
    async findMany(): Promise<Booking[]> {
        const query = `SELECT * FROM bookings`;
        const bookings = await db.query(query);
        return bookings.rows;
    }

    async findUnique(UniqueInputs: UniqueInputs['Booking']): Promise<Booking | null> {
        if (!UniqueInputs.id) {
            const query = `SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2`;
            const booking = await db.query(query, [UniqueInputs.event_id, UniqueInputs.user_id]);
            return booking.rows[0] || null;
        } else {
            const query = `SELECT * FROM bookings WHERE id = $1`;
            const booking = await db.query(query, [UniqueInputs.id]);
            return booking.rows[0] || null;
        }
    }

    async create(createParams: BookingFormDto): Promise<Booking> {
        const query = `INSERT INTO bookings (event_id, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *`;
        const newBooking = await db.query(query, [createParams.event_id, createParams.user_id]);
        return newBooking.rows[0];
    }

    async update(UniqueInputs: UniqueInputs['Booking'], params: BookingFormDto): Promise<Booking> {
        const query = `UPDATE bookings SET event_id = $1, user_id = $2 WHERE id = $3 RETURNING *`;
        const updatedBooking = await db.query(query, [params.event_id, params.user_id, UniqueInputs.id]);
        return updatedBooking.rows[0];
    }

    async delete(UniqueInputs: UniqueInputs['Booking']): Promise<Booking> {
        const query = `DELETE FROM bookings WHERE id = $1 RETURNING *`;
        const deletedBooking = await db.query(query, [UniqueInputs.id]);
        return deletedBooking.rows[0];
    }
}