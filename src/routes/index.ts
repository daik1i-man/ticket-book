import { bookingRouter } from './booking/booking.router';
import { eventRouter } from './event/event.router';
import { userRouter } from './user/user.router';
import { Router } from 'express';

const router = Router();

router.use('/booking', bookingRouter);
router.use('/event', eventRouter);
router.use('/user', userRouter);

export { router };