import { eventRouter } from './event/event.router';
import { userRouter } from './user/user.router';
import { Router } from 'express';

const router = Router();

router.use(eventRouter);
router.use(userRouter);

export { router };