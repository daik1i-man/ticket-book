import { EventRepository } from '../../repositories/event/event.repository';
import { AppError } from '../../../common/http/responses/error.response';
import { EventFormDto } from '../../../types/dtos/event/event.dto';
import { UniqueInputs } from '../../../types/unique.inputs.types';
import { Event } from '../../../schema/event/event.schema';

export class EventService {
    constructor(private eventRepository: EventRepository) { }

    async findMany(): Promise<Event[]> {
        return await this.eventRepository.findMany();
    }

    async findUnique(UniqueInputs: UniqueInputs['Event']): Promise<Event | null> {
        const event = await this.eventRepository.findUnique(UniqueInputs);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return event;
    }

    async create(data: EventFormDto): Promise<Event> {
        return await this.eventRepository.create(data);
    }

    async update(UniqueInputs: UniqueInputs['Event'], params: EventFormDto): Promise<Event> {
        const event = await this.eventRepository.findUnique(UniqueInputs);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return this.eventRepository.update(UniqueInputs, params);
    }

    async delete(UniqueInputs: UniqueInputs['Event']): Promise<Event> {
        const event = await this.eventRepository.findUnique(UniqueInputs);

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        return this.eventRepository.delete(UniqueInputs);
    }
}