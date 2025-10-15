import { BookingRepository } from "../../core/repositories/booking/booking.repository";
import { EventRepository } from "../../core/repositories/event/event.repository";
import { BookingController } from "../../controllers/booking/booking.controller";
import { BookingService } from "../../core/services/booking/booking.service";
import { UserRepository } from "../../core/repositories/user/user.repository";
import { Router } from 'express';

const bookingRouter = Router();

const userRepository = new UserRepository();
const eventRepository = new EventRepository();
const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository, eventRepository, userRepository);
const bookingController = new BookingController(bookingService);

bookingRouter.get('/booking', bookingController.findMany.bind(bookingController));
bookingRouter.get('/booking/:booking_id', bookingController.findUnique.bind(bookingController));
bookingRouter.post('/booking', bookingController.create.bind(bookingController));
bookingRouter.put('/booking/:booking_id', bookingController.update.bind(bookingController));
bookingRouter.delete('/booking/:booking_id', bookingController.delete.bind(bookingController));

export { bookingRouter };