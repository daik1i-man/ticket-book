import { EventFormDto } from "../../../types/dtos/event/event.dto";
import { UniqueInputs } from "../../../types/unique.inputs.types";
import { IEventRepository } from "./event.repository.interface";
import { Event } from "../../../schema/event/event.schema";
import { db } from "../../../config/database.config";

export class EventRepository implements IEventRepository {
    async findMany(): Promise<Event[]> {
        const query = `SELECT * FROM events`;
        const events = await db.query(query);
        return events.rows;
    }

    async findUnique(UniqueInputs: UniqueInputs['Event']): Promise<Event | null> {
        const query = `SELECT * FROM events WHERE id = $1`;
        const events = await db.query(query, [UniqueInputs.id]);
        return events.rows[0] || null;
    }

    async create(createParams: EventFormDto): Promise<Event> {
        const query = `INSERT INTO events (name, total_seats) VALUES ($1, $2) RETURNING *`;
        const events = await db.query(query, [createParams.name, createParams.total_seats]);
        return events.rows[0];
    }

    async update(UniqueInputs: UniqueInputs['Event'], params: EventFormDto): Promise<Event> {
        const query = `UPDATE events SET name = $1, total_seats = $2 WHERE id = $3 RETURNING *`;
        const events = await db.query(query, [params.name, params.total_seats, UniqueInputs.id]);
        return events.rows[0];
    }

    async delete(UniqueInputs: UniqueInputs['Event']): Promise<Event> {
        const query = `DELETE FROM events WHERE id = $1 RETURNING *`;
        const events = await db.query(query, [UniqueInputs.id]);
        return events.rows[0];
    }
}