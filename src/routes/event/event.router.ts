import { EventRepository } from "../../core/repositories/event/event.repository";
import { EventController } from "../../controllers/event/event.controller";
import { EventService } from "../../core/services/event/event.service";
import { Router } from 'express';

const eventRouter = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

eventRouter.get('/event', eventController.findMany.bind(eventController));
eventRouter.get('/event/:event_id', eventController.findUnique.bind(eventController));
eventRouter.post('/event', eventController.create.bind(eventController));
eventRouter.put('/event/:event_id', eventController.update.bind(eventController));
eventRouter.delete('/event/:event_id', eventController.delete.bind(eventController));

export { eventRouter };