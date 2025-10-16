import { BookingRepository } from "../../core/repositories/booking/booking.repository";
import { EventRepository } from "../../core/repositories/event/event.repository";
import { BookingController } from "../../controllers/booking/booking.controller";
import { BookingService } from "../../core/services/booking/booking.service";
import { UserRepository } from "../../core/repositories/user/user.repository";
import { validateMiddleware } from "../../middleware/validation.middleware";
import { BookingFormDto } from "../../types/dtos/booking/booking.dto";
import { Router } from 'express';

const bookingRouter = Router();

const userRepository = new UserRepository();
const eventRepository = new EventRepository();
const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository, eventRepository, userRepository);
const bookingController = new BookingController(bookingService);

bookingRouter.get('/', bookingController.findMany.bind(bookingController));
bookingRouter.get('/:booking_id', bookingController.findUnique.bind(bookingController));
bookingRouter.post('/', validateMiddleware(BookingFormDto), bookingController.create.bind(bookingController));
bookingRouter.put('/:booking_id', validateMiddleware(BookingFormDto), bookingController.update.bind(bookingController));
bookingRouter.delete('/:booking_id', bookingController.delete.bind(bookingController));

export { bookingRouter };