import { EventRepository } from '../../../core/repositories/event/event.repository';
import { BookingRepository } from '../../repositories/booking/booking.repository';
import { UserRepository } from '../../../core/repositories/user/user.repository';
import { AppError } from '../../../common/http/responses/error.response';
import { BookingFormDto } from '../../../types/dtos/booking/booking.dto';
import { UniqueInputs } from '../../../types/unique.inputs.types';
import { Booking } from '../../../schema/booking/booking.schema';

export class BookingService {
    constructor(
        private bookingRepository: BookingRepository,
        private eventRepository: EventRepository,
        private userRepository: UserRepository
    ) { }

    async findMany(): Promise<Booking[]> {
        return await this.bookingRepository.findMany();
    }

    async findUnique(UniqueInputs: UniqueInputs['Booking']): Promise<Booking | null> {
        const booking = await this.bookingRepository.findUnique(UniqueInputs);

        if (!booking) {
            throw new AppError('Booking not found', 404);
        }

        return booking;
    }

    async create(data: BookingFormDto): Promise<Booking> {
        const event = await this.eventRepository.findUnique({ id: data.event_id });

        if (!event) {
            throw new AppError('Event not found', 404);
        }

        const user = await this.userRepository.findUnique({ id: data.user_id });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const booking = await this.bookingRepository.findUnique({ event_id: data.event_id, user_id: data.user_id });

        if (booking) {
            throw new AppError('Event already booked', 409);
        }

        return await this.bookingRepository.create(data);
    }

    async update(UniqueInputs: UniqueInputs['Booking'], params: BookingFormDto): Promise<Booking> {
        const booking = await this.bookingRepository.findUnique(UniqueInputs);

        if (!booking) {
            throw new AppError('Booking not found', 404);
        }

        return this.bookingRepository.update(UniqueInputs, params);
    }

    async delete(UniqueInputs: UniqueInputs['Booking']): Promise<Booking> {
        const booking = await this.bookingRepository.findUnique(UniqueInputs);

        if (!booking) {
            throw new AppError('Booking not found', 404);
        }

        return this.bookingRepository.delete(UniqueInputs);
    }
}