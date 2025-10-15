import { EventRepository } from '../../repositories/event/event.repository';
import { AppError } from '../../../common/http/responses/error.response';
import { Event } from '../../../schema/event/event.schema';

export class EventService {
    constructor(private eventRepository: EventRepository) { }

    async findMany(): Promise<Event[]> {
        return await this.eventRepository.findMany();
    }

    async findUnique(id: number): Promise<Event | null> {
        const event = await this.eventRepository.findUnique(id);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return event;
    }

    async create(data: { name: string, total_seats: number }): Promise<Event> {
        return await this.eventRepository.create(data);
    }

    async update(id: number, params: { name: string, total_seats: number }): Promise<Event> {
        const event = await this.eventRepository.findUnique(id);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return this.eventRepository.update(id, params);
    }

    async delete(id: number): Promise<Event> {
        const event = await this.eventRepository.findUnique(id);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return this.eventRepository.delete(id);
    }
}