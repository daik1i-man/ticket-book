import { IEventRepository } from "../event.repository.interface";
import { Event } from "../../../schema/event/event.schema";
import { db } from "../../../config/database.config";

export class EventRepository implements IEventRepository {
    async findMany(): Promise<Event[]> {
        const query = `SELECT * FROM events`;
        const events = await db.query(query);
        return events.rows;
    }

    async findUnique(uniqueInput: any): Promise<Event | null> {
        const query = `SELECT * FROM event WHERE ${uniqueInput}`;
        const events = await db.query(query);
        return events.rows[0] || null;
    }

    async create(createParams: any): Promise<Event> {
        const query = `INSERT INTO event (name, total_seats) VALUE ($1, $2) RETURNING *`;
        const events = await db.query(query, [createParams]);
        return events.rows[0];
    }

    async update(params: any): Promise<Event> {
        const query = `UPDATE event SET name = $1, total_seats = $2 WHERE id = $3 RETURNING *`;
        const events = await db.query(query, [params.updateParams]);
        return events.rows[0];
    }

    async delete(params: any): Promise<Event> {
        const query = `DELETE FROM event WHERE id = ${params.uniqueInput} RETURNING *`;
        const events = await db.query(query, [params.updateParams]);
        return events.rows[0];
    }
}